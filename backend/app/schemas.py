from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class SignalStatus(str, Enum):
    RED = "RED"
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    UNKNOWN = "UNKNOWN"


class RoadDirection(str, Enum):
    LEFT_TO_RIGHT = "LEFT_TO_RIGHT"
    RIGHT_TO_LEFT = "RIGHT_TO_LEFT"
    UNKNOWN = "UNKNOWN"


class WeatherCondition(str, Enum):
    CLEAR = "CLEAR"
    RAIN = "RAIN"
    NIGHT = "NIGHT"
    SHADOW = "SHADOW"
    UNKNOWN = "UNKNOWN"


class ReviewStatus(str, Enum):
    PENDING_REVIEW = "PENDING_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    NEEDS_MORE_EVIDENCE = "NEEDS_MORE_EVIDENCE"


class ReviewUpdateRequest(BaseModel):
    action: ReviewStatus
    reviewer_name: str | None = None
    remarks: str | None = None


class DetectedObjectResponse(BaseModel):
    label: str
    confidence: float
    bbox: list[float]


class ViolationItemResponse(BaseModel):
    violation_type: str
    confidence: float
    severity: str
    reason: str
    review_status: str


class LicensePlateResponse(BaseModel):
    plate_text: str | None = None
    confidence: float | None = None


class EvidenceResponse(BaseModel):
    original_image_url: str
    processed_image_url: str | None = None
    annotated_image_url: str | None = None
    timestamp: datetime


class AnalyzeResponse(BaseModel):
    violation_id: str
    status: str = "success"
    image_quality: dict[str, Any]
    detected_objects: list[DetectedObjectResponse]
    violations: list[ViolationItemResponse]
    license_plate: LicensePlateResponse
    evidence: EvidenceResponse
    processing_time_ms: int
    warnings: list[str] = Field(default_factory=list)


class ApiResponse(BaseModel):
    message: str
    data: Any = None
    code: int