from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uuid

from database import get_db, init_db
from models import Conversation, Message
from schemas import (
    ConversationResponse,
    ChatRequest,
    ChatResponse,
    MessageResponse
)

load_dotenv()

app = FastAPI(title="AI Chatbot API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

@app.on_event("startup")
def startup_event():
    """Initialize database on startup"""
    init_db()


@app.get("/")
def read_root():
    return {"message": "AI Chatbot API is running!", "status": "healthy"}


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Server is running"}


@app.post("/api/conversations", response_model=ConversationResponse)
def create_conversation(db: Session = Depends(get_db)):
    """Create a new conversation"""
    try:
        session_id = f"session_{uuid.uuid4().hex[:16]}"
        conversation = Conversation(session_id=session_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        return conversation
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/conversations/{conversation_id}/messages")
def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    """Get all messages for a conversation"""
    try:
        messages = db.query(Message).filter(
            Message.conversation_id == conversation_id
        ).order_by(Message.created_at.asc()).all()
        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest, db: Session = Depends(get_db)):
    """Send a message and get AI response"""
    try:
        # Verify conversation exists
        conversation = db.query(Conversation).filter(
            Conversation.id == chat_request.conversation_id
        ).first()
        
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Save user message
        user_message = Message(
            conversation_id=chat_request.conversation_id,
            role="user",
            content=chat_request.message
        )
        db.add(user_message)
        db.commit()
        
        # Get conversation history (exclude the message we just saved)
        messages = db.query(Message).filter(
            Message.conversation_id == chat_request.conversation_id
        ).order_by(Message.created_at.asc()).all()
        
        # Build conversation context for Gemini
        conversation_text = ""
        for msg in messages[:-1]:  # Exclude the last message (current user message)
            if msg.role == "user":
                conversation_text += f"User: {msg.content}\n"
            else:
                conversation_text += f"Assistant: {msg.content}\n"
        
        # Add current message
        conversation_text += f"User: {chat_request.message}\n"
        
        # Get AI response using simple generation
        response = model.generate_content(conversation_text + "Assistant:")
        ai_response = response.text
        
        # Save AI response
        assistant_message = Message(
            conversation_id=chat_request.conversation_id,
            role="assistant",
            content=ai_response
        )
        db.add(assistant_message)
        db.commit()
        db.refresh(assistant_message)
        
        return ChatResponse(
            response=ai_response,
            message_id=assistant_message.id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to get AI response: {str(e)}")


@app.delete("/api/conversations/{conversation_id}")
def delete_conversation(conversation_id: int, db: Session = Depends(get_db)):
    """Delete a conversation and all its messages"""
    try:
        conversation = db.query(Conversation).filter(
            Conversation.id == conversation_id
        ).first()
        
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        db.delete(conversation)
        db.commit()
        
        return {"message": "Conversation deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
