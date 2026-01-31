---
title: EmbedBot
emoji: 💬
colorFrom: green
colorTo: emerald
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# EmbedBot

An embeddable AI chatbot powered by LangChain and Mistral via OpenRouter.

## Features

- 💬 Floating chat widget - embeddable on any website
- ⚡ FastAPI backend with LangChain
- 🎨 React + Tailwind frontend
- 🐳 Single Docker deployment
- 🆓 Uses free Mistral model via OpenRouter

## Usage

Click the green chat bubble in the bottom-right corner to start chatting!

## Tech Stack

- **Backend**: Python, FastAPI, LangChain
- **Frontend**: React, Vite, Tailwind CSS
- **LLM**: Mistral 7B Instruct (via OpenRouter)

## Embedding

Embed this chatbot on your website:

```html
<iframe
  src="https://YOUR_USERNAME-embedbot.hf.space"
  style="position:fixed;bottom:20px;right:20px;width:400px;height:600px;border:none;border-radius:16px;z-index:9999;"
></iframe>
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `MODEL_NAME` | LLM model (default: `mistralai/mistral-7b-instruct:free`) |
