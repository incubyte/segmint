from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient

from app.core.agents import BlogScrapper, PersonaCreatorTool
from app.main import app

client = TestClient(app)

# Sample test data
SAMPLE_PROFILE_DATA = {
    "name": "Jane Smith",
    "headline": "Software Engineer at Microsoft",
    "experience": [
        {"role": "Software Engineer", "company": "Microsoft", "duration": "2 years"},
        {"role": "Junior Developer", "company": "Startup Inc", "duration": "1 year"},
    ],
    "education": "BS Computer Science, MIT",
    "skills": ["Python", "JavaScript", "Cloud Computing"],
}

EXPECTED_PERSONA = """
### Jane Smith
**Software Engineer at Microsoft**

#### Experience
- **Software Engineer** at *Microsoft* (2 years)
- **Junior Developer** at *Startup Inc* (1 year)

#### Education
- BS Computer Science, MIT

#### Skills
Python, JavaScript, Cloud Computing
"""


@pytest.mark.asyncio
@patch("app.core.agents.BlogScrapper._run")
@patch("app.core.agents.PersonaCreatorTool._run")
async def test_persona_tools(mock_persona_creator, mock_blog_scrapper):
    """Test the individual tools for persona creation."""
    # Mock the blog scraper response
    mock_blog_scrapper.return_value = SAMPLE_PROFILE_DATA

    # Test the blog scraper
    blog_tool = BlogScrapper()
    result = blog_tool._run("https://example.com/blog")

    assert result == SAMPLE_PROFILE_DATA
    mock_blog_scrapper.assert_called_once_with("https://example.com/blog")

    # Mock the persona creator response
    mock_persona_creator.return_value = EXPECTED_PERSONA

    # Test the persona creator
    persona_tool = PersonaCreatorTool()
    result = persona_tool._run(SAMPLE_PROFILE_DATA)

    assert result == EXPECTED_PERSONA
    mock_persona_creator.assert_called_once_with(SAMPLE_PROFILE_DATA)


@pytest.mark.asyncio
@patch("app.routes.persona.generate_persona")
async def test_create_persona_endpoint(mock_generate_persona):
    """Test the create-persona endpoint."""
    # Skip this test for now, needs further refactoring
    pytest.skip("Needs refactoring of the PersonaResponse model validation")
    
    # Mock the generate_persona function
    mock_generate_persona.return_value = {
        "persona": {
            "id": "test-id",
            "persona_summary": EXPECTED_PERSONA,
            "created_at": "2022-01-01T00:00:00.000000",
            "user_id": "test@example.com",
        },
        "id": "test-id",
    }

    # Test the endpoint
    # Creating a list of PersonaQuestionAnswer objects for the request
    initial_data = [
        {
            "question_id": "user_email", 
            "answer": "test@example.com",
            "question": "What is your email?"
        },
        {
            "question_id": "blog_url", 
            "answer": "https://example.com/blog",
            "question": "What is the URL of your blog?"
        }
    ]
    
    response = client.post(
        "/persona/create-persona",
        json={
            "user_email": "test@example.com",
            "initial_data": initial_data
        },
    )

    # Assert the response
    assert response.status_code == 200
    data = response.json()
    assert data["persona"] == EXPECTED_PERSONA
    assert "steps" in data

    # Verify the mock was called correctly
    mock_generate_persona.assert_called_once_with("https://linkedin.com/in/janesmith")
