from app.utils.geometry import (
    bottom_center,
    front_point,
    overlap_ratio,
    point_inside_polygon,
)


VEHICLE_LABELS = {"car", "motorcycle", "bus", "truck"}
TWO_WHEELER_LABELS = {"motorcycle"}
PERSON_LABELS = {"person"}
HELMET_LABELS = {"helmet"}
NO_HELMET_LABELS = {"no_helmet", "no-helmet", "without_helmet"}


def apply_violation_rules(
    detected_objects: list[dict],
    signal_status: str,
    road_direction: str,
    stop_line_y: float | None,
    no_parking_polygon: list[list[float]] | None,
) -> list[dict]:
    violations = []

    vehicles = [obj for obj in detected_objects if obj["label"].lower() in VEHICLE_LABELS]
    motorcycles = [obj for obj in detected_objects if obj["label"].lower() in TWO_WHEELER_LABELS]
    persons = [obj for obj in detected_objects if obj["label"].lower() in PERSON_LABELS]
    helmets = [obj for obj in detected_objects if obj["label"].lower() in HELMET_LABELS]
    no_helmets = [obj for obj in detected_objects if obj["label"].lower() in NO_HELMET_LABELS]

    for motorcycle in motorcycles:
        motorcycle_bbox = motorcycle["bbox"]

        overlapping_persons = [
            person for person in persons
            if overlap_ratio(person["bbox"], motorcycle_bbox) >= 0.15
        ]

        if len(overlapping_persons) >= 3:
            violations.append(
                {
                    "violation_type": "TRIPLE_RIDING",
                    "confidence": 0.88,
                    "severity": "HIGH",
                    "reason": "Three or more persons detected overlapping one motorcycle region.",
                    "bbox": motorcycle_bbox,
                    "review_status": "PENDING_REVIEW",
                }
            )

        if no_helmets:
            violations.append(
                {
                    "violation_type": "HELMET_NON_COMPLIANCE",
                    "confidence": 0.86,
                    "severity": "HIGH",
                    "reason": "No-helmet object detected near rider region.",
                    "bbox": motorcycle_bbox,
                    "review_status": "PENDING_REVIEW",
                }
            )
        elif overlapping_persons and not helmets:
            violations.append(
                {
                    "violation_type": "SUSPECTED_HELMET_NON_COMPLIANCE",
                    "confidence": 0.58,
                    "severity": "MEDIUM",
                    "reason": "Motorcycle and rider detected, but helmet was not detected. Routed for manual review.",
                    "bbox": motorcycle_bbox,
                    "review_status": "PENDING_REVIEW",
                }
            )

    if stop_line_y is not None:
        for vehicle in vehicles:
            fp_x, fp_y = front_point(vehicle["bbox"], road_direction)

            if fp_y > stop_line_y:
                violation_type = "RED_LIGHT_VIOLATION" if signal_status == "RED" else "STOP_LINE_VIOLATION"
                confidence = 0.82 if signal_status == "RED" else 0.74

                violations.append(
                    {
                        "violation_type": violation_type,
                        "confidence": confidence,
                        "severity": "HIGH" if signal_status == "RED" else "MEDIUM",
                        "reason": f"Vehicle front point crossed configured stop line y={stop_line_y}.",
                        "bbox": vehicle["bbox"],
                        "review_status": "PENDING_REVIEW",
                    }
                )

    if no_parking_polygon:
        for vehicle in vehicles:
            point = bottom_center(vehicle["bbox"])

            if point_inside_polygon(point, no_parking_polygon):
                violations.append(
                    {
                        "violation_type": "ILLEGAL_PARKING",
                        "confidence": 0.8,
                        "severity": "MEDIUM",
                        "reason": "Vehicle bottom-center point lies inside configured no-parking polygon.",
                        "bbox": vehicle["bbox"],
                        "review_status": "PENDING_REVIEW",
                    }
                )

    if road_direction == "UNKNOWN":
        for vehicle in vehicles:
            violations.append(
                {
                    "violation_type": "WRONG_SIDE_DRIVING_REVIEW_REQUIRED",
                    "confidence": 0.45,
                    "severity": "LOW",
                    "reason": "Still image cannot reliably determine movement direction. Manual review required.",
                    "bbox": vehicle["bbox"],
                    "review_status": "PENDING_REVIEW",
                }
            )
            break

    return violations