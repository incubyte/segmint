# Segmint Backend Test Suite

This directory contains tests for the Segmint backend API.

## Setup

The tests use pytest and pytest-asyncio to test both synchronous and asynchronous code. To run tests:

```bash
# Install dependencies (if not already done)
cd backend
uv pip install pytest pytest-asyncio pytest-cov

# Run all tests
python -m pytest

# Run with coverage
python -m pytest --cov=app

# Run specific test file
python -m pytest tests/test_main.py
```

## Test Structure

- `conftest.py`: Contains fixtures used across test files, including mock Firestore client
- `test_db.py`: Tests for database utility functions
- `test_main.py`: Tests for main API endpoints (root, health check)
- `test_persona.py`: Tests for the persona creation tools
- `test_persona_routes.py`: Tests for persona-related API routes
- `test_post_routes.py`: Tests for post generation API routes
- `test_questions.py`: Tests for questions API endpoints
- `test_utils.py`: Tests for utility functions

## Mock Structure

The tests use mocking extensively to avoid real dependencies:

1. **Environment Variables**: We mock all required environment variables like OPENAI_API_KEY
2. **Firestore Client**: We mock the Firestore client and all related operations
3. **External APIs**: We mock external HTTP calls to Make.com and other services

## Current Test Coverage

Current test coverage is around 89%. Areas with some missing coverage:

1. `app/core/agents.py`: Currently at 89% coverage, just missing some specific error handling cases in PersonaCreatorTool
2. `app/utils/db.py`: Currently at 87% coverage, missing some Firestore Sentinel handling and parts of list_personas
3. `app/routes/post.py`: Currently at 82%, missing some error handling and post listing edge cases

## Known Issues

Some tests are currently skipped due to the need for better mocking strategies:

1. Firestore client mocking needs improvement (singleton pattern makes it hard to test)
2. Several Firestore-dependent tests need better setup and teardown
3. The persona response model validation needs better test handling

## Future Improvements

1. Add proper environment handling for tests using an `.env.test` file
2. Improve mock strategy for Firestore client to better test database operations
3. Add more edge case tests (failures, invalid inputs)
4. Set up CI pipeline for automated testing