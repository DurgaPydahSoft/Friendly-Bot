# Deploying EmbedBot to Hugging Face Spaces

This guide covers deploying the full-stack EmbedBot application (FastAPI backend + React frontend) to Hugging Face Spaces using Docker.

---

## Prerequisites

1. **Hugging Face account** - Sign up at https://huggingface.co/join
2. **OpenRouter API key** - Get one at https://openrouter.ai/keys (free tier available)
3. **Git** - For pushing to the Space

---

## Step 1: Create a New Space

1. Go to https://huggingface.co/new-space
2. Fill in:
   - **Owner**: Your username or organization
   - **Space name**: `embedbot` (or your preferred name)
   - **License**: Choose one (e.g., MIT)
   - **SDK**: Select **Docker**
   - **Hardware**: CPU Basic (free tier works fine)
3. Click **Create Space**

---

## Step 2: Clone the Space Repository

```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/embedbot
cd embedbot
```

---

## Step 3: Copy Project Files

Copy these files/folders to the cloned Space directory:

```
embedbot/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── api/
│   │   ├── core/
│   │   ├── llm/
│   │   ├── schemas/
│   │   └── services/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
├── Dockerfile
└── README.md          # HF Spaces metadata (see below)
```

---

## Step 4: Create the README.md for HF Spaces

Create a `README.md` in the root with this content:

```markdown
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
- Floating chat widget
- LangChain + OpenRouter backend
- React + Tailwind frontend
- Single Docker deployment
```

---

## Step 5: Set Environment Secrets

1. Go to your Space's **Settings** tab
2. Scroll to **Repository secrets**
3. Add these secrets:

| Name | Value |
|------|-------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `MODEL_NAME` | `mistralai/mistral-7b-instruct:free` (optional) |

These are injected as environment variables at runtime.

---

## Step 6: Push to Hugging Face

```bash
git add .
git commit -m "Initial EmbedBot deployment"
git push
```

Hugging Face will:
1. Detect the `Dockerfile`
2. Build the Docker image
3. Start the container on port 7860
4. Make it accessible at `https://huggingface.co/spaces/YOUR_USERNAME/embedbot`

---

## Step 7: Verify Deployment

1. Wait for the build to complete (check the **Logs** tab)
2. Visit your Space URL
3. Click the floating chat button and test a message

---

## Dockerfile Overview

The included `Dockerfile`:

1. **Stage 1**: Builds the React frontend with Vite
2. **Stage 2**: Creates a Python image with FastAPI
3. Copies built frontend to `/app/static`
4. FastAPI serves both API routes and static files
5. Runs on port 7860 (HF Spaces default)

---

## Troubleshooting

### Build fails

- Check the **Logs** tab for errors
- Ensure `package-lock.json` exists (run `npm install` locally first)
- Verify all files are committed

### Chat returns errors

- Verify `OPENROUTER_API_KEY` secret is set correctly
- Check logs for API errors
- Test the model name is valid on OpenRouter

### Cold starts

- Free tier Spaces sleep after inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to persistent hardware if needed

---

## Local Docker Testing

Test the Docker build locally before pushing:

```bash
# Build
docker build -t embedbot .

# Run (replace with your API key)
docker run -p 7860:7860 \
  -e OPENROUTER_API_KEY=your_key_here \
  embedbot

# Open http://localhost:7860
```

---

## Embedding on Other Websites

Once deployed, embed the chatbot on any website:

### Option 1: iframe

```html
<iframe
  src="https://YOUR_USERNAME-embedbot.hf.space"
  style="position:fixed;bottom:20px;right:20px;width:400px;height:600px;border:none;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:9999;"
></iframe>
```

### Option 2: Link to the Space

Share your Space URL directly: `https://huggingface.co/spaces/YOUR_USERNAME/embedbot`

---

## Cost

- **Hugging Face Spaces**: Free tier available (CPU Basic)
- **OpenRouter**: Free Mistral model (`mistralai/mistral-7b-instruct:free`)

No costs for basic usage!

---

## Updating the Deployment

Make changes locally, then:

```bash
git add .
git commit -m "Update description"
git push
```

HF Spaces will automatically rebuild and redeploy.

---

## Deploying via GitHub (CI/CD)

If your code is on GitHub, you can auto-deploy to HF Spaces on every push.

### Setup

1. **Get HF Write Token**
   - Go to https://huggingface.co/settings/tokens
   - Create a token with **Write** access
   - Copy it

2. **Add GitHub Secrets/Variables**
   
   Go to your GitHub repo → Settings → Secrets and variables → Actions
   
   Add **Secret**:
   | Name | Value |
   |------|-------|
   | `HF_TOKEN` | Your HF write token |
   
   Add **Variable**:
   | Name | Value |
   |------|-------|
   | `HF_SPACE` | `your-username/embedbot` |

3. **Push to GitHub**
   
   The workflow at `.github/workflows/deploy-hf.yml` will:
   - Trigger on every push to `main`
   - Push the code to your HF Space
   - HF Spaces will rebuild automatically

4. **Set Runtime Secrets in HF Spaces**
   
   Still add `OPENROUTER_API_KEY` in HF Space Settings → Repository secrets

### Manual Deploy

You can also trigger the workflow manually:
- Go to Actions → "Deploy to Hugging Face Spaces" → Run workflow
