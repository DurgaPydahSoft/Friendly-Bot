"""Chat request and response schemas."""

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Incoming chat message from client."""

    message: str = Field(..., min_length=1, max_length=10000)


class ChatResponse(BaseModel):
    """LLM reply to send back to client."""

    reply: str
