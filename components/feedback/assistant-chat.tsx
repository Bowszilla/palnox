'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperPlaneRight, Microphone, Image as ImageIcon, Sparkle } from '@phosphor-icons/react'
import { NoxMini } from '@/components/palnox/nox-avatar'
import { cn } from '@/lib/utils'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

interface AssistantChatProps {
  messages: ChatMessage[]
  isTyping?: boolean
  onSend?: (message: string) => void
  suggestions?: string[]
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="self-end max-w-[82%]"
      >
        <div
          className="px-[15px] py-3 rounded-[18px] rounded-br-[6px] text-[14px] leading-[1.5] text-white"
          style={{ background: 'var(--grad-brand)' }}
          dangerouslySetInnerHTML={{ __html: msg.content }}
        />
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2.5 max-w-[82%] self-start"
    >
      <NoxMini size={30} />
      <div
        className="px-[15px] py-3 rounded-[18px] rounded-bl-[6px] text-[14px] leading-[1.5] text-ink-1 border"
        style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.12)' }}
        dangerouslySetInnerHTML={{ __html: msg.content }}
      />
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-2.5 self-start"
    >
      <NoxMini size={30} />
      <div
        className="flex gap-1 items-center px-4 py-3 rounded-[18px] rounded-bl-[6px] border"
        style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.12)' }}
      >
        <span className="w-[7px] h-[7px] rounded-full bg-ink-3 animate-bounce-dot" />
        <span className="w-[7px] h-[7px] rounded-full bg-ink-3 animate-bounce-dot-2" />
        <span className="w-[7px] h-[7px] rounded-full bg-ink-3 animate-bounce-dot-3" />
      </div>
    </motion.div>
  )
}

export function AssistantChat({
  messages,
  isTyping = false,
  onSend,
  suggestions = [],
}: AssistantChatProps) {
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    onSend?.(input.trim())
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-[18px] py-4 flex flex-col gap-3.5"
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <Sparkle size={32} weight="fill" color="var(--cyan-300)" />
            <p className="text-body-sm text-ink-3">
              Pose une question à Nox sur Palworld…
            </p>
          </div>
        )}
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div
          className="flex gap-2 overflow-x-auto px-[18px] pb-2.5"
          style={{ scrollbarWidth: 'none' }}
        >
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => onSend?.(s)}
              className="flex-none px-3.5 py-2.5 rounded-full border font-display font-medium text-[12.5px] text-ink-2 whitespace-nowrap cursor-pointer transition-colors hover:border-[rgba(120,150,210,0.35)] hover:text-ink-1"
              style={{
                background: 'var(--surface-2)',
                borderColor: 'rgba(120,150,210,0.22)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 border-t"
        style={{
          background: 'rgba(6,10,18,0.86)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(120,150,210,0.12)',
        }}
      >
        <div
          className="flex-1 flex items-center gap-2 h-[46px] pl-4 pr-2 rounded-full border"
          style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.22)' }}
        >
          <input
            type="text"
            placeholder="Demande à Nox…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent border-none outline-none text-ink-1 font-body text-[14px] placeholder:text-ink-4"
          />
          <ImageIcon size={18} color="var(--text-3)" className="cursor-pointer" />
          <Microphone size={18} color="var(--text-3)" className="cursor-pointer" />
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-none"
          style={{
            background: 'var(--grad-brand)',
            boxShadow: 'var(--glow-blue)',
          }}
        >
          <PaperPlaneRight size={20} weight="fill" color="#fff" />
        </motion.button>
      </div>
    </div>
  )
}
