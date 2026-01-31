# Split Deployment Guide

**Backend** → Hugging Face Spaces  
**Frontend** → Vercel

---

## Part 1: Backend on Hugging Face Spaces

### What changed
- Dockerfile now builds **backend only** (no frontend)
- HF Space exposes the API at `https://dpkakileti-friendlychat.hf.space`

### Setup (if not already done)

1. **Push to GitHub** – The workflow will sync to HF Spaces
2. **HF Space secrets** – Add `OPENROUTER_API_KEY` in Space Settings
3. **API base URL** – `https://dpkakileti-friendlychat.hf.space`

### Test the backend
```bash
curl https://dpkakileti-friendlychat.hf.space/health
curl -X POST https://dpkakileti-friendlychat.hf.space/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## Part 2: Frontend on Vercel

### Step 1: Push code to GitHub
Ensure your repo is on GitHub with the latest changes.

### Step 2: Create Vercel project

1. Go to https://vercel.com and sign in (use GitHub)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: Click **Edit** → set to `frontend`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)

### Step 3: Add environment variable

In **Settings** → **Environment Variables**, add:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://dpkakileti-friendlychat.hf.space` | Production, Preview, Development |

⚠️ **Important**: No trailing slash. Vite embeds this at build time.

### Step 4: Deploy

Click **Deploy**. Vercel will:
1. Build the frontend
2. Deploy to something like `your-project.vercel.app`

### Step 5: Verify

1. Open your Vercel URL
2. Click the chat bubble
3. Send a message – it should call the HF backend

---

## CORS

The backend allows all origins (`allow_origins=["*"]`), so the Vercel frontend can call it without issues.

---

## Summary

| Component | URL |
|-----------|-----|
| Backend (HF Spaces) | https://dpkakileti-friendlychat.hf.space |
| Frontend (Vercel) | https://your-project.vercel.app |

---

## Troubleshooting

**"Chat service temporarily unavailable"**
- Check HF Space logs
- Verify `OPENROUTER_API_KEY` is set in HF Space secrets

**CORS errors**
- Backend allows `*`; if issues persist, check backend logs

**Frontend shows wrong API**
- Rebuild on Vercel after changing `VITE_API_URL` (it’s embedded at build time)
