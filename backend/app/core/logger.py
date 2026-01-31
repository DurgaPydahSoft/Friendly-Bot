"""Logging configuration."""

import logging
import sys

from app.core.config import get_settings


def setup_logger(name: str = "embedbot") -> logging.Logger:
    """Configure and return application logger."""
    settings = get_settings()
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG if settings.debug else logging.INFO)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(logging.DEBUG if settings.debug else logging.INFO)
        formatter = logging.Formatter(
            "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


logger = setup_logger()
