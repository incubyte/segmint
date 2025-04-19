import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.routes.api import router as api_router
from app.routes.persona import router as persona_router
from app.routes.questions import router as questions_router
from app.routes.post import router as post_router

# Load environment variables
load_dotenv(override=True)

# Create FastAPI app
app = FastAPI(
    title="Persona Generator API",
    description="An AI-powered persona generator API that generates a persona.",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router)
app.include_router(persona_router)
app.include_router(questions_router)
app.include_router(post_router)


@app.get("/", tags=["root"])
async def root():
    """Root endpoint that returns info about the API."""
    return {
        "message": "Welcome to the Persona Generator API",
        "docs": "/docs",
        "version": "0.1.0",
    }


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint."""
    # Check if required environment variables are set
    required_vars = ["OPENAI_API_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]

    if missing_vars:
        raise HTTPException(
            status_code=500,
            detail=f"Missing required environment variables: {', '.join(missing_vars)}",
        )

    return {"status": "healthy"}
