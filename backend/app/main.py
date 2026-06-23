from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import Base, engine
from app.routers.analytics_router import router as analytics_router
from app.routers.evaluation_router import router as evaluation_router
from app.routers.review_router import router as review_router
from app.routers.violation_router import router as violation_router
from app.services.storage_service import ensure_storage_dirs


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Evidence-ready traffic violation intelligence backend.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event() -> None:
    ensure_storage_dirs()

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app.mount("/storage", StaticFiles(directory=settings.STORAGE_BASE_DIR), name="storage")


@app.get("/health")
async def health_check():
    return {
        "message": "success",
        "data": {
            "service": settings.APP_NAME,
            "status": "healthy",
            "environment": settings.APP_ENV,
        },
        "code": 200,
    }


app.include_router(violation_router)
app.include_router(review_router)
app.include_router(analytics_router)
app.include_router(evaluation_router)