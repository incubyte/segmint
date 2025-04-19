from unittest.mock import AsyncMock, patch

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
@patch("app.core.agents.LinkedInScraperTool._run")
@patch("app.core.agents.PersonaCreatorTool._run")
async def test_persona_tools(mock_persona_creator, mock_linkedin_scraper):
    """Test the individual tools for persona creation."""
    # Mock the LinkedIn scraper response
    mock_linkedin_scraper.return_value = SAMPLE_PROFILE_DATA

    # Test the LinkedIn scraper
    linkedin_tool = BlogScrapper()
    result = linkedin_tool._run("https://linkedin.com/in/janesmith")

    assert result == SAMPLE_PROFILE_DATA
    mock_linkedin_scraper.assert_called_once_with("https://linkedin.com/in/janesmith")

    # Mock the persona creator response
    mock_persona_creator.return_value = EXPECTED_PERSONA

    # Test the persona creator
    persona_tool = PersonaCreatorTool()
    result = persona_tool._run(SAMPLE_PROFILE_DATA)

    assert result == EXPECTED_PERSONA
    mock_persona_creator.assert_called_once_with(SAMPLE_PROFILE_DATA)


@pytest.mark.asyncio
@patch("app.core.agents.generate_persona")
async def test_create_persona_endpoint(mock_generate_persona):
    """Test the create-persona endpoint."""
    # Mock the generate_persona function
    mock_generate_persona.return_value = {
        "persona": EXPECTED_PERSONA,
        "steps": [{"tool": "linkedin_scraper", "result": SAMPLE_PROFILE_DATA}],
    }

    # Test the endpoint
    response = client.post(
        "/persona/create-persona",
        json={"linkedin_url": "https://linkedin.com/in/janesmith"},
    )

    # Assert the response
    assert response.status_code == 200
    data = response.json()
    assert data["persona"] == EXPECTED_PERSONA
    assert "steps" in data

    # Verify the mock was called correctly
    mock_generate_persona.assert_called_once_with("https://linkedin.com/in/janesmith")
