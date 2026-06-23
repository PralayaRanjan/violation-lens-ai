from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "ViolationLens AI"
    APP_ENV: str = "development"
    DEBUG: bool = True

    DATABASE_URL: str

    STORAGE_BASE_DIR: str = "storage"
    UPLOAD_DIR: str = "storage/uploads"
    PROCESSED_DIR: str = "storage/processed"
    ANNOTATED_DIR: str = "storage/annotated"

    DEFAULT_YOLO_MODEL: str = "yolov8n.pt"
    TWO_WHEELER_MODEL: str = "models/two_wheeler_best.pt"
    SEATBELT_MODEL: str = "models/seatbelt_best.pt"
    ILLEGAL_PARKING_MODEL: str = "models/illegal_parking_best.pt"

    MIN_CONFIDENCE: float = 0.35
    OCR_ENABLED: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()