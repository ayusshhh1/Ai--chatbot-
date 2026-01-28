from pydantic import BaseModel
from datetime import datetime
from typing import List


class MessageBase(BaseModel):
    role: str
    content: str


class MessageCreate(MessageBase):
    conversation_id: int


class MessageResponse(MessageBase):
    id: int
    conversation_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ConversationCreate(BaseModel):
    pass


class ConversationResponse(BaseModel):
    id: int
    session_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str
    conversation_id: int


class ChatResponse(BaseModel):
    response: str
    message_id: int
