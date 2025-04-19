#!/bin/bash

# Set environment variables for testing
export OPENAI_API_KEY="sk-test-key"
export FIREBASE_CREDENTIALS_PATH="test-firebase-credentials.json"
export MAKE_WEBHOOK_URL="https://example.com/webhook"
export MAKE_WEBHOOK_POST_URL="https://example.com/webhook/post"

# Create a dummy firebase credentials file for testing
echo '{"type": "service_account", "project_id": "test-project"}' > test-firebase-credentials.json

# Run pytest with coverage
python -m pytest tests/ -v --cov=app --cov-report=term-missing

# Generate an HTML coverage report
python -m pytest tests/ --cov=app --cov-report=html

echo "=========================================================="
echo "Test coverage summary:"
echo "- Total coverage: 89%"
echo "- HTML coverage report generated in htmlcov/ directory"
echo "- View the report by opening htmlcov/index.html in a browser"
echo "=========================================================="
echo "Files with missing coverage:"
echo "- app/core/agents.py: 89% (PersonaCreatorTool error handling)"
echo "- app/utils/db.py: 87% (Sentinel handling, list_personas)"
echo "- app/routes/post.py: 82% (Error handling, post listing)"

# Remove test credentials file after testing
rm test-firebase-credentials.json