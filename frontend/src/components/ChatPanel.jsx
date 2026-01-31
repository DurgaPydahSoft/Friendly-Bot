import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../utils/api'

function MessageBubble({ role, content, primaryColor }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'text-white rounded-br-md'
            : 'bg-zinc-100 dark:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 rounded-bl-md'
        }`}
        style={isUser ? { backgroundColor: primaryColor } : {}}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  )
}

function LoadingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-zinc-100 dark:bg-zinc-700/80 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default function ChatPanel({
  title = 'EmbedBot',
  welcomeMessage = 'Hi! How can I help you today?',
  primaryColor = '#059669',
  onClose,
}) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const reply = await sendMessage(text)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message ?? 'Failed to get response. Please try again.')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleReset = () => {
    setMessages([])
    setError(null)
    setInput('')
    inputRef.current?.focus()
  }

  const showWelcome = messages.length === 0 && !loading

  return (
    <div
      className="flex flex-col h-[520px] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900"
      style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-zinc-200 dark:border-zinc-700/80"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px]">{title}</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Online • Typically replies instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
            title="New chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-zinc-50/50 dark:bg-zinc-900/50">
        {showWelcome && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2.5 bg-zinc-100 dark:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300">
              <p className="text-sm leading-relaxed">{welcomeMessage}</p>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} primaryColor={primaryColor} />
        ))}
        {loading && <LoadingDots />}
        {error && (
          <div className="flex justify-center">
            <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 shrink-0"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: primaryColor }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
