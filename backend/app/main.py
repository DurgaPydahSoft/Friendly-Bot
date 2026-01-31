"""FastAPI application entry point."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.chat import router as chat_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)


@app.get("/")
async def root():
    """API info - frontend is hosted separately."""
    return {
        "message": "EmbedBot API",
        "docs": "/docs",
        "health": "/health",
        "chat": "POST /chat",
    }


@app.get("/health")
async def health():
    """Health check for deployment probes."""
    return {"status": "ok"}


# Serve static frontend in production (when static dir exists)
static_dir = Path(__file__).parent.parent / "static"
if static_dir.exists():
    # Serve index.html for SPA routing (must be after API routes)
    from fastapi.responses import FileResponse

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Serve frontend SPA - fallback to index.html for client-side routing."""
        file_path = static_dir / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(static_dir / "index.html")

    # Mount static assets
    app.mount("/assets", StaticFiles(directory=static_dir / "assets"), name="assets")


