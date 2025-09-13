import os
from dotenv import load_dotenv

# Load .env file if exists
load_dotenv()

class Config:
    # Secret key for sessions, JWTs, etc.
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key")

    # Database URI: from environment or fallback to local SQLite
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///data.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Optional: other config values
    DEBUG = os.getenv("DEBUG", "True") == "True"
    TESTING = os.getenv("TESTING", "False") == "True"
