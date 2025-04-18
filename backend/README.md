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

### Using the Persona Creation API

The application includes a LinkedIn profile persona generation feature using LangChain agents. You can create professional personas from LinkedIn profiles with the following endpoint:

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

### Testing

```bash
pytest
```

# Add the following to your .gitignore

**pycache**/
_.py[cod]
_.class
venv/
.env
.pytest_cache/
