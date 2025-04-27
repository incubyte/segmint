import os

from fastapi.testclient import TestClient

# Mock environment variables for testing
os.environ["OPENAI_API_KEY"] = "sk-test-key"

from app.main import app

client = TestClient(app)


def test_read_root():
    # The root endpoint is at "/" in the FastAPI test client
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
    assert "Welcome to the Persona Generator API" in response.json()["message"]


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_health_check_missing_env_vars():
    # Save the current environment variable
    original_env = os.environ.get("OPENAI_API_KEY")
    
    try:
        # Remove the required environment variable
        if "OPENAI_API_KEY" in os.environ:
            del os.environ["OPENAI_API_KEY"]
            
        # Make the request
        response = client.get("/health")
        
        # Check for error response
        assert response.status_code == 500
        assert "Missing required environment variables" in response.json()["detail"]
        assert "OPENAI_API_KEY" in response.json()["detail"]
        
    finally:
        # Restore the environment variable
        if original_env is not None:
            os.environ["OPENAI_API_KEY"] = original_env
        else:
            # Make sure we set it to something for other tests
            os.environ["OPENAI_API_KEY"] = "sk-test-key"


def test_api_info():
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json()["message"] == "API is working"
