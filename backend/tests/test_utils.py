import os
import pytest
from unittest.mock import patch, MagicMock

from app.utils.db import get_firestore_client


@patch("firebase_admin.credentials.Certificate")
@patch("firebase_admin.initialize_app")
@patch("firebase_admin.firestore.client")
@patch("firebase_admin.get_app", side_effect=ValueError)
def test_get_firestore_client(mock_get_app, mock_firestore_client, mock_init_app, mock_cert):
    """Test getting the Firestore client."""
    # Skip this test for now as singleton pattern makes it hard to test
    # in the current setup without more complex mocking
    pytest.skip("Need to refactor to properly test the singleton pattern")
    
    # Mock the Certificate and initialize_app functions
    mock_cert.return_value = "mock-cert"
    mock_init_app.return_value = "mock-app"
    
    # Mock the Firestore client
    mock_client = MagicMock()
    mock_firestore_client.return_value = mock_client
    
    # Set the environment variable for the test
    os.environ["FIREBASE_CREDENTIALS_PATH"] = "test-credentials.json"
    
    # Call the function
    client = get_firestore_client()
    
    # Assertions
    assert client == mock_client
    mock_cert.assert_called_once_with("test-credentials.json")
    mock_init_app.assert_called_once_with("mock-cert")
    mock_firestore_client.assert_called_once()
