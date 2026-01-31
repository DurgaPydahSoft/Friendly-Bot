# EmbedBot - Full-stack Docker image for Hugging Face Spaces
# Serves both FastAPI backend and React frontend

# ============================================
# Stage 1: Build frontend
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy frontend source and build
COPY frontend/ ./

# Set production API URL (same origin, so empty string works)
ENV VITE_API_URL=""

RUN npm run build

# ============================================
# Stage 2: Production image with Python
# ============================================
FROM python:3.11-slim

WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/app ./app

# Copy built frontend to static directory
COPY --from=frontend-builder /app/frontend/dist ./static

# Create non-root user for HF Spaces
RUN useradd -m -u 1000 appuser
USER appuser

# Expose port (HF Spaces uses 7860 by default)
EXPOSE 7860

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:7860/health || exit 1

# Run the app
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
