import { useState } from 'react'
import ChatPanel from './ChatPanel'

function ChatIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )
}

function CloseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

export default function EmbedBotWidget({
  title = 'EmbedBot',
  welcomeMessage = 'Hi! How can I help you today?',
  position = 'bottom-right',
  primaryColor = '#059669', // emerald-600
}) {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
  }

  const panelPositionClasses = {
    'bottom-right': 'bottom-20 right-5',
    'bottom-left': 'bottom-20 left-5',
    'top-right': 'top-20 right-5',
    'top-left': 'top-20 left-5',
  }

  return (
    <div className="fixed z-[9999] font-sans" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Chat panel */}
      {isOpen && (
        <div
          className={`fixed ${panelPositionClasses[position]} w-[380px] max-w-[calc(100vw-2rem)] embed-widget-panel`}
          style={{
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          }}
        >
          <ChatPanel
            title={title}
            welcomeMessage={welcomeMessage}
            primaryColor={primaryColor}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${positionClasses[position]} flex items-center justify-center w-14 h-14 rounded-full text-white transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95`}
        style={{
          backgroundColor: primaryColor,
          boxShadow: '0 4px 14px 0 rgb(0 0 0 / 0.2)',
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <ChatIcon />
        )}
      </button>
    </div>
  )
}
