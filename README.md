---
title: EmbedBot
emoji: 💬
colorFrom: green
colorTo: green
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

**Option A – Script (recommended):** One JS file, no iframe. Build and serve the widget, then load it on any site:

1. In `frontend/`: run `npm run build:embed` → produces `dist/embed.js`.
2. Host `embed.js` (e.g. from your frontend deploy or CDN).
3. On the host site, add:
   ```html
   <script src="https://YOUR_URL/embed.js"></script>
   <script>
     EmbedBot.init({ apiUrl: 'https://YOUR_BACKEND_URL', title: 'Chat', position: 'bottom-right' });
   </script>
   ```

See **`frontend/INTEGRATION.md`** for full options (`title`, `welcomeMessage`, `position`, `primaryColor`) and examples.

**Option B – iframe:** Embed the demo app in an iframe:

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



# Product Requirements Document (PRD)

## 1. Product Overview

### Product Name

**EmbedBot** (working title)

### Description

EmbedBot is a **lightweight, embeddable AI chatbot** built using **LangChain (backend)** and **Lit-based Web Components (frontend)**. The chatbot can be integrated into **any web application** using a custom HTML tag and is designed to be framework-agnostic.

The system uses a **free Mistral model via OpenRouter API** and is deployed as a **single Dockerized full-stack application on Hugging Face Spaces**.

---

## 2. Goals & Objectives

### Primary Goals

* Build a **minimal yet production-ready chatbot** using LangChain
* Make the chatbot **embeddable as a web component**
* Enable **easy deployment using Docker**
* Use **OpenRouter + free Mistral model** for cost-free experimentation
* Host and run the app on **Hugging Face Spaces**

### Success Metrics

* Chatbot responds correctly to user queries
* Web component works across multiple websites
* Deployment runs successfully on Hugging Face Spaces
* Average response time < 5 seconds (free tier constraints)

---

## 3. Target Users

### Primary Users

* Frontend developers
* Indie hackers
* Students & learners (AI / LangChain)

### Use Cases

* Website support chatbot
* Portfolio project demo
* Internal tool chatbot
* Proof-of-concept AI assistant

---

## 4. Scope

### In Scope

* Basic chat interface (UI)
* Stateless or session-based conversation
* LangChain-based LLM integration
* Web component embedding
* Dockerized deployment

### Out of Scope (Phase 1)

* Authentication / user accounts
* Payments or subscriptions
* Fine-tuning models
* Multi-agent workflows
* File uploads or RAG

---

## 5. Functional Requirements

### 5.1 Chatbot Core

* Accept user input via Lit-based web component
* Send user messages to backend REST API
* Backend uses LangChain to construct prompts
* Calls OpenRouter API with Mistral model
* Returns LLM response to frontend

### 5.2 Conversation Handling

* Maintain short in-memory chat history per session
* Configurable history length
* Reset conversation option from UI

### 5.3 Web Component (Lit)

* Custom HTML element: `<embed-bot></embed-bot>`
* Encapsulated styles using Shadow DOM
* Reactive state handling via Lit
* Configurable attributes:

  * `title`
  * `theme` (light/dark)
  * `welcome-message`
  * `api-url`

### 5.4 Backend API

* REST-based communication
* JSON request/response format
* Input validation and error handling

### 5.5 Static Asset Serving

* FastAPI serves built Lit assets
* Single-origin hosting for frontend and backend

### 5.6 Deployment

* Docker-based build
* Compatible with Hugging Face Spaces
* Environment variables for secrets

## 6. Non-Functional Requirements

### Performance

* Handle at least 5–10 concurrent users
* Timeout handling for slow LLM responses

### Security

* API key stored in environment variables
* No API keys exposed to frontend
* Basic request sanitization

### Scalability

* Stateless backend design
* Easy replacement of LLM provider

### Maintainability

* Modular LangChain setup
* Clear folder structure
* Readable configuration

---

## 7. Tech Stack

### Frontend

* **Lit (Web Components)**
* HTML, CSS, JavaScript
* Shadow DOM for style isolation

### Backend

* Python
* FastAPI
* LangChain

### LLM Provider

* OpenRouter API
* Free Mistral Instruct model

### Deployment

* Docker
* Hugging Face Spaces

---

## 8. High-Level Architecture

```
[ Web App ]
     |
     |  <embed-bot />
     v
[ Web Component UI ]
     |
     v
[ FastAPI Backend ]
     |
     v
[ LangChain ]
     |
     v
[ OpenRouter (Mistral) ]
```

---

## 9. API Design (Draft)

### POST /chat

**Request**

```json
{
  "message": "Hello"
}
```

**Response**

```json
{
  "reply": "Hi! How can I help you today?"
}
```

---

## 10. Environment Variables

```
OPENROUTER_API_KEY=your_api_key
MODEL_NAME=mistral/mistral-7b-instruct
```

---

## 11. UX Requirements

* Clean chat UI
* Auto-scroll on new messages
* Loading indicator while waiting for response
* Error message on API failure

---

## 12. Risks & Constraints

### Risks

* Free model rate limits
* OpenRouter availability
* Hugging Face Spaces cold starts

### Constraints

* Limited compute on free HF Spaces
* No persistent storage by default

---

## 13. Future Enhancements (Phase 2)

* RAG with documents
* Streaming responses
* Memory persistence
* Multiple model selection
* Voice input/output
* Analytics dashboard

---

## 14. Milestones

| Phase   | Deliverable             |
| ------- | ----------------------- |
| Phase 1 | Basic chatbot backend   |
| Phase 2 | Web component UI        |
| Phase 3 | Dockerization           |
| Phase 4 | Hugging Face deployment |
| Phase 5 | Documentation & demo    |

---

## 15. Open Questions

* How much chat history should be retained?
* Should the component support iframe fallback?
* Should CORS be configurable?

---

**Status:** Draft


embedbot/
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── chat.py           # /chat endpoint
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py         # env vars, settings
│   │   │   └── logger.py         # logging setup
│   │   │
│   │   ├── llm/
│   │   │   ├── __init__.py
│   │   │   ├── client.py         # OpenRouter client
│   │   │   └── chains.py         # LangChain logic
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── chat.py           # request/response models
│   │   │
│   │   └── services/
│   │       ├── __init__.py
│   │       └── chat_service.py   # business logic
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── embed-bot.ts      # Lit web component
│   │   │
│   │   ├── styles/
│   │   │   └── theme.css         # light/dark themes
│   │   │
│   │   ├── utils/
│   │   │   └── api.ts            # API calls to backend
│   │   │
│   │   └── index.ts              # component entry
│   │
│   ├── public/
│   │   └── index.html            # demo page
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts            # build config
│
├── dist/
│   └── frontend/                 # built static assets (auto)
│
├── docker/
│   └── Dockerfile
│
├── scripts/
│   └── build.sh                  # optional build helper
│
├── .env.example                  # env variable template
├── README.md
└── huggingface.yaml              # HF Spaces config (if needed)
