"""Application configuration from environment variables."""

import os
from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment."""

    # OpenRouter
    openrouter_api_key: str = ""
    model_name: str = "mistralai/mistral-7b-instruct:free"

    # API
    api_title: str = "EmbedBot API"
    api_version: str = "1.0.0"
    debug: bool = False

    # Optional: for OpenRouter app attribution
    site_url: str = ""
    site_name: str = "EmbedBot"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()
