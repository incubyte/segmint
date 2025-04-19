# Segmint Backend

FastAPI backend for the Segmint application.

## Development

### Setup

```bash
# Install dependencies with uv
uv pip install -r requirements.txt

# Create .env file from example
cp .env.example .env
# Edit the .env file with your configurations
```

### Run Development Server

```bash
# Run with uvicorn directly
uvicorn app.main:app --reload

# Or using the main script
python main.py
```

API will be available at http://127.0.0.1:8000

### API Documentation

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

### Project Structure

```
backend/
├── app/
│   ├── core/        # Core functionality, configurations
│   ├── routes/      # API routes
│   └── main.py      # FastAPI application setup
├── main.py          # Entry point script
├── requirements.txt
└── .env.example
```

### Environment Variables

- `API_HOST`: Host to bind the server (default: 0.0.0.0)
- `API_PORT`: Port to bind the server (default: 8000)
- `API_DEBUG`: Enable debug mode (default: false)
- `OPENAI_API_KEY`: OpenAI API key for integration (required for persona creation)
- `FIREBASE_CREDENTIALS_PATH`: Path to Firebase service account credentials JSON file (default: firebase-credentials.json)

### Firebase Setup

The application uses Firebase Firestore to store persona data. Follow these steps to set up Firebase:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database in your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key" and download the JSON file
5. Save the downloaded JSON file as `firebase-credentials.json` in the backend directory or specify a custom path using the `FIREBASE_CREDENTIALS_PATH` environment variable

```bash
# Install Firebase Admin SDK
uv add firebase-admin
```

## API Endpoints

### Persona Creation

#### POST /persona/create-persona

Creates a professional persona from a LinkedIn profile URL.

**Request Body:**

```json
{
  "linkedin_url": "https://linkedin.com/in/johndoe"
}
```

**Response:**

```json
{
  "persona": "### John Doe\n**Senior Product Manager at Google**\n\n#### Experience\n- **Product Manager** at *Google* (3 years)\n- **Consultant** at *McKinsey* (2 years)\n\n#### Education\n- MBA, Stanford University\n\n#### Skills\nProduct Management, Leadership, Strategy",
  "steps": [
    // Array of intermediate steps taken by the agent
  ]
}
```

**cURL Example:**

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/persona/create-persona' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"linkedin_url": "https://linkedin.com/in/johndoe"}'
```

### Webhook Integration with Make.com

#### POST /webhook/make

The backend provides a webhook endpoint that integrates with Make.com for persona creation.

The Make.com webhook is available at:

```
https://hook.eu2.make.com/71tjabpjeamjb7cnuavyirh37p2gse0s
```

**Request Format:**

```json
{
  "questionaries": [
    {
      "question": "What are your primary goals for using social media?",
      "answer": "My main goals are to establish Thought Leadership and increase Brand Awareness. Networking with peers and potential partners is also important. Lead generation is a lower priority for now."
    }
  ]
}
```

**Response Format:**

```json
{
  "goals": ["Thought Leadership", "Brand Awareness", "Networking"],
  "target_audience": null,
  "tone_of_voice": [],
  "key_topics": [],
  "values": [],
  "preferred_formats": [],
  "persona_summary": "### John Doe\n**Professional at Company**\n\n..."
}
```

**Persona Creation Workflow:**

1. The webhook receives a request with questionaries data
2. The system maps the questions to internal question IDs
3. Missing required fields are filled with default values
4. A persona is generated based on the answers
5. Goals are extracted from the "content_intent" answers
6. The final persona with goals is sent back to Make.com

**cURL Example:**

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/webhook/make' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"questionaries": [{"question": "What are your primary goals for using social media?", "answer": "My main goals are to establish Thought Leadership and increase Brand Awareness."}]}'
```

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=term-missing

# Use the test script (sets up environment and runs tests with coverage)
./scripts/run_tests.sh
```

Tests are located in the `tests/` directory. See `tests/README.md` for more information about the test structure and coverage.

## Troubleshooting

If you encounter issues with the Make.com webhook integration, check:

1. The webhook URL is correct
2. The request format matches the expected structure
3. The backend server is running and accessible
4. The OPENAI_API_KEY is correctly set
