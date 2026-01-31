import EmbedBotWidget from './components/EmbedBotWidget'

function App() {
  return (
    <>
      {/* Demo page - simulates a website with the widget embedded */}
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              EmbedBot Demo
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Click the chat button in the corner to try the embeddable widget
            </p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Welcome to EmbedBot
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              This page demonstrates the floating chat widget. The widget can be embedded on any
              website by adding a single script tag or React component. It stays in the corner
              and expands when users want to chat.
            </p>
            <div className="mt-8 p-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                💬 Look for the green chat bubble in the bottom-right corner →
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Floating embeddable chat widget */}
      <EmbedBotWidget
        title="EmbedBot"
        welcomeMessage="Hi! How can I help you today?"
        primaryColor="#059669"
      />
    </>
  )
}

export default App
