import os
from functools import lru_cache

from ultralytics import YOLO

from app.config import settings


COCO_TRAFFIC_LABELS = {
    "person",
    "bicycle",
    "car",
    "motorcycle",
    "bus",
    "truck",
}


@lru_cache(maxsize=4)
def load_yolo_model(model_path: str):
    if not os.path.exists(model_path) and model_path != "yolov8n.pt":
        return None

    try:
        return YOLO(model_path)
    except Exception:
        return None


def detect_general_objects(image_path: str) -> tuple[list[dict], list[str]]:
    warnings = []

    model = load_yolo_model(settings.DEFAULT_YOLO_MODEL)

    if model is None:
        warnings.append("Default YOLO model could not be loaded.")
        return [], warnings

    results = model.predict(
        source=image_path,
        conf=settings.MIN_CONFIDENCE,
        verbose=False,
    )

    detected_objects = []

    for result in results:
        names = result.names

        for box in result.boxes:
            cls_id = int(box.cls[0])
            label = names.get(cls_id, str(cls_id))
            confidence = float(box.conf[0])
            x1, y1, x2, y2 = box.xyxy[0].tolist()

            if label not in COCO_TRAFFIC_LABELS:
                continue

            detected_objects.append(
                {
                    "label": label,
                    "confidence": round(confidence, 3),
                    "bbox": [round(x1, 2), round(y1, 2), round(x2, 2), round(y2, 2)],
                    "model_source": settings.DEFAULT_YOLO_MODEL,
                }
            )

    return detected_objects, warnings


def detect_custom_model_objects(
    image_path: str,
    model_path: str,
    model_name: str,
) -> tuple[list[dict], list[str]]:
    warnings = []

    if not os.path.exists(model_path):
        warnings.append(f"{model_name} model not found. Related detection skipped.")
        return [], warnings

    model = load_yolo_model(model_path)

    if model is None:
        warnings.append(f"{model_name} model could not be loaded.")
        return [], warnings

    results = model.predict(
        source=image_path,
        conf=settings.MIN_CONFIDENCE,
        verbose=False,
    )

    detected_objects = []

    for result in results:
        names = result.names

        for box in result.boxes:
            cls_id = int(box.cls[0])
            label = names.get(cls_id, str(cls_id))
            confidence = float(box.conf[0])
            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detected_objects.append(
                {
                    "label": label,
                    "confidence": round(confidence, 3),
                    "bbox": [round(x1, 2), round(y1, 2), round(x2, 2), round(y2, 2)],
                    "model_source": model_name,
                }
            )

    return detected_objects, warnings


def run_detection_pipeline(image_path: str) -> tuple[list[dict], list[str]]:
    all_objects = []
    warnings = []

    general_objects, general_warnings = detect_general_objects(image_path)
    all_objects.extend(general_objects)
    warnings.extend(general_warnings)

    helmet_objects, helmet_warnings = detect_custom_model_objects(
        image_path=image_path,
        model_path=settings.HELMET_MODEL,
        model_name="helmet_model",
    )
    all_objects.extend(helmet_objects)
    warnings.extend(helmet_warnings)

    seatbelt_objects, seatbelt_warnings = detect_custom_model_objects(
        image_path=image_path,
        model_path=settings.SEATBELT_MODEL,
        model_name="seatbelt_model",
    )
    all_objects.extend(seatbelt_objects)
    warnings.extend(seatbelt_warnings)

    return all_objects, warnings