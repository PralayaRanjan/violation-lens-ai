from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import TrafficReviewAction, TrafficViolationItem, TrafficViolationRecord
from app.schemas import ReviewUpdateRequest

router = APIRouter(prefix="/human-review", tags=["Review"])


@router.get("/queue")
async def get_review_queue(
    page: int = 1,
    page_size: int = 20,
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(TrafficViolationRecord)
        .where(TrafficViolationRecord.review_status == "PENDING_REVIEW")
        .order_by(desc(TrafficViolationRecord.created_at))
        .offset((page - 1) * page_size)
        .limit(page_size)
    )

    result = await db.execute(stmt)
    records = result.scalars().all()

    return {
        "message": "success",
        "data": [
            {
                "violation_id": record.violation_id,
                "camera_location": record.camera_location,
                "license_plate_text": record.license_plate_text,
                "overall_confidence": record.overall_confidence,
                "annotated_image_url": record.annotated_image_url,
                "review_status": record.review_status,
                "created_at": record.created_at,
            }
            for record in records
        ],
        "code": 200,
    }


@router.patch("/{violation_id}")
async def update_review_status(
    violation_id: str,
    payload: ReviewUpdateRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(TrafficViolationRecord).where(
            TrafficViolationRecord.violation_id == violation_id
        )
    )
    record = result.scalar_one_or_none()

    if not record:
        raise HTTPException(status_code=404, detail="Violation record not found.")

    record.review_status = payload.action.value

    items_result = await db.execute(
        select(TrafficViolationItem).where(
            TrafficViolationItem.violation_id == violation_id
        )
    )
    items = items_result.scalars().all()

    for item in items:
        item.review_status = payload.action.value

    db.add(
        TrafficReviewAction(
            violation_id=violation_id,
            action=payload.action.value,
            reviewer_name=payload.reviewer_name,
            remarks=payload.remarks,
        )
    )

    await db.commit()

    return {
        "message": "Review status updated successfully",
        "data": {
            "violation_id": violation_id,
            "review_status": payload.action.value,
        },
        "code": 200,
    }