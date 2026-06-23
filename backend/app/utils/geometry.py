def bbox_area(bbox: list[float]) -> float:
    x1, y1, x2, y2 = bbox
    return max(0, x2 - x1) * max(0, y2 - y1)


def intersection_area(a: list[float], b: list[float]) -> float:
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b

    x1 = max(ax1, bx1)
    y1 = max(ay1, by1)
    x2 = min(ax2, bx2)
    y2 = min(ay2, by2)

    return max(0, x2 - x1) * max(0, y2 - y1)


def overlap_ratio(a: list[float], b: list[float]) -> float:
    area = bbox_area(a)
    if area <= 0:
        return 0.0
    return intersection_area(a, b) / area


def bottom_center(bbox: list[float]) -> tuple[float, float]:
    x1, y1, x2, y2 = bbox
    return ((x1 + x2) / 2, y2)


def front_point(bbox: list[float], road_direction: str) -> tuple[float, float]:
    x1, y1, x2, y2 = bbox

    if road_direction == "LEFT_TO_RIGHT":
        return x2, (y1 + y2) / 2

    if road_direction == "RIGHT_TO_LEFT":
        return x1, (y1 + y2) / 2

    return (x1 + x2) / 2, (y1 + y2) / 2


def point_inside_polygon(point: tuple[float, float], polygon: list[list[float]]) -> bool:
    x, y = point
    inside = False
    j = len(polygon) - 1

    for i in range(len(polygon)):
        xi, yi = polygon[i]
        xj, yj = polygon[j]

        intersects = ((yi > y) != (yj > y)) and (
            x < ((xj - xi) * (y - yi) / ((yj - yi) or 1e-9) + xi)
        )

        if intersects:
            inside = not inside

        j = i

    return inside