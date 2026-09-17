"use client"

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Hello! I am your Subtriva AI assistant. I can help you with contractor compliance, document renewals, latest state regulations, and general construction business questions. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }))
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.text, history })
      })
      
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.text || 'Failed to get response')
      
      const aiMsg: Message = { id: Date.now().toString(), role: 'assistant', text: data.text }
      setMessages(prev => [...prev, aiMsg])
    } catch (error: any) {
      const errorMsg: Message = { id: Date.now().toString(), role: 'assistant', text: error.message || 'Sorry, I encountered an error.' }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F25900]/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#F25900]" />
        </div>
        <div>
          <h1 className="font-semibold text-slate-900 dark:text-white">Subtriva AI Assistant</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Compliance & Document Expert</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div
            
            
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#F25900]/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#F25900]" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm ${
              msg.role === 'user' 
                ? 'bg-[#F25900] text-white rounded-br-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div
            
            
            className="flex gap-4 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#F25900]/10 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#F25900]" />
            </div>
            <div className="max-w-[80%] rounded-2xl px-5 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-[#F25900] animate-spin" />
              <span className="text-sm text-slate-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="flex gap-3 relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about compliance, licenses, state laws..."
            className="flex-1 pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F25900] dark:text-white placeholder:text-slate-400 text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 bottom-1.5 w-10 flex items-center justify-center bg-[#F25900] hover:bg-[#D94F00] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
