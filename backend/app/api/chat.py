"""Chat API endpoints."""

from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import chat

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def post_chat(request: ChatRequest) -> ChatResponse:
    """
    Accept a user message and return the LLM reply.

    Stateless: no session. For session-based chat, include X-Session-Id header
    (to be added when frontend sends it).
    """
    try:
        reply = chat(message=request.message)
        return ChatResponse(reply=reply)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail="Chat service temporarily unavailable. Please try again.",
        ) from e
