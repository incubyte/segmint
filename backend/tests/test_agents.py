import json
import os
from unittest.mock import MagicMock, patch

import pytest

from app.core.agents import (
    BlogScrapper,
    ExtractSchema,
    PersonaCreatorTool,
    WebhookPersonaRequest,
    generate_persona,
)
from app.models.persona import PersonaQuestionAnswer


@pytest.fixture
def sample_blog_data():
    return {
        "writing_style": "Professional and informative",
        "tone_of_voice": "Authoritative but approachable",
        "values": ["Education", "Expertise", "Innovation"],
        "preferred_formats": ["Long-form articles", "Case studies"]
    }


@pytest.fixture
def mock_firecrawl_app():
    with patch("app.core.agents.app") as mock_app:
        mock_response = MagicMock()
        mock_response.data = {
            "writing_style": "Professional and informative",
            "tone_of_voice": "Authoritative but approachable",
            "values": ["Education", "Expertise", "Innovation"],
            "preferred_formats": ["Long-form articles", "Case studies"]
        }
        mock_app.extract.return_value = mock_response
        yield mock_app


@pytest.fixture
def mock_firestore():
    with patch("app.core.agents.db") as mock_db:
        mock_collection = MagicMock()
        mock_db.collection.return_value = mock_collection
        
        mock_doc_ref = MagicMock()
        mock_collection.document.return_value = mock_doc_ref
        
        yield mock_db


@pytest.fixture
def mock_httpx():
    with patch("app.core.agents.httpx") as mock_httpx:
        mock_response = MagicMock()
        mock_response.text = json.dumps({
            "goals": ["Thought Leadership", "Brand Awareness"],
            "target_audience": "Tech professionals",
            "tone_of_voice": ["Professional", "Insightful"],
            "key_topics": ["AI", "Machine Learning"],
            "values": ["Innovation", "Education"],
            "preferred_formats": ["Articles", "Case studies"],
            "persona_summary": "### John Doe\n**Tech Expert**"
        })
        mock_httpx.post.return_value = mock_response
        yield mock_httpx


@pytest.mark.asyncio
async def test_blog_scrapper_run(mock_firecrawl_app, sample_blog_data):
    """Test the BlogScrapper._run method."""
    scrapper = BlogScrapper()
    result = scrapper._run("https://example.com/blog")
    
    # Check that the FirecrawlApp was called with correct parameters
    mock_firecrawl_app.extract.assert_called_once()
    
    # The first argument should be a list containing the URL
    call_args = mock_firecrawl_app.extract.call_args[0]
    assert call_args[0] == ["https://example.com/blog"]
    
    # Check for the prompt and schema
    call_kwargs = mock_firecrawl_app.extract.call_args[1]
    assert "schema" in call_kwargs
    assert "prompt" in call_kwargs
    
    # Check the result
    assert result == sample_blog_data


@pytest.mark.asyncio
async def test_blog_scrapper_arun(mock_firecrawl_app, sample_blog_data):
    """Test the BlogScrapper._arun method."""
    scrapper = BlogScrapper()
    result = await scrapper._arun("https://example.com/blog")
    
    # The _arun method should call _run
    mock_firecrawl_app.extract.assert_called_once()
    assert result == sample_blog_data


@pytest.mark.asyncio
async def test_persona_creator_run_success(mock_httpx, mock_firestore):
    """Test the PersonaCreatorTool._run method with successful API response."""
    # Set up the environment variable
    os.environ["MAKE_WEBHOOK_URL"] = "https://example.com/webhook"
    
    # Create test data
    initial_data = [
        PersonaQuestionAnswer(
            question_id="user_email",
            question="What is your email?",
            answer="test@example.com"
        ),
        PersonaQuestionAnswer(
            question_id="current_role",
            question="What is your current role?",
            answer="Software Engineer"
        )
    ]
    blog_data = {
        "writing_style": "Professional",
        "tone_of_voice": "Informative",
        "values": ["Education"],
        "preferred_formats": ["Articles"]
    }
    
    # Test the tool
    persona_tool = PersonaCreatorTool()
    result = persona_tool._run(initial_data, "test-user-id", blog_data)
    
    # Verify HTTP request
    mock_httpx.post.assert_called_once()
    call_args = mock_httpx.post.call_args[0]
    assert call_args[0] == "https://example.com/webhook"
    
    # Verify Firestore operations
    mock_firestore.collection.assert_called_with("personas")
    mock_firestore.collection().document.assert_called_once()
    mock_firestore.collection().document().set.assert_called_once()
    
    # Verify result structure
    assert isinstance(result, dict)
    assert "id" in result
    assert "created_at" in result
    assert "user_id" in result
    assert result["user_id"] == "test-user-id"
    assert "goals" in result
    assert "persona_summary" in result


@pytest.mark.asyncio
@patch("app.core.agents.PersonaCreatorTool._run")
@patch("app.core.agents.BlogScrapper._arun")
async def test_generate_persona_with_blog(mock_blog_scrapper, mock_persona_creator):
    """Test generate_persona with blog URL."""
    # Set up mocks
    mock_blog_scrapper.return_value = {
        "writing_style": "Professional",
        "tone_of_voice": "Informative"
    }
    mock_persona_creator.return_value = {
        "id": "test-id",
        "persona_summary": "Test persona"
    }
    
    # Create test data
    initial_data = [
        PersonaQuestionAnswer(
            question_id="blog_url",
            question="What is your blog URL?",
            answer="https://example.com/blog"
        ),
        PersonaQuestionAnswer(
            question_id="user_email",
            question="What is your email?",
            answer="test@example.com"
        )
    ]
    
    # Call the function
    result = await generate_persona(initial_data, "test-user-id")
    
    # Verify blog scrapper was called
    mock_blog_scrapper.assert_called_with("https://example.com/blog")
    
    # Verify persona creator was called with correct arguments
    mock_persona_creator.assert_called_with(
        initial_data, 
        "test-user-id", 
        {"writing_style": "Professional", "tone_of_voice": "Informative"}
    )
    
    # Verify result
    assert result["persona"] == {"id": "test-id", "persona_summary": "Test persona"}
    assert result["id"] == "test-id"


@pytest.mark.asyncio
@patch("app.core.agents.PersonaCreatorTool._run")
@patch("app.core.agents.BlogScrapper._arun")
async def test_generate_persona_without_blog(mock_blog_scrapper, mock_persona_creator):
    """Test generate_persona without blog URL."""
    # Set up mocks
    mock_persona_creator.return_value = {
        "id": "test-id",
        "persona_summary": "Test persona"
    }
    
    # Create test data without blog URL
    initial_data = [
        PersonaQuestionAnswer(
            question_id="user_email",
            question="What is your email?",
            answer="test@example.com"
        )
    ]
    
    # Call the function
    result = await generate_persona(initial_data, "test-user-id")
    
    # Verify blog scrapper was NOT called
    mock_blog_scrapper.assert_not_called()
    
    # Verify persona creator was called with empty blog data
    mock_persona_creator.assert_called_with(initial_data, "test-user-id", {})
    
    # Verify result
    assert result["persona"] == {"id": "test-id", "persona_summary": "Test persona"}
    assert result["id"] == "test-id"


@pytest.mark.asyncio
@patch("app.core.agents.PersonaCreatorTool._run")
@patch("app.core.agents.BlogScrapper._arun")
async def test_generate_persona_error(mock_blog_scrapper, mock_persona_creator):
    """Test generate_persona error handling."""
    # Set up mocks
    mock_persona_creator.side_effect = Exception("Test error")
    
    # Create test data
    initial_data = [
        PersonaQuestionAnswer(
            question_id="user_email",
            question="What is your email?",
            answer="test@example.com"
        )
    ]
    
    # Call the function and check for exception
    with pytest.raises(Exception) as excinfo:
        await generate_persona(initial_data, "test-user-id")
    
    # Verify error message
    assert "Error generating persona: Test error" in str(excinfo.value)


def test_extract_schema():
    """Test the ExtractSchema model."""
    schema = ExtractSchema(
        writing_style="Professional",
        tone_of_voice="Informative",
        values=["Education"],
        preferred_formats=["Articles"]
    )
    
    # Verify schema properties
    assert schema.writing_style == "Professional"
    assert schema.tone_of_voice == "Informative"
    assert schema.values == ["Education"]
    assert schema.preferred_formats == ["Articles"]
    
    # Verify schema serialization
    schema_json = ExtractSchema.model_json_schema()
    assert schema_json["properties"]["writing_style"]
    assert schema_json["properties"]["tone_of_voice"]
    assert schema_json["properties"]["values"]
    assert schema_json["properties"]["preferred_formats"]


def test_webhook_persona_request():
    """Test the WebhookPersonaRequest model."""
    request = WebhookPersonaRequest(
        questionaries=[
            {"question": "What is your email?", "answer": "test@example.com"},
            {"question": "What is your role?", "answer": "Software Engineer"}
        ]
    )
    
    # Verify request properties
    assert len(request.questionaries) == 2
    assert request.questionaries[0]["question"] == "What is your email?"
    assert request.questionaries[0]["answer"] == "test@example.com"