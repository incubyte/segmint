from fastapi.testclient import TestClient


def test_get_questions(client: TestClient):
    """Test the get_questions endpoint."""
    response = client.get("/questions")
    
    # Check status code
    assert response.status_code == 200
    
    # Check response structure
    json_response = response.json()
    assert "questions" in json_response
    assert isinstance(json_response["questions"], list)
    
    # Check at least one question is returned
    assert len(json_response["questions"]) > 0
    
    # Check question structure
    question = json_response["questions"][0]
    assert "id" in question
    assert "question" in question
    assert "type" in question
    assert "required" in question
    
    # Make sure standard fields are present
    expected_fields = ["id", "type", "question", "placeholder", "required"]
    for field in expected_fields:
        assert field in question
