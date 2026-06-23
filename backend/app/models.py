from datetime import datetime
from enum import Enum

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ReviewStatus(str, Enum):
    PENDING_REVIEW = "PENDING_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    NEEDS_MORE_EVIDENCE = "NEEDS_MORE_EVIDENCE"


class ReviewAction(str, Enum):
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    NEEDS_MORE_EVIDENCE = "NEEDS_MORE_EVIDENCE"
    COMMENTED = "COMMENTED"


class TrafficViolationRecord(Base):
    __tablename__ = "traffic_violation_records"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    violation_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    camera_location: Mapped[str | None] = mapped_column(String(255), nullable=True)
    signal_status: Mapped[str] = mapped_column(String(30), nullable=False, default="UNKNOWN")
    road_direction: Mapped[str] = mapped_column(String(40), nullable=False, default="UNKNOWN")
    weather_condition: Mapped[str] = mapped_column(String(40), nullable=False, default="UNKNOWN")

    license_plate_text: Mapped[str | None] = mapped_column(String(40), nullable=True)
    license_plate_confidence: Mapped[float | None] = mapped_column(Float, nullable=True)

    original_image_url: Mapped[str] = mapped_column(Text, nullable=False)
    processed_image_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    annotated_image_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    image_quality_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

    overall_confidence: Mapped[float | None] = mapped_column(Float, nullable=True)
    review_status: Mapped[str] = mapped_column(
        String(40),
        nullable=False,
        default=ReviewStatus.PENDING_REVIEW.value,
        index=True,
    )

    processing_time_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    evidence_hash: Mapped[str | None] = mapped_column(String(128), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    violation_items: Mapped[list["TrafficViolationItem"]] = relationship(
        back_populates="record",
        cascade="all, delete-orphan",
    )

    detected_objects: Mapped[list["TrafficDetectedObject"]] = relationship(
        back_populates="record",
        cascade="all, delete-orphan",
    )

    review_actions: Mapped[list["TrafficReviewAction"]] = relationship(
        back_populates="record",
        cascade="all, delete-orphan",
    )


class TrafficViolationItem(Base):
    __tablename__ = "traffic_violation_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    violation_id: Mapped[str] = mapped_column(
        String(50),
        ForeignKey("traffic_violation_records.violation_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    violation_type: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    severity: Mapped[str] = mapped_column(String(30), nullable=False)
    reason: Mapped[str] = mapped_column(Text, nullable=False)
    bbox_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

    review_status: Mapped[str] = mapped_column(
        String(40),
        nullable=False,
        default=ReviewStatus.PENDING_REVIEW.value,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    record: Mapped["TrafficViolationRecord"] = relationship(
        back_populates="violation_items"
    )


class TrafficDetectedObject(Base):
    __tablename__ = "traffic_detected_objects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    violation_id: Mapped[str] = mapped_column(
        String(50),
        ForeignKey("traffic_violation_records.violation_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    object_label: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    bbox_json: Mapped[dict] = mapped_column(JSONB, nullable=False)
    model_source: Mapped[str] = mapped_column(String(120), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    record: Mapped["TrafficViolationRecord"] = relationship(
        back_populates="detected_objects"
    )


class TrafficReviewAction(Base):
    __tablename__ = "traffic_review_actions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    violation_id: Mapped[str] = mapped_column(
        String(50),
        ForeignKey("traffic_violation_records.violation_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    action: Mapped[str] = mapped_column(String(50), nullable=False)
    reviewer_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    remarks: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    record: Mapped["TrafficViolationRecord"] = relationship(
        back_populates="review_actions"
    )