/**
 * API client for EmbedBot backend.
 * - Standalone app: uses VITE_API_URL (or dev proxy).
 * - Embed: use setApiBase(url) before mounting; sendMessage uses that.
 */
let apiBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL != null
  ? import.meta.env.VITE_API_URL
  : ''

export function setApiBase(base) {
  apiBase = base == null ? '' : String(base).replace(/\/$/, '')
}

export function getApiBase() {
  return apiBase
}

export async function sendMessage(message) {
  const base = apiBase
  const url = base ? `${base}/chat` : '/chat'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })

  const data = await res.json().catch(() => ({ detail: 'Invalid response' }))

  if (!res.ok) {
    throw new Error(data.detail ?? `Request failed (${res.status})`)
  }

  return data.reply
}
