"""Firebase Firestore database utilities."""

import os
from datetime import datetime
from typing import Any, Dict, Optional

import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.transforms import Sentinel

# Singleton pattern for Firestore client
_db: Optional[firestore.Client] = None


def get_firestore_client() -> firestore.Client:
    """
    Initialize Firebase app if not already initialized and return Firestore client.

    Returns:
        firestore.Client: Initialized Firestore client
    """
    global _db

    if _db is None:
        # Check if Firebase app is already initialized
        try:
            firebase_admin.get_app()
        except ValueError:
            # Get service account key path from environment or use default
            cred_path = os.environ.get(
                "FIREBASE_CREDENTIALS_PATH", "firebase-credentials.json"
            )
            # Initialize Firebase app
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)

        # Create Firestore client
        _db = firestore.client()

    return _db


def convert_to_serializable(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert Firestore data to a serializable format.

    Handles special Firestore types like SERVER_TIMESTAMP.

    Args:
        data: Firestore document data

    Returns:
        Dict[str, Any]: Serializable dictionary
    """
    if not data:
        return {}

    result = {}
    for key, value in data.items():
        # Handle SERVER_TIMESTAMP Sentinel
        if is_firestore_sentinel(value):
            result[key] = datetime.now().isoformat()
        # Handle nested dictionaries
        elif isinstance(value, dict):
            result[key] = convert_to_serializable(value)
        # Handle lists that might contain dictionaries
        elif isinstance(value, list):
            result[key] = [
                convert_to_serializable(item) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            result[key] = value

    return result


async def get_persona_by_id(persona_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a persona by its ID.

    Args:
        persona_id: The ID of the persona to retrieve

    Returns:
        Optional[Dict[str, Any]]: The persona data if found, None otherwise
    """
    db = get_firestore_client()
    doc_ref = db.collection("personas").document(persona_id)
    doc = doc_ref.get()

    if doc.exists:
        return convert_to_serializable(doc.to_dict())
    return None


def get_persona_by_id_sync(persona_id: str) -> Optional[Dict[str, Any]]:
    """
    Synchronous version to retrieve a persona by its ID.

    Args:
        persona_id: The ID of the persona to retrieve

    Returns:
        Optional[Dict[str, Any]]: The persona data if found, None otherwise
    """
    db = get_firestore_client()
    doc_ref = db.collection("personas").document(persona_id)
    doc = doc_ref.get()

    if doc.exists:
        return convert_to_serializable(doc.to_dict())
    return None


async def list_personas(user_id: Optional[str] = None, limit: int = 10) -> list:
    """
    List personas, optionally filtered by user_id.

    Args:
        user_id: Optional user ID to filter by
        limit: Maximum number of personas to return

    Returns:
        list: List of persona documents
    """
    db = get_firestore_client()
    query = db.collection("personas")

    if user_id:
        query = query.where("user_id", "==", user_id)

    # Order by created_at descending (newest first)
    query = query.order_by("created_at", direction=firestore.Query.DESCENDING).limit(
        limit
    )

    docs = query.stream()
    return [convert_to_serializable(doc.to_dict()) for doc in docs]


def is_firestore_sentinel(value):
    """
    Check if a value is a Firestore Sentinel.

    Args:
        value: The value to check

    Returns:
        bool: True if the value is a Firestore Sentinel, False otherwise
    """
    return isinstance(value, Sentinel)
