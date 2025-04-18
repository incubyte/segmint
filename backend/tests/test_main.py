import os
from fastapi.testclient import TestClient
from unittest import mock

# Mock environment variables for testing
os.environ["OPENAI_API_KEY"] = "sk-test-key"

from app.main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "Welcome to the HR Agent API"


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_api_info():
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json()["message"] == "API is working"
