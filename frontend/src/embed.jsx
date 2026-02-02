/**
 * Embeddable widget entry.
 * Build with: npm run build:embed
 * Optional: VITE_EMBED_API_URL=https://... so host can call EmbedBot.init() without apiUrl.
 * Output: dist/embed.js — load on any site and call EmbedBot.init({ apiUrl: '...' }) or EmbedBot.init({})
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setApiBase } from './utils/api'
import EmbedBotWidget from './components/EmbedBotWidget'
import './index.css'

const CONTAINER_ID = 'embed-bot-root'

function init(options = {}) {
  const {
    apiUrl,
    title = 'Chat',
    welcomeMessage = 'Hi! How can I help you today?',
    position = 'bottom-right',
    primaryColor = '#059669',
  } = options

  // Use apiUrl from init(), or build-time default (VITE_EMBED_API_URL or VITE_API_URL)
  const baseUrl = (typeof apiUrl === 'string' && apiUrl.trim())
    ? apiUrl.trim()
    : (import.meta.env.VITE_EMBED_API_URL || import.meta.env.VITE_API_URL || '')

  if (!baseUrl) {
    console.warn(
      '[EmbedBot] No backend URL. Pass apiUrl in init() or build with VITE_EMBED_API_URL. Example: EmbedBot.init({ apiUrl: "https://your-api.com" })'
    )
    return
  }

  setApiBase(baseUrl.replace(/\/$/, ''))

  let container = document.getElementById(CONTAINER_ID)
  if (!container) {
    container = document.createElement('div')
    container.id = CONTAINER_ID
    document.body.appendChild(container)
  }

  const root = createRoot(container)
  root.render(
    <StrictMode>
      <EmbedBotWidget
        title={title}
        welcomeMessage={welcomeMessage}
        position={position}
        primaryColor={primaryColor}
      />
    </StrictMode>
  )

  return {
    destroy() {
      root.unmount()
      container?.remove?.()
    },
  }
}

if (typeof window !== 'undefined') {
  window.EmbedBot = { init }
}
