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
- `OPENAI_API_KEY`: OpenAI API key for integration

### Testing

```bash
pytest
```
# Add the following to your .gitignore
__pycache__/
*.py[cod]
*.class
venv/
.env
.pytest_cache/
