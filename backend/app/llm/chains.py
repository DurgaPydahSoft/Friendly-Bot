"""LangChain conversation logic."""

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from app.llm.client import get_llm

SYSTEM_PROMPT = """You are a helpful, friendly chatbot. Respond concisely and naturally.
Keep responses clear and appropriate for a website support context."""


def build_chat_chain():
    """Build a simple chat chain with optional history."""
    llm = get_llm()
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_PROMPT),
            MessagesPlaceholder(variable_name="history", optional=True),
            ("human", "{message}"),
        ]
    )
    return prompt | llm


def invoke_chat(message: str, history: list[tuple[str, str]] | None = None) -> str:
    """
    Invoke the chat chain with a message and optional conversation history.

    Args:
        message: User's current message
        history: Optional list of (human_msg, ai_msg) pairs for context

    Returns:
        AI reply as string
    """
    chain = build_chat_chain()

    messages = []
    if history:
        for human, ai in history[-10:]:  # Keep last 10 exchanges
            messages.append(HumanMessage(content=human))
            messages.append(AIMessage(content=ai))

    result = chain.invoke(
        {"message": message, "history": messages}
    )
    return result.content if hasattr(result, "content") else str(result)
