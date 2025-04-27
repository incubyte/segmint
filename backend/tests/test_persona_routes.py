from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient

from app.models.persona import PersonaQuestionAnswer


@pytest.fixture
def mock_generate_persona():
    """Mock the generate_persona function."""
    with patch("app.routes.persona.generate_persona") as mock_func:
        # Mock a successful persona generation
        mock_func.return_value = {
            "persona": {
                "id": "test-id-123",
                "persona_summary": "### Test Persona\n**Software Engineer**",
                "goals": ["Thought Leadership", "Networking"],
                "created_at": "2022-01-01T00:00:00.000000",
            },
            "id": "test-id-123",
        }
        yield mock_func


@pytest.fixture
def mock_get_persona_by_id():
    """Mock the get_persona_by_id function."""
    with patch("app.routes.persona.get_persona_by_id") as mock_func:
        # Mock a successful persona retrieval
        mock_func.return_value = {
            "id": "test-id-123",
            "persona_summary": "### Test Persona\n**Software Engineer**",
            "goals": ["Thought Leadership", "Networking"],
            "created_at": "2022-01-01T00:00:00.000000",
        }
        yield mock_func


@pytest.fixture
def mock_list_personas():
    """Mock the list_personas function."""
    with patch("app.routes.persona.db_list_personas") as mock_func:
        # Mock a successful personas list retrieval
        mock_func.return_value = [
            {
                "id": "test-id-123",
                "persona_summary": "### Test Persona 1\n**Software Engineer**",
                "goals": ["Thought Leadership"],
                "created_at": "2022-01-01T00:00:00.000000",
            },
            {
                "id": "test-id-456",
                "persona_summary": "### Test Persona 2\n**Product Manager**",
                "goals": ["Networking"],
                "created_at": "2022-01-02T00:00:00.000000",
            },
        ]
        yield mock_func


def test_create_persona(client: TestClient, mock_generate_persona):
    """Test the create_persona endpoint."""
    # Prepare test data
    test_data = {
        "user_email": "test@example.com",
        "initial_data": [
            {
                "question_id": "current_role",
                "answer": "Software Engineer",
                "question": "What is your current role?",
            },
            {
                "question_id": "company_name",
                "answer": "Test Company",
                "question": "What is the name of your company?",
            },
        ],
    }

    # Make request
    response = client.post("/persona/create-persona", json=test_data)
    
    # Check status code
    assert response.status_code == 200
    
    # Check response structure
    json_response = response.json()
    assert "persona" in json_response
    assert "id" in json_response
    
    # Check specific data
    assert json_response["id"] == "test-id-123"
    assert "persona_summary" in json_response["persona"]
    
    # Verify mock was called with correct parameters
    initial_data = [
        PersonaQuestionAnswer(**qdata) for qdata in test_data["initial_data"]
    ]
    mock_generate_persona.assert_awaited_once_with(initial_data, "test@example.com")


def test_create_persona_error(client: TestClient, mock_generate_persona):
    """Test the create_persona endpoint with an error response."""
    # Mock an error
    mock_generate_persona.side_effect = Exception("Test error")
    
    # Prepare test data
    test_data = {
        "user_email": "test@example.com",
        "initial_data": [
            {
                "question_id": "current_role",
                "answer": "Software Engineer",
                "question": "What is your current role?",
            },
        ],
    }

    # Make request
    response = client.post("/persona/create-persona", json=test_data)
    
    # Check status code for error
    assert response.status_code == 500
    
    # Check error message
    json_response = response.json()
    assert "detail" in json_response
    assert "Error generating persona" in json_response["detail"]


def test_get_persona(client: TestClient, mock_get_persona_by_id):
    """Test the get_persona endpoint."""
    # Make request
    response = client.get("/persona/test-id-123")
    
    # Check status code
    assert response.status_code == 200
    
    # Check response structure
    json_response = response.json()
    assert "id" in json_response
    assert "persona_summary" in json_response
    assert "goals" in json_response
    
    # Check specific data
    assert json_response["id"] == "test-id-123"
    
    # Verify mock was called with correct parameter
    mock_get_persona_by_id.assert_awaited_once_with("test-id-123")


def test_get_persona_not_found(client: TestClient, mock_get_persona_by_id):
    """Test the get_persona endpoint when persona not found."""
    # Mock not found
    mock_get_persona_by_id.return_value = None
    
    # Make request
    response = client.get("/persona/non-existing-id")
    
    # Check status code is 404
    assert response.status_code == 404
    
    # Check error message
    assert response.json()["detail"] == "Persona not found"


def test_list_personas(client: TestClient, mock_list_personas):
    """Test the list_personas endpoint."""
    # Make request
    response = client.get("/persona?user_id=test-user&limit=10")
    
    # Check status code
    assert response.status_code == 200
    
    # Check response structure
    json_response = response.json()
    assert isinstance(json_response, list)
    assert len(json_response) == 2
    
    # Check first persona
    assert json_response[0]["id"] == "test-id-123"
    assert "persona_summary" in json_response[0]
    
    # Verify mock was called with correct parameters
    mock_list_personas.assert_awaited_once_with("test-user", 10)