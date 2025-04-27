from unittest.mock import MagicMock

from google.cloud.firestore_v1.transforms import Sentinel

from app.utils.db import is_firestore_sentinel


def test_is_firestore_sentinel_with_sentinel():
    """Test is_firestore_sentinel function with a Firestore Sentinel."""
    # Create a mock Sentinel instance
    mock_sentinel = MagicMock(spec=Sentinel)
    
    # Test the function
    result = is_firestore_sentinel(mock_sentinel)
    
    # Verify the result
    assert result is True


def test_is_firestore_sentinel_with_non_sentinel():
    """Test is_firestore_sentinel function with various non-Sentinel values."""
    test_values = [
        "string value",
        123,
        123.45,
        True,
        None,
        [],
        {},
        {
            "key": "value"
        }
    ]
    
    # Test with each value
    for value in test_values:
        result = is_firestore_sentinel(value)
        assert result is False