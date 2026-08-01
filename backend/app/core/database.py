import os
import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL with fallback to local SQLite database file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./kisaan.db")

connect_args = {}
if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception:
    # Safe secondary fallback in case of driver configuration anomalies
    engine = create_engine("sqlite:///./kisaan.db", connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Farmer profile model
class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    farmer_name = Column(String(100), default="Ramesh Kumar")
    location = Column(String(100), default="Bhatinda, Punjab")
    current_crop = Column(String(50), default="Tomato")
    land_size_hectares = Column(Float, default=1.5)
    soil_type = Column(String(50), default="Loam")
    ph = Column(Float, default=6.7)
    irrigation_type = Column(String(50), default="Drip")
    budget = Column(String(50), default="Medium")
    language = Column(String(10), default="en")

# Conversation chat log model
class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), index=True)
    role = Column(String(20)) # user, assistant, system
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

# Database session dependency injector
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initializes tables and populates default farmer profile if missing."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Check if profile already exists, if not seed a default profile
        profile = db.query(FarmerProfile).first()
        if not profile:
            default_profile = FarmerProfile(
                farmer_name="Ramesh Kumar",
                location="Bhatinda, Punjab",
                current_crop="Tomato",
                land_size_hectares=1.5,
                soil_type="Loam",
                ph=6.7,
                irrigation_type="Drip",
                budget="Medium",
                language="en"
            )
            db.add(default_profile)
            db.commit()
    finally:
        db.close()
