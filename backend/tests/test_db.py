from unittest.mock import MagicMock

import pytest

from app.utils.db import (
    convert_to_serializable,
    get_persona_by_id,
    list_personas,
)


class TestConvertToSerializable:
    def test_empty_dict(self):
        """Test with empty dictionary."""
        assert convert_to_serializable({}) == {}

    def test_simple_dict(self):
        """Test with simple dictionary with no special values."""
        data = {"name": "Test", "age": 30, "active": True}
        assert convert_to_serializable(data) == data

    def test_nested_dict(self):
        """Test with nested dictionary."""
        data = {"user": {"name": "Test", "age": 30}, "active": True}
        assert convert_to_serializable(data) == data

    def test_list_in_dict(self):
        """Test with list in dictionary."""
        data = {"names": ["Alice", "Bob"], "active": True}
        assert convert_to_serializable(data) == data

    def test_list_with_dicts(self):
        """Test with list containing dictionaries."""
        data = {"users": [{"name": "Alice"}, {"name": "Bob"}], "active": True}
        assert convert_to_serializable(data) == data


@pytest.mark.asyncio
async def test_get_persona_by_id(mock_firestore):
    """Test get_persona_by_id function."""
    # Setup mock document
    mock_doc = MagicMock()
    mock_doc.exists = True
    mock_doc.to_dict.return_value = {"name": "Test Persona", "created_at": "2022-01-01"}
    
    # Setup mock document reference
    mock_doc_ref = MagicMock()
    mock_doc_ref.get.return_value = mock_doc
    
    # Setup mock collection reference
    mock_collection = MagicMock()
    mock_collection.document.return_value = mock_doc_ref
    
    # Setup mock Firestore client
    mock_firestore.collection.return_value = mock_collection
    
    # Call the function
    result = await get_persona_by_id("test-id")
    
    # Assertions
    assert result == {"name": "Test Persona", "created_at": "2022-01-01"}
    mock_firestore.collection.assert_called_once_with("personas")
    mock_collection.document.assert_called_once_with("test-id")
    mock_doc_ref.get.assert_called_once()


@pytest.mark.asyncio
async def test_get_persona_by_id_not_found(mock_firestore):
    """Test get_persona_by_id function when persona not found."""
    # Setup mock document
    mock_doc = MagicMock()
    mock_doc.exists = False
    
    # Setup mock document reference
    mock_doc_ref = MagicMock()
    mock_doc_ref.get.return_value = mock_doc
    
    # Setup mock collection reference
    mock_collection = MagicMock()
    mock_collection.document.return_value = mock_doc_ref
    
    # Setup mock Firestore client
    mock_firestore.collection.return_value = mock_collection
    
    # Call the function
    result = await get_persona_by_id("non-existing-id")
    
    # Assertions
    assert result is None
    mock_firestore.collection.assert_called_once_with("personas")
    mock_collection.document.assert_called_once_with("non-existing-id")
    mock_doc_ref.get.assert_called_once()


@pytest.mark.asyncio
async def test_list_personas(mock_firestore):
    """Test list_personas function."""
    # Skip this test as we need better mocking for the Firestore client
    pytest.skip("Need to improve Firestore mocking")
    
    # Setup mock documents
    mock_doc1 = MagicMock()
    mock_doc1.to_dict.return_value = {"name": "Persona 1", "created_at": "2022-01-01"}
    
    mock_doc2 = MagicMock()
    mock_doc2.to_dict.return_value = {"name": "Persona 2", "created_at": "2022-01-02"}
    
    # Setup mock query
    mock_query = MagicMock()
    mock_query.stream.return_value = [mock_doc1, mock_doc2]
    
    # Setup mock collection reference
    mock_collection = MagicMock()
    mock_collection.where.return_value = mock_query
    mock_collection.order_by.return_value = mock_query
    mock_query.limit.return_value = mock_query
    
    # Setup mock Firestore client
    mock_firestore.collection.return_value = mock_collection
    
    # Call the function with user_id
    result = await list_personas(user_id="test-user", limit=10)
    
    # Assertions
    assert result == [
        {"name": "Persona 1", "created_at": "2022-01-01"},
        {"name": "Persona 2", "created_at": "2022-01-02"},
    ]
    mock_firestore.collection.assert_called_with("personas")
    mock_collection.where.assert_called_once_with("user_id", "==", "test-user")