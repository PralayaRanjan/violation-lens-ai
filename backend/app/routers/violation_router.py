import json
import time
from datetime import datetime
from datetime import datetime, timezone

from sqlalchemy import func
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models import (
    TrafficDetectedObject,
    TrafficViolationItem,
    TrafficViolationRecord,
)
from app.schemas import RoadDirection, SignalStatus, WeatherCondition
from app.services.detection_service import run_detection_pipeline
from app.services.evidence_service import generate_annotated_evidence
from app.services.ocr_service import run_plate_ocr
from app.services.preprocessing_service import preprocess_image
from app.services.rule_engine_service import apply_violation_rules
from app.services.storage_service import (
    build_annotated_path,
    build_processed_path,
    save_upload_file,
)
from app.utils.image_hash import generate_file_hash

router = APIRouter(prefix="/violations", tags=["Violations"])


def generate_violation_id() -> str:
    today = datetime.utcnow().strftime("%Y%m%d")
    millis = int(time.time() * 1000) % 1000000
    return f"VL-{today}-{millis}"


def parse_polygon(no_parking_polygon: str | None) -> list[list[float]] | None:
    if not no_parking_polygon:
        return None

    try:
        polygon = json.loads(no_parking_polygon)
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail="Invalid no_parking_polygon JSON string.")

    if not isinstance(polygon, list) or len(polygon) < 3:
        raise HTTPException(status_code=422, detail="no_parking_polygon must contain at least 3 points.")

    return polygon


@router.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...),
    camera_location: str | None = Form(None),
    signal_status: SignalStatus = Form(SignalStatus.UNKNOWN),
    road_direction: RoadDirection = Form(RoadDirection.UNKNOWN),
    weather_condition: WeatherCondition = Form(WeatherCondition.UNKNOWN),

    # Extra frontend upload-page fields
    camera_angle: str = Form("UNKNOWN"),
    enable_preprocessing: bool = Form(True),
    preprocessing_mode: str = Form("AUTO"),
    enable_ocr: bool = Form(True),

    # Stop-line fields
    stop_line_y: float | None = Form(None),
    stop_line_position: float | None = Form(None),

    # No-parking fields
    no_parking_polygon: str | None = Form(None),
    no_parking_zone_enabled: bool = Form(False),

    # Selected checks from frontend
    selected_checks: str | None = Form(None),

    db: AsyncSession = Depends(get_db),
):
    start_time = time.perf_counter()

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=422, detail="Only image files are allowed.")

    if stop_line_y is None and stop_line_position is not None:
        stop_line_y = stop_line_position

    selected_check_list: list[str] | None = None

    if selected_checks:
        try:
            parsed_checks = json.loads(selected_checks)

            if isinstance(parsed_checks, list):
                selected_check_list = [str(item).upper() for item in parsed_checks]
            else:
                selected_check_list = None
        except json.JSONDecodeError:
            selected_check_list = None

    if no_parking_zone_enabled:
        polygon = parse_polygon(no_parking_polygon)
    else:
        polygon = None

    original_path, original_url = save_upload_file(file)
    processed_path, processed_url = build_processed_path(original_path)
    annotated_path, annotated_url = build_annotated_path(original_path)

    warnings: list[str] = []

    try:
        if enable_preprocessing:
            image_quality = preprocess_image(original_path, processed_path)
        else:
            image_quality = {
                "brightness_score": None,
                "blur_score": None,
                "quality_label": "PREPROCESSING_DISABLED",
                "preprocessing_applied": [],
            }

            # If preprocessing is disabled, still use original image for the next stages.
            processed_path = original_path
            processed_url = original_url
            warnings.append("Image preprocessing disabled by user.")
    except Exception as exc:
        image_quality = {
            "brightness_score": None,
            "blur_score": None,
            "quality_label": "PREPROCESSING_FAILED",
            "preprocessing_applied": [],
        }

        processed_path = original_path
        processed_url = original_url
        warnings.append(f"Preprocessing failed. Original image used. Reason: {str(exc)}")

    detected_objects, detection_warnings = run_detection_pipeline(processed_path)
    warnings.extend(detection_warnings)

    if enable_ocr:
        ocr_result = run_plate_ocr(processed_path, detected_objects)
    else:
        ocr_result = {
            "plate_text": None,
            "confidence": None,
            "warning": "OCR disabled by user.",
            "status": "OCR_DISABLED",
        }

    if ocr_result.get("warning"):
        warnings.append(ocr_result["warning"])

    violations = apply_violation_rules(
        detected_objects=detected_objects,
        signal_status=signal_status.value,
        road_direction=road_direction.value,
        stop_line_y=stop_line_y,
        no_parking_polygon=polygon,
    )

    if selected_check_list:
        normalized_allowed_checks = set()

        for check in selected_check_list:
            normalized_allowed_checks.add(check)
            normalized_allowed_checks.add(check.replace("-", "_"))
            normalized_allowed_checks.add(check.replace(" ", "_"))

        violations = [
            violation
            for violation in violations
            if violation["violation_type"] in normalized_allowed_checks
            or violation["violation_type"].replace("SUSPECTED_", "") in normalized_allowed_checks
        ]

    if not violations:
        warnings.append(
            "No confirmed violation detected. Record saved for traceability and optional review."
        )

    if image_quality.get("quality_label") in {
        "LOW_LIGHT_REVIEW_REQUIRED",
        "BLURRY_REVIEW_REQUIRED",
        "PREPROCESSING_FAILED",
    }:
        warnings.append(
            "Image quality requires manual review before enforcement decision."
        )

    if not ocr_result.get("plate_text"):
        warnings.append(
            "License plate could not be confidently extracted. Manual plate verification required."
        )

    generate_annotated_evidence(
        image_path=processed_path,
        output_path=annotated_path,
        detected_objects=detected_objects,
        violations=violations,
        stop_line_y=stop_line_y,
        no_parking_polygon=polygon,
    )

    processing_time_ms = int((time.perf_counter() - start_time) * 1000)
    violation_id = generate_violation_id()
    evidence_hash = generate_file_hash(annotated_path)

    if violations:
        overall_confidence = round(
            sum(float(v["confidence"]) for v in violations) / len(violations),
            3,
        )
    elif detected_objects:
        overall_confidence = round(
            sum(float(obj["confidence"]) for obj in detected_objects) / len(detected_objects),
            3,
        )
    else:
        overall_confidence = 0.0

    record = TrafficViolationRecord(
        violation_id=violation_id,
        camera_location=camera_location or "Unknown Location",
        signal_status=signal_status.value,
        road_direction=road_direction.value,
        weather_condition=weather_condition.value,
        license_plate_text=ocr_result.get("plate_text"),
        license_plate_confidence=ocr_result.get("confidence"),
        original_image_url=original_url,
        processed_image_url=processed_url,
        annotated_image_url=annotated_url,
        image_quality_json=image_quality,
        metadata_json={
            "warnings": warnings,
            "stop_line_y": stop_line_y,
            "stop_line_position": stop_line_position,
            "no_parking_polygon": polygon,
            "no_parking_zone_enabled": no_parking_zone_enabled,
            "input_filename": file.filename,
            "camera_angle": camera_angle,
            "enable_preprocessing": enable_preprocessing,
            "preprocessing_mode": preprocessing_mode,
            "enable_ocr": enable_ocr,
            "selected_checks": selected_check_list,
            "content_type": file.content_type,
        },
        overall_confidence=overall_confidence,
        review_status="PENDING_REVIEW",
        processing_time_ms=processing_time_ms,
        evidence_hash=evidence_hash,
    )

    db.add(record)

    for obj in detected_objects:
        db.add(
            TrafficDetectedObject(
                violation_id=violation_id,
                object_label=obj["label"],
                confidence=obj["confidence"],
                bbox_json={"bbox": obj["bbox"]},
                model_source=obj.get("model_source", "unknown"),
            )
        )

    for violation in violations:
        db.add(
            TrafficViolationItem(
                violation_id=violation_id,
                violation_type=violation["violation_type"],
                confidence=violation["confidence"],
                severity=violation["severity"],
                reason=violation["reason"],
                bbox_json={"bbox": violation.get("bbox")},
                review_status=violation["review_status"],
            )
        )

    await db.commit()

    return {
        "message": "success",
        "data": {
            "violation_id": violation_id,
            "status": "success",
            "scene_context": {
                "camera_location": camera_location or "Unknown Location",
                "signal_status": signal_status.value,
                "road_direction": road_direction.value,
                "weather_condition": weather_condition.value,
                "camera_angle": camera_angle,
                "stop_line_y": stop_line_y,
                "no_parking_zone_enabled": no_parking_zone_enabled,
                "selected_checks": selected_check_list,
            },
            "image_quality": image_quality,
            "detected_objects": [
                {
                    "label": obj["label"],
                    "confidence": obj["confidence"],
                    "bbox": obj["bbox"],
                    "model_source": obj.get("model_source", "unknown"),
                }
                for obj in detected_objects
            ],
            "violations": [
                {
                    "violation_type": violation["violation_type"],
                    "confidence": violation["confidence"],
                    "severity": violation["severity"],
                    "reason": violation["reason"],
                    "review_status": violation["review_status"],
                    "bbox": violation.get("bbox"),
                }
                for violation in violations
            ],
            "license_plate": {
                "plate_text": ocr_result.get("plate_text"),
                "confidence": ocr_result.get("confidence"),
                "status": (
                    ocr_result.get("status")
                    or ("SUCCESS" if ocr_result.get("plate_text") else "OCR_FAILED")
                ),
            },
            "evidence": {
                "original_image_url": original_url,
                "processed_image_url": processed_url,
                "annotated_image_url": annotated_url,
                "timestamp": datetime.utcnow().isoformat(),
                "evidence_hash": evidence_hash,
            },
            "review": {
                "review_status": "PENDING_REVIEW",
                "manual_review_required": True,
                "reason": "All AI-generated evidence is routed for human officer verification.",
            },
            "processing_time_ms": processing_time_ms,
            "overall_confidence": overall_confidence,
            "warnings": list(dict.fromkeys(warnings)),
        },
        "code": 200,
    }

@router.get("")
async def list_violations(
    page: int = 1,
    page_size: int = 20,
    review_status: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    if page < 1:
        raise HTTPException(status_code=422, detail="page must be greater than or equal to 1")

    if page_size < 1 or page_size > 100:
        raise HTTPException(status_code=422, detail="page_size must be between 1 and 100")

    stmt = select(TrafficViolationRecord).order_by(desc(TrafficViolationRecord.created_at))

    if review_status:
        stmt = stmt.where(TrafficViolationRecord.review_status == review_status)

    stmt = stmt.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(stmt)
    records = result.scalars().all()

    return {
        "message": "success",
        "data": [
            {
                "violation_id": record.violation_id,
                "camera_location": record.camera_location,
                "signal_status": record.signal_status,
                "license_plate_text": record.license_plate_text,
                "overall_confidence": record.overall_confidence,
                "review_status": record.review_status,
                "annotated_image_url": record.annotated_image_url,
                "created_at": record.created_at,
            }
            for record in records
        ],
        "code": 200,
    }


@router.get("/{violation_id}")
async def get_violation_detail(
    violation_id: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(TrafficViolationRecord)
        .options(
            selectinload(TrafficViolationRecord.violation_items),
            selectinload(TrafficViolationRecord.detected_objects),
            selectinload(TrafficViolationRecord.review_actions),
        )
        .where(TrafficViolationRecord.violation_id == violation_id)
    )

    result = await db.execute(stmt)
    record = result.scalar_one_or_none()

    if not record:
        raise HTTPException(status_code=404, detail="Violation record not found.")

    return {
        "message": "success",
        "data": {
            "violation_id": record.violation_id,
            "camera_location": record.camera_location,
            "signal_status": record.signal_status,
            "road_direction": record.road_direction,
            "weather_condition": record.weather_condition,
            "license_plate": {
                "plate_text": record.license_plate_text,
                "confidence": record.license_plate_confidence,
            },
            "image_quality": record.image_quality_json,
            "metadata": record.metadata_json,
            "overall_confidence": record.overall_confidence,
            "review_status": record.review_status,
            "processing_time_ms": record.processing_time_ms,
            "evidence_hash": record.evidence_hash,
            "evidence": {
                "original_image_url": record.original_image_url,
                "processed_image_url": record.processed_image_url,
                "annotated_image_url": record.annotated_image_url,
            },
            "detected_objects": [
                {
                    "label": obj.object_label,
                    "confidence": obj.confidence,
                    "bbox": obj.bbox_json.get("bbox") if obj.bbox_json else None,
                    "model_source": obj.model_source,
                }
                for obj in record.detected_objects
            ],
            "violations": [
                {
                    "violation_type": item.violation_type,
                    "confidence": item.confidence,
                    "severity": item.severity,
                    "reason": item.reason,
                    "bbox": item.bbox_json.get("bbox") if item.bbox_json else None,
                    "review_status": item.review_status,
                }
                for item in record.violation_items
            ],
            "review_actions": [
                {
                    "action": action.action,
                    "reviewer_name": action.reviewer_name,
                    "remarks": action.remarks,
                    "created_at": action.created_at,
                }
                for action in record.review_actions
            ],
            "created_at": record.created_at,
            "updated_at": record.updated_at,
        },
        "code": 200,
    }

def _human_time_ago(created_at):
    if not created_at:
        return "Unknown"

    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)

    now = datetime.now(timezone.utc)
    diff = now - created_at

    seconds = int(diff.total_seconds())

    if seconds < 60:
        return f"{seconds} secs ago"

    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes} mins ago"

    hours = minutes // 60
    if hours < 24:
        return f"{hours} hrs ago"

    days = hours // 24
    return f"{days} days ago"


def _display_status(status: str | None) -> str:
    mapping = {
        "PENDING_REVIEW": "Pending Review",
        "APPROVED": "Approved",
        "REJECTED": "Rejected",
        "NEEDS_MORE_EVIDENCE": "Needs More Evidence",
    }
    return mapping.get(status or "", status or "Unknown")


def _display_violation_type(value: str | None) -> str:
    if not value:
        return "No Violation"

    mapping = {
        "HELMET_NON_COMPLIANCE": "Helmet Non-Compliance",
        "SUSPECTED_HELMET_NON_COMPLIANCE": "Helmet Non-Compliance",
        "RED_LIGHT_VIOLATION": "Red-Light Violation",
        "STOP_LINE_VIOLATION": "Stop-Line Violation",
        "WRONG_SIDE_DRIVING_REVIEW_REQUIRED": "Wrong-Side Driving",
        "TRIPLE_RIDING": "Triple Riding",
        "SEATBELT_NON_COMPLIANCE": "Seatbelt Non-Compliance",
        "ILLEGAL_PARKING": "Illegal Parking",
    }

    return mapping.get(value, value.replace("_", " ").title())


def _display_image_quality(image_quality_json: dict | None) -> str:
    if not image_quality_json:
        return "Unknown"

    label = image_quality_json.get("quality_label")

    if label == "GOOD":
        return "Good"

    if label in {"LOW_LIGHT_ACCEPTABLE"}:
        return "Medium"

    if label in {"LOW_LIGHT_REVIEW_REQUIRED", "BLURRY_REVIEW_REQUIRED"}:
        return "Poor"

    return "Medium"


def _ocr_status(record: TrafficViolationRecord) -> str:
    if record.license_plate_text and record.license_plate_confidence and record.license_plate_confidence >= 0.7:
        return "Success"

    if record.license_plate_text:
        return "Partial"

    return "Failed"


def _evidence_status(record: TrafficViolationRecord) -> str:
    if record.annotated_image_url:
        return "Generated"
    return "Missing"


def _vehicle_type_from_objects(objects) -> str:
    labels = [obj.object_label.lower() for obj in objects]

    if "motorcycle" in labels:
        return "Motorcycle"

    if "car" in labels:
        return "Car"

    if "bus" in labels:
        return "Bus"

    if "truck" in labels:
        return "Truck"

    if "bicycle" in labels:
        return "Bicycle"

    return "Unknown"


@router.get("")
async def list_violations(
    page: int = 1,
    page_size: int = 20,
    review_status: str | None = None,
    violation_type: str | None = None,
    license_plate: str | None = None,
    location: str | None = None,
    confidence_min: float | None = None,
    confidence_max: float | None = None,
    db: AsyncSession = Depends(get_db),
):
    if page < 1:
        raise HTTPException(status_code=422, detail="page must be greater than or equal to 1")

    if page_size < 1 or page_size > 100:
        raise HTTPException(status_code=422, detail="page_size must be between 1 and 100")

    base_stmt = (
        select(TrafficViolationRecord)
        .options(
            selectinload(TrafficViolationRecord.violation_items),
            selectinload(TrafficViolationRecord.detected_objects),
        )
        .order_by(desc(TrafficViolationRecord.created_at))
    )

    count_stmt = select(func.count(TrafficViolationRecord.id))

    filters = []

    if review_status:
        filters.append(TrafficViolationRecord.review_status == review_status)

    if license_plate:
        filters.append(TrafficViolationRecord.license_plate_text.ilike(f"%{license_plate}%"))

    if location:
        filters.append(TrafficViolationRecord.camera_location.ilike(f"%{location}%"))

    if confidence_min is not None:
        filters.append(TrafficViolationRecord.overall_confidence >= confidence_min)

    if confidence_max is not None:
        filters.append(TrafficViolationRecord.overall_confidence <= confidence_max)

    if filters:
        for condition in filters:
            base_stmt = base_stmt.where(condition)
            count_stmt = count_stmt.where(condition)

    if violation_type:
        base_stmt = base_stmt.join(TrafficViolationItem).where(
            TrafficViolationItem.violation_type == violation_type
        )
        count_stmt = count_stmt.join(
            TrafficViolationItem,
            TrafficViolationItem.violation_id == TrafficViolationRecord.violation_id,
        ).where(TrafficViolationItem.violation_type == violation_type)

    total_result = await db.execute(count_stmt)
    total = total_result.scalar() or 0

    stmt = base_stmt.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(stmt)
    records = result.scalars().unique().all()

    items = []

    for record in records:
        primary_violation = record.violation_items[0] if record.violation_items else None

        items.append(
            {
                "id": record.violation_id,
                "type": _display_violation_type(
                    primary_violation.violation_type if primary_violation else None
                ),
                "plate": record.license_plate_text or "UNKNOWN",
                "conf": round(float(record.overall_confidence or 0) * 100),
                "status": _display_status(record.review_status),
                "time": _human_time_ago(record.created_at),
                "loc": record.camera_location or "Unknown Location",
                "vehicle_type": _vehicle_type_from_objects(record.detected_objects),
                "image_quality": _display_image_quality(record.image_quality_json),
                "ocr_status": _ocr_status(record),
                "evidence_status": _evidence_status(record),
                "annotated_image_url": record.annotated_image_url,
                "created_at": record.created_at,
            }
        )

    return {
        "message": "success",
        "data": {
            "items": items,
            "total": total,
            "page": page,
            "page_size": page_size,
        },
        "code": 200,
    }