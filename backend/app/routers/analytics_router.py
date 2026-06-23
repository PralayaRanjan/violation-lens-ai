from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import case, desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import TrafficViolationItem, TrafficViolationRecord

router = APIRouter(prefix="/analytics", tags=["Analytics"])


def _safe_percent(value: float | int | None) -> float:
    if value is None:
        return 0.0
    return round(float(value), 2)


def _risk_from_count(count: int) -> str:
    if count >= 50:
        return "High"
    if count >= 15:
        return "Medium"
    return "Low"


def _display_violation_type(value: str | None) -> str:
    if not value:
        return "No Violation"

    mapping = {
        "HELMET_NON_COMPLIANCE": "Helmet",
        "SUSPECTED_HELMET_NON_COMPLIANCE": "Helmet",
        "RED_LIGHT_VIOLATION": "Red Light",
        "STOP_LINE_VIOLATION": "Stop Line",
        "WRONG_SIDE_DRIVING_REVIEW_REQUIRED": "Wrong Side",
        "TRIPLE_RIDING": "Triple Riding",
        "SEATBELT_NON_COMPLIANCE": "Seatbelt",
        "ILLEGAL_PARKING": "Illegal Parking",
    }

    return mapping.get(value, value.replace("_", " ").title())


def _violation_desc(value: str | None) -> str:
    mapping = {
        "Helmet": "No helmet detected",
        "Red Light": "Ran red signal",
        "Stop Line": "Crossed stop line",
        "Wrong Side": "Wrong direction / manual review",
        "Triple Riding": "3+ riders",
        "Seatbelt": "No seatbelt",
        "Illegal Parking": "Parking violation",
        "No Violation": "Clean analysis",
    }
    return mapping.get(value or "No Violation", "Traffic violation")


@router.get("/summary")
async def analytics_summary(db: AsyncSession = Depends(get_db)):
    total_records_result = await db.execute(
        select(func.count(TrafficViolationRecord.id))
    )
    total_records = total_records_result.scalar() or 0

    pending_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.review_status == "PENDING_REVIEW"
        )
    )
    pending_review = pending_result.scalar() or 0

    approved_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.review_status == "APPROVED"
        )
    )
    approved = approved_result.scalar() or 0

    rejected_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.review_status == "REJECTED"
        )
    )
    rejected = rejected_result.scalar() or 0

    avg_conf_result = await db.execute(
        select(func.avg(TrafficViolationRecord.overall_confidence))
    )
    avg_confidence_raw = avg_conf_result.scalar() or 0

    avg_time_result = await db.execute(
        select(func.avg(TrafficViolationRecord.processing_time_ms))
    )
    avg_processing_time_ms = avg_time_result.scalar() or 0

    ocr_success_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.license_plate_text.is_not(None)
        )
    )
    ocr_success = ocr_success_result.scalar() or 0

    unreadable_plate_count = max(total_records - ocr_success, 0)

    low_light_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.image_quality_json["quality_label"].astext.in_(
                [
                    "LOW_LIGHT_ACCEPTABLE",
                    "LOW_LIGHT_REVIEW_REQUIRED",
                    "BLURRY_REVIEW_REQUIRED",
                ]
            )
        )
    )
    low_light_cases = low_light_result.scalar() or 0

    evidence_generated_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.annotated_image_url.is_not(None)
        )
    )
    evidence_generated = evidence_generated_result.scalar() or 0

    ocr_success_rate = (
        round((ocr_success / total_records) * 100, 2) if total_records else 0.0
    )

    average_confidence = round(float(avg_confidence_raw or 0) * 100, 2)
    approval_rate = round((approved / total_records) * 100, 2) if total_records else 0.0
    ai_reliability_score = round((average_confidence * approval_rate) / 100, 2)

    return {
        "message": "success",
        "data": {
            "kpis": {
                "total_violations": total_records,
                "pending_review": pending_review,
                "approved_cases": approved,
                "rejected_cases": rejected,
                "average_confidence": average_confidence,
                "ocr_success_rate": ocr_success_rate,
                "average_processing_time_ms": round(float(avg_processing_time_ms or 0), 2),
                "ai_reliability_score": ai_reliability_score,
            },
            "quality": {
                "low_light_cases": low_light_cases,
                "unreadable_plates": unreadable_plate_count,
                "evidence_generated": evidence_generated,
                "images_processed": total_records,
            },
        },
        "code": 200,
    }


@router.get("/by-type")
async def analytics_by_type(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            TrafficViolationItem.violation_type,
            func.count(TrafficViolationItem.id),
        )
        .group_by(TrafficViolationItem.violation_type)
        .order_by(desc(func.count(TrafficViolationItem.id)))
    )

    data = []

    for violation_type, count in result.all():
        name = _display_violation_type(violation_type)
        data.append(
            {
                "name": name,
                "value": count,
                "desc": _violation_desc(name),
            }
        )

    return {
        "message": "success",
        "data": data,
        "code": 200,
    }


@router.get("/trends")
async def analytics_trends(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            func.to_char(TrafficViolationRecord.created_at, "HH24:00").label("time"),
            func.count(TrafficViolationRecord.id).label("count"),
        )
        .group_by(func.to_char(TrafficViolationRecord.created_at, "HH24:00"))
        .order_by(func.to_char(TrafficViolationRecord.created_at, "HH24:00"))
    )

    label_map = {
        "00:00": "Midnight",
        "04:00": "Dawn",
        "08:00": "Morning",
        "12:00": "Noon",
        "16:00": "Evening",
        "20:00": "Night",
        "23:00": "Late Night",
    }

    return {
        "message": "success",
        "data": [
            {
                "time": row[0],
                "count": row[1],
                "label": label_map.get(row[0], row[0]),
            }
            for row in result.all()
        ],
        "code": 200,
    }


@router.get("/by-location")
async def analytics_by_location(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            TrafficViolationRecord.camera_location,
            func.count(TrafficViolationRecord.id),
        )
        .where(TrafficViolationRecord.camera_location.is_not(None))
        .group_by(TrafficViolationRecord.camera_location)
        .order_by(desc(func.count(TrafficViolationRecord.id)))
        .limit(10)
    )

    data = []

    for location, count in result.all():
        data.append(
            {
                "location": location or "Unknown Location",
                "count": count,
                "risk": _risk_from_count(int(count)),
            }
        )

    return {
        "message": "success",
        "data": data,
        "code": 200,
    }


@router.get("/review-queue")
async def analytics_review_queue(db: AsyncSession = Depends(get_db)):
    pending_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.review_status == "PENDING_REVIEW"
        )
    )
    pending = pending_result.scalar() or 0

    low_conf_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.overall_confidence < 0.65
        )
    )
    low_conf = low_conf_result.scalar() or 0

    rejected_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.review_status == "REJECTED"
        )
    )
    rejected = rejected_result.scalar() or 0

    needs_more_evidence_result = await db.execute(
        select(func.count(TrafficViolationRecord.id)).where(
            TrafficViolationRecord.review_status == "NEEDS_MORE_EVIDENCE"
        )
    )
    needs_more_evidence = needs_more_evidence_result.scalar() or 0

    return {
        "message": "success",
        "data": [
            {
                "status": "Needs Manual Review",
                "count": pending,
            },
            {
                "status": "Low Confidence",
                "count": low_conf,
            },
            {
                "status": "Rejected Cases",
                "count": rejected,
            },
            {
                "status": "Officer Queue",
                "count": needs_more_evidence,
            },
        ],
        "code": 200,
    }