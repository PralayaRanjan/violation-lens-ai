import os
import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.config import settings


def ensure_storage_dirs() -> None:
    Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
    Path(settings.PROCESSED_DIR).mkdir(parents=True, exist_ok=True)
    Path(settings.ANNOTATED_DIR).mkdir(parents=True, exist_ok=True)
    Path("models").mkdir(parents=True, exist_ok=True)


def save_upload_file(file: UploadFile) -> tuple[str, str]:
    ensure_storage_dirs()

    original_name = file.filename or "traffic_image.jpg"
    extension = Path(original_name).suffix.lower() or ".jpg"
    safe_name = f"{uuid4().hex}{extension}"

    file_path = os.path.join(settings.UPLOAD_DIR, safe_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    public_url = f"/storage/uploads/{safe_name}"

    return file_path, public_url


def build_processed_path(original_path: str) -> tuple[str, str]:
    filename = Path(original_path).name
    processed_path = os.path.join(settings.PROCESSED_DIR, filename)
    public_url = f"/storage/processed/{filename}"
    return processed_path, public_url


def build_annotated_path(original_path: str) -> tuple[str, str]:
    filename = Path(original_path).name
    annotated_path = os.path.join(settings.ANNOTATED_DIR, filename)
    public_url = f"/storage/annotated/{filename}"
    return annotated_path, public_url