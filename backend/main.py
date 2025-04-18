import os

import uvicorn
from dotenv import load_dotenv

load_dotenv(override=True)

if __name__ == "__main__":
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("API_DEBUG", "false").lower() == "true"

    uvicorn.run("app.main:app", host=host, port=port, reload=debug)
