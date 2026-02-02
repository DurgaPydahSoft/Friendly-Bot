# Embedding the Chat Widget in Another Application

The widget is built as a **single JavaScript file** (`embed.js`) that you host and load on any website. No React or build step is required on the host site.

---

## 1. Build the embed file

From the frontend directory:

```bash
npm run build:embed
```

This produces **`dist/embed.js`** (and `dist/embed.js.map` for debugging). Serve `embed.js` from your CDN or static host (e.g. same domain as your backend, or Vercel/Netlify).

**Optional – default backend URL:** If you want the host site to use the chatbot **without** passing `apiUrl` in `init()`, set a build-time default:

```bash
VITE_EMBED_API_URL=https://your-backend.com npm run build:embed
```

Then the host can load the script and call `EmbedBot.init({})` or `EmbedBot.init({ title: 'Chat' })` with no `apiUrl`; the widget will use your backend. The host can still override by passing `apiUrl` in `init()`.

**Vercel:** The default `npm run build` now builds both the main app and `embed.js`, so you don’t need to change the build command. In the Vercel project → **Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `VITE_EMBED_API_URL` | `https://your-backend-url.com` |

Use your real backend URL (no trailing slash). Redeploy so the new build bakes it into `embed.js`. After deploy, the embed is available at `https://your-project.vercel.app/embed.js`.

---

## 2. Add the script to your page

In the HTML of the site where you want the chat bubble:

```html
<script src="https://your-domain.com/path/to/embed.js"></script>
```

Use the actual URL where you host `embed.js` (e.g. `https://your-app.vercel.app/embed.js` or `https://cdn.example.com/embed.js`).

---

## 3. Initialize the widget

After the script loads, call `EmbedBot.init()` with optional options. The backend URL can come from **init()** or from the **build-time default** (see step 1).

```html
<script src="https://your-domain.com/path/to/embed.js"></script>
<script>
  EmbedBot.init({
    apiUrl: 'https://your-backend.com',   // optional if embed was built with VITE_EMBED_API_URL
    title: 'Chat',                         // optional, default: 'Chat'
    welcomeMessage: 'Hi! How can I help?', // optional
    position: 'bottom-right',               // optional: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    primaryColor: '#059669',                // optional, default: emerald
  });
</script>
```

- **`apiUrl`** (optional if build default is set): Base URL of your FastAPI backend (e.g. `https://your-api.onrender.com` or `https://your-username-embedbot.hf.space`). No trailing slash. The widget calls `POST {apiUrl}/chat`. If omitted, the URL baked in at build time via `VITE_EMBED_API_URL` is used.
- **`title`**: Header title in the chat panel.
- **`welcomeMessage`**: First message shown before the user types.
- **`position`**: Corner of the screen for the floating button and panel.
- **`primaryColor`**: Hex color for the button and accents.

The script creates a floating chat button in the chosen corner. Clicking it opens the chat panel; all styles are self-contained in the bundle.

---

## 4. Full example (static HTML)

**With apiUrl in init():**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Site</title>
</head>
<body>
  <h1>My Website</h1>
  <p>Chat with us using the button in the corner.</p>

  <script src="https://your-domain.com/embed.js"></script>
  <script>
    EmbedBot.init({
      apiUrl: 'https://your-backend.com',
      title: 'Support',
      welcomeMessage: 'Hello! How can we help you today?',
      position: 'bottom-right',
      primaryColor: '#2563eb',
    });
  </script>
</body>
</html>
```

**Without apiUrl (embed built with default backend):**

```html
<script src="https://your-domain.com/embed.js"></script>
<script>
  EmbedBot.init({ title: 'Support', position: 'bottom-right' });
</script>
```

**Important:** Put the embed script **before** the script that calls `EmbedBot.init()`, and do **not** use `async` or `defer` on the embed script so it runs and defines `EmbedBot` before your init runs. If you load the script dynamically, call `EmbedBot.init()` only in the script’s `onload` callback.

---

## 5. Backend requirements

- Your EmbedBot backend must be **deployed and reachable** at the URL you pass as `apiUrl`.
- The backend must expose **`POST {apiUrl}/chat`** with JSON body `{ "message": "..." }` and response `{ "reply": "..." }`.
- **CORS** must allow the origin of the page that loads the widget (this repo’s backend uses `allow_origins=["*"]` by default).

---

## 6. Optional: destroy the widget

If you need to remove the widget (e.g. in a SPA when leaving a route), `init()` returns an object with a `destroy()` method:

```javascript
const instance = EmbedBot.init({ apiUrl: 'https://...' });
// later:
instance.destroy();
```

---

## Summary

| Step | Action |
|------|--------|
| 1 | Run `npm run build:embed` (optionally with `VITE_EMBED_API_URL=...`) and host `dist/embed.js` |
| 2 | Add `<script src=".../embed.js"></script>` to your page |
| 3 | Call `EmbedBot.init({ apiUrl: '...', ... })` — or `EmbedBot.init({})` if the embed was built with a default backend URL |
| 4 | Ensure your backend is live and CORS allows your site |

No npm install, no React, and no build step are required on the host application.
