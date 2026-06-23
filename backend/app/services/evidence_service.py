import cv2


VIOLATION_COLOR = (0, 0, 255)
OBJECT_COLOR = (0, 255, 0)


def draw_label(image, text: str, x: int, y: int, color):
    cv2.rectangle(image, (x, y - 22), (x + max(180, len(text) * 9), y), color, -1)
    cv2.putText(
        image,
        text,
        (x + 4, y - 6),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (255, 255, 255),
        1,
        cv2.LINE_AA,
    )


def generate_annotated_evidence(
    image_path: str,
    output_path: str,
    detected_objects: list[dict],
    violations: list[dict],
    stop_line_y: float | None = None,
    no_parking_polygon: list[list[float]] | None = None,
) -> None:
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Invalid image file. Could not generate annotated evidence.")

    for obj in detected_objects:
        x1, y1, x2, y2 = [int(v) for v in obj["bbox"]]
        label = f'{obj["label"]} {obj["confidence"]:.2f}'

        cv2.rectangle(image, (x1, y1), (x2, y2), OBJECT_COLOR, 2)
        draw_label(image, label, x1, max(24, y1), OBJECT_COLOR)

    for violation in violations:
        bbox = violation.get("bbox")

        if not bbox:
            continue

        x1, y1, x2, y2 = [int(v) for v in bbox]
        label = f'{violation["violation_type"]} {violation["confidence"]:.2f}'

        cv2.rectangle(image, (x1, y1), (x2, y2), VIOLATION_COLOR, 3)
        draw_label(image, label, x1, max(24, y1 - 6), VIOLATION_COLOR)

    if stop_line_y is not None:
        h, w = image.shape[:2]
        y = int(stop_line_y)
        cv2.line(image, (0, y), (w, y), (255, 0, 0), 3)
        draw_label(image, "STOP LINE", 10, max(24, y - 5), (255, 0, 0))

    if no_parking_polygon:
        points = [(int(x), int(y)) for x, y in no_parking_polygon]

        for i in range(len(points)):
            cv2.line(image, points[i], points[(i + 1) % len(points)], (0, 165, 255), 3)

        draw_label(image, "NO PARKING ZONE", points[0][0], points[0][1], (0, 165, 255))

    cv2.imwrite(output_path, image)