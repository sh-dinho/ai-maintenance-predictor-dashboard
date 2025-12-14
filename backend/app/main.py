"""
File: app/main.py
Purpose: FastAPI entrypoint; initializes app, middleware, and registers routes
Version: 1.0
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

# -------------------------------------------------------------------
# FastAPI application instance
# -------------------------------------------------------------------
app = FastAPI(
    title="AI Maintenance Predictor Dashboard API",
    description="Backend for equipment risk prediction and recommendations",
    version="1.0"
)

# -------------------------------------------------------------------
# CORS Middleware (Next.js frontend support)
# -------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------
# Global response headers
# -------------------------------------------------------------------
@app.middleware("http")
async def add_custom_headers(request, call_next):
    response = await call_next(request)

    # Ensure JSON responses
    response.headers["Content-Type"] = "application/json"
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Backend-Version"] = "1.0"
    response.headers["X-Powered-By"] = "FastAPI"

    return response

# -------------------------------------------------------------------
# Register API routes
# -------------------------------------------------------------------
app.include_router(router)
