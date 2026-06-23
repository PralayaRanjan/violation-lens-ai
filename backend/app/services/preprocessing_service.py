import cv2
import numpy as np


def calculate_blur_score(image) -> float:
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return float(cv2.Laplacian(gray, cv2.CV_64F).var())


def calculate_brightness_score(image) -> float:
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    brightness = hsv[:, :, 2].mean() / 255.0
    return round(float(brightness), 3)


def preprocess_image(input_path: str, output_path: str) -> dict:
    image = cv2.imread(input_path)

    if image is None:
        raise ValueError("Invalid image file. Could not read image.")

    brightness = calculate_brightness_score(image)
    blur = calculate_blur_score(image)

    applied = []

    processed = image.copy()

    if brightness < 0.45:
        lab = cv2.cvtColor(processed, cv2.COLOR_BGR2LAB)
        l_channel, a_channel, b_channel = cv2.split(lab)

        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced_l = clahe.apply(l_channel)

        merged = cv2.merge((enhanced_l, a_channel, b_channel))
        processed = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)
        applied.append("CLAHE")

    processed = cv2.fastNlMeansDenoisingColored(
        processed,
        None,
        7,
        7,
        7,
        21,
    )
    applied.append("DENOISE")

    if blur < 120:
        kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
        processed = cv2.filter2D(processed, -1, kernel)
        applied.append("SHARPEN")

    cv2.imwrite(output_path, processed)

    if brightness < 0.35:
        quality_label = "LOW_LIGHT_REVIEW_REQUIRED"
    elif blur < 60:
        quality_label = "BLURRY_REVIEW_REQUIRED"
    elif brightness < 0.5:
        quality_label = "LOW_LIGHT_ACCEPTABLE"
    else:
        quality_label = "GOOD"

    return {
        "brightness_score": brightness,
        "blur_score": round(float(blur), 2),
        "quality_label": quality_label,
        "preprocessing_applied": applied,
    }