"""Chat business logic and session handling."""

from typing import Optional

from app.core.logger import logger
from app.llm.chains import invoke_chat

# In-memory session store: session_id -> [(human, ai), ...]
# For production, use Redis or similar
_sessions: dict[str, list[tuple[str, str]]] = {}


def chat(
    message: str,
    session_id: Optional[str] = None,
    reset: bool = False,
) -> str:
    """
    Process a chat message and return the LLM response.

    Args:
        message: User message
        session_id: Optional session ID for conversation history
        reset: If True, clear history for this session before responding

    Returns:
        AI reply
    """
    if session_id and reset:
        _sessions.pop(session_id, None)

    history = None
    if session_id:
        history = _sessions.get(session_id)
        if history is None:
            _sessions[session_id] = []
            history = []

    try:
        reply = invoke_chat(message, history)

        if session_id and history is not None:
            _sessions[session_id].append((message, reply))

        return reply

    except Exception as e:
        logger.exception("Chat invocation failed: %s", e)
        raise


def clear_session(session_id: str) -> None:
    """Clear conversation history for a session."""
    _sessions.pop(session_id, None)
