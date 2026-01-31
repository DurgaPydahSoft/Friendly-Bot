"""OpenRouter LLM client via LangChain."""

from langchain_openai import ChatOpenAI

from app.core.config import get_settings


def get_llm() -> ChatOpenAI:
    """Create and return LangChain ChatOpenAI client configured for OpenRouter."""
    settings = get_settings()

    # OpenRouter uses OpenAI-compatible API
    extra_headers = {}
    if settings.site_url:
        extra_headers["HTTP-Referer"] = settings.site_url
    if settings.site_name:
        extra_headers["X-Title"] = settings.site_name

    return ChatOpenAI(
        model=settings.model_name,
        api_key=settings.openrouter_api_key,
        base_url="https://openrouter.ai/api/v1",
        temperature=0.7,
        timeout=60,
        max_retries=2,
        default_headers=extra_headers if extra_headers else None,
    )
