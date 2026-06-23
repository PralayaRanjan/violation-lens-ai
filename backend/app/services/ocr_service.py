import re

import cv2

from app.config import settings


_reader = None


def get_easyocr_reader():
    global _reader

    if _reader is None:
        import easyocr

        _reader = easyocr.Reader(["en"], gpu=False)

    return _reader


def normalize_plate_text(text: str) -> str:
    cleaned = re.sub(r"[^A-Z0-9]", "", text.upper())
    return cleaned[:15]


def crop_possible_plate_regions(image_path: str, detected_objects: list[dict]) -> list:
    image = cv2.imread(image_path)

    if image is None:
        return []

    crops = []

    for obj in detected_objects:
        label = obj["label"].lower()

        if label not in {"car", "motorcycle", "bus", "truck"}:
            continue

        x1, y1, x2, y2 = [int(v) for v in obj["bbox"]]
        width = x2 - x1
        height = y2 - y1

        plate_y1 = int(y1 + height * 0.55)
        plate_y2 = y2
        plate_x1 = int(x1 + width * 0.15)
        plate_x2 = int(x2 - width * 0.15)

        crop = image[max(0, plate_y1):max(0, plate_y2), max(0, plate_x1):max(0, plate_x2)]

        if crop.size > 0:
            crops.append(crop)

    return crops


def run_plate_ocr(image_path: str, detected_objects: list[dict]) -> dict:
    if not settings.OCR_ENABLED:
        return {
            "plate_text": None,
            "confidence": None,
            "warning": "OCR is disabled.",
        }

    crops = crop_possible_plate_regions(image_path, detected_objects)

    if not crops:
        return {
            "plate_text": None,
            "confidence": None,
            "warning": "No suitable vehicle crop found for OCR.",
        }

    try:
        reader = get_easyocr_reader()
    except Exception:
        return {
            "plate_text": None,
            "confidence": None,
            "warning": "EasyOCR could not be initialized.",
        }

    best_text = None
    best_confidence = 0.0

    for crop in crops:
        results = reader.readtext(crop)

        for result in results:
            text = normalize_plate_text(result[1])
            confidence = float(result[2])

            if len(text) >= 6 and confidence > best_confidence:
                best_text = text
                best_confidence = confidence

    if not best_text:
        return {
            "plate_text": None,
            "confidence": None,
            "warning": "Number plate unreadable or low confidence.",
        }

    return {
        "plate_text": best_text,
        "confidence": round(best_confidence, 3),
        "warning": None,
    }