/**
 * API client for EmbedBot backend.
 * Uses Vite proxy in dev (empty base) or VITE_API_URL in production.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export async function sendMessage(message) {
  const res = await fetch(`${API_BASE}/chat`, {
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
