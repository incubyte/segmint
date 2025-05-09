import os
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

# Mock environment variables for testing before importing app
os.environ["OPENAI_API_KEY"] = "sk-test-key"
os.environ["FIREBASE_CREDENTIALS_PATH"] = "test-firebase-credentials.json"
os.environ["FIRECRAWL_API_KEY"] = "test-firecrawl-key"
os.environ["TESTING"] = "1"

# Set up Firebase mocks before importing app
mock_firestore_client = MagicMock()
mock_collection = MagicMock()
mock_doc = MagicMock()
mock_collection.document.return_value = mock_doc
mock_firestore_client.collection.return_value = mock_collection

# Mock FirecrawlApp
mock_firecrawl_app = MagicMock()
mock_firecrawl_app.extract.return_value = MagicMock(data={
    "writing_style": "Professional",
    "tone_of_voice": "Authoritative",
    "values": ["Innovation", "Quality"],
    "preferred_formats": ["Blog posts", "Articles"]
})

# Apply patches
patch("firebase_admin.initialize_app", return_value=None).start()
patch("firebase_admin.get_app", return_value=None).start()
patch("firebase_admin.firestore.client", return_value=mock_firestore_client).start()
patch("firebase_admin.credentials.Certificate", return_value=None).start()
patch("firecrawl.FirecrawlApp", return_value=mock_firecrawl_app).start()

# Import app after setting up mocks and environment variables
from app.main import app


@pytest.fixture
def client():
    """Return a TestClient instance for testing."""
    return TestClient(app)


@pytest.fixture
def mock_firestore():
    """Mock the Firestore client for testing."""
    with patch("app.utils.db.get_firestore_client") as mock_get_client:
        # Create a mock Firestore client
        mock_client = MagicMock()
        mock_collection = MagicMock()
        mock_doc = MagicMock()
        
        # Set up the mock chain
        mock_client.collection.return_value = mock_collection
        mock_collection.document.return_value = mock_doc
        mock_get_client.return_value = mock_client
        
        yield mock_client


@pytest.fixture
def sample_persona_data():
    """Return sample persona data for testing."""
    return {
        "name": "Jane Smith",
        "headline": "Software Engineer at Microsoft",
        "experience": [
            {"role": "Software Engineer", "company": "Microsoft", "duration": "2 y"},
            {"role": "Junior Developer", "company": "Startup Inc", "duration": "1 year"}
        ],
        "education": "BS Computer Science, MIT",
        "skills": ["Python", "JavaScript", "Cloud Computing"],
    }


@pytest.fixture
def sample_questions_data():
    """Return sample questions data for testing."""
    return [
        {
            "id": "content_intent",
            "question": "What are your primary goals for using social media?",
            "options": [
                "Thought Leadership",
                "Brand Awareness",
                "Lead Generation",
                "Networking",
                "Customer Engagement"
            ],
            "allow_multiple": True
        },
        {
            "id": "target_audience",
            "question": "Who is your target audience?",
            "options": [],
            "allow_multiple": False
        }
    ]
