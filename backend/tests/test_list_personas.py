from unittest.mock import MagicMock, patch

import pytest

from app.utils.db import list_personas


@pytest.mark.asyncio
@patch("app.utils.db.get_firestore_client")
@patch("app.utils.db.convert_to_serializable")
async def test_list_personas_with_user_id(mock_convert, mock_get_client):
    """Test list_personas function with a specific user_id."""
    # Set up mocks
    mock_doc1 = MagicMock()
    mock_doc1.to_dict.return_value = {"name": "Persona 1", "created_at": "2022-01-01"}
    
    mock_doc2 = MagicMock()
    mock_doc2.to_dict.return_value = {"name": "Persona 2", "created_at": "2022-01-02"}
    
    # Mock the query and stream
    mock_query = MagicMock()
    mock_query.where.return_value = mock_query
    mock_query.order_by.return_value = mock_query
    mock_query.limit.return_value = mock_query
    mock_query.stream.return_value = [mock_doc1, mock_doc2]
    
    # Mock the collection
    mock_collection = MagicMock()
    mock_collection.return_value = mock_query
    
    # Mock the Firestore client
    mock_db = MagicMock()
    mock_db.collection = mock_collection
    mock_get_client.return_value = mock_db
    
    # Mock convert_to_serializable to return the same input
    mock_convert.side_effect = lambda x: x
    
    # Call the function
    result = await list_personas(user_id="test-user", limit=10)
    
    # Verify Firestore operations
    mock_get_client.assert_called_once()
    mock_collection.assert_called_once_with("personas")
    mock_query.where.assert_called_once_with("user_id", "==", "test-user")
    mock_query.order_by.assert_called_once()
    mock_query.limit.assert_called_once_with(10)
    mock_query.stream.assert_called_once()
    
    # Verify convert_to_serializable was called for each document
    assert mock_convert.call_count == 2
    
    # Verify the result
    assert len(result) == 2
    assert result[0] == {"name": "Persona 1", "created_at": "2022-01-01"}
    assert result[1] == {"name": "Persona 2", "created_at": "2022-01-02"}


@pytest.mark.asyncio
@patch("app.utils.db.get_firestore_client")
@patch("app.utils.db.convert_to_serializable")
async def test_list_personas_without_user_id(mock_convert, mock_get_client):
    """Test list_personas function without user_id (no filtering)."""
    # Set up mocks
    mock_doc1 = MagicMock()
    mock_doc1.to_dict.return_value = {"name": "Persona 1", "created_at": "2022-01-01"}
    
    mock_doc2 = MagicMock()
    mock_doc2.to_dict.return_value = {"name": "Persona 2", "created_at": "2022-01-02"}
    
    # Mock the query and stream
    mock_query = MagicMock()
    mock_query.order_by.return_value = mock_query
    mock_query.limit.return_value = mock_query
    mock_query.stream.return_value = [mock_doc1, mock_doc2]
    
    # Mock the collection
    mock_collection = MagicMock()
    mock_collection.return_value = mock_query
    
    # Mock the Firestore client
    mock_db = MagicMock()
    mock_db.collection = mock_collection
    mock_get_client.return_value = mock_db
    
    # Mock convert_to_serializable to return the same input
    mock_convert.side_effect = lambda x: x
    
    # Call the function without user_id
    result = await list_personas(limit=5)
    
    # Verify Firestore operations
    mock_get_client.assert_called_once()
    mock_collection.assert_called_once_with("personas")
    mock_query.where.assert_not_called()  # Should not be called without user_id
    mock_query.order_by.assert_called_once()
    mock_query.limit.assert_called_once_with(5)
    mock_query.stream.assert_called_once()
    
    # Verify convert_to_serializable was called for each document
    assert mock_convert.call_count == 2
    
    # Verify the result
    assert len(result) == 2
    assert result[0] == {"name": "Persona 1", "created_at": "2022-01-01"}
    assert result[1] == {"name": "Persona 2", "created_at": "2022-01-02"}


@pytest.mark.asyncio
@patch("app.utils.db.get_firestore_client")
@patch("app.utils.db.convert_to_serializable")
async def test_list_personas_empty_result(mock_convert, mock_get_client):
    """Test list_personas function returning empty list."""
    # Mock the query and stream
    mock_query = MagicMock()
    mock_query.where.return_value = mock_query
    mock_query.order_by.return_value = mock_query
    mock_query.limit.return_value = mock_query
    mock_query.stream.return_value = []  # Empty result
    
    # Mock the collection
    mock_collection = MagicMock()
    mock_collection.return_value = mock_query
    
    # Mock the Firestore client
    mock_db = MagicMock()
    mock_db.collection = mock_collection
    mock_get_client.return_value = mock_db
    
    # Call the function
    result = await list_personas(user_id="nonexistent-user", limit=10)
    
    # Verify Firestore operations
    mock_get_client.assert_called_once()
    mock_collection.assert_called_once_with("personas")
    mock_query.where.assert_called_once_with("user_id", "==", "nonexistent-user")
    mock_query.order_by.assert_called_once()
    mock_query.limit.assert_called_once_with(10)
    mock_query.stream.assert_called_once()
    
    # Verify convert_to_serializable was not called
    mock_convert.assert_not_called()
    
    # Verify the result is an empty list
    assert result == []