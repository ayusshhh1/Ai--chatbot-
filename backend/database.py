"""
Alternative database configuration using SQLite
Use this if you don't want to set up PostgreSQL

To use this:
1. Rename this file to database.py (backup the original first)
2. Remove psycopg2-binary from requirements.txt
3. Update .env to use: DATABASE_URL=sqlite:///./chatbot.db
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os
from dotenv import load_dotenv

load_dotenv()

# SQLite database (simpler, no PostgreSQL needed)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./chatbot.db")

# Create engine with SQLite-specific settings
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
