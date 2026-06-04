'use client'
import { useState } from 'react'
import { DotsThreeVertical, ArrowLeft, Sparkle } from '@phosphor-icons/react'
import { AssistantChat, type ChatMessage } from '@/components/feedback/assistant-chat'
import { NoxAvatar } from '@/components/palnox/nox-avatar'

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Comment obtenir un <b style="color:var(--cyan-300)">Astegon</b> rapidement ?',
  },
  {
    id: '2',
    role: 'assistant',
    content: `Bonne cible ! 🔥 Le chemin le plus court est <b style="color:var(--cyan-300)">2 générations</b> via élevage direct. Voici la meilleure combinaison : <strong>Anubis × Jetragon</strong>. Probabilité estimée : <b style="color:var(--cyan-300)">86 %</b>.`,
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Tu veux que je t\'ouvre le calculateur avec ce plan pré-rempli ?',
  },
  {
    id: '4',
    role: 'user',
    content: 'Oui, et montre-moi où trouver Jetragon',
  },
]

const SUGGESTIONS = [
  'Ouvrir le calculateur',
  'Voir sur la carte',
  'Meilleurs traits ?',
  'Conseils de capture',
]

const MOCK_RESPONSES: Record<string, string> = {
  default: 'Je cherche la meilleure réponse pour toi... 🔍 <b style="color:var(--cyan-300)">Jetragon</b> se trouve dans le <b>Secteur 4</b> près de la Tour de la Fissure. Niv. 50 recommandé, taux de capture ~14 %.',
  'Ouvrir le calculateur': 'J\'ouvre le <b style="color:var(--cyan-300)">Breeding Calculator</b> avec Anubis × Jetragon pré-rempli. Va dans l\'onglet <b>Breeding</b> pour voir le résultat complet !',
  'Voir sur la carte': 'Je marque la position de <b style="color:var(--cyan-300)">Jetragon</b> sur la carte. Tu le trouveras dans le Secteur 4, nord-est de la Tour de la Fissure.',
  'Meilleurs traits ?': 'Pour <b style="color:var(--cyan-300)">Astegon</b>, le build optimal est :<br>• <b>Seigneur de la destruction</b> (+30% ATK)<br>• <b>Berserker</b> (+20% ATK, -10% DEF)<br>• <b>Athlétique</b> (+15% SPD)',
  'Conseils de capture': 'Pour capturer <b style="color:var(--cyan-300)">Jetragon</b> :<br>• Utilise des Legendary Spheres<br>• Affaiblis-le à moins de 25% PV<br>• Évite les dégâts de zone',
}

let nextId = 5

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [noxState, setNoxState] = useState<'idle' | 'thinking' | 'happy'>('idle')

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = { id: String(nextId++), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)
    setNoxState('thinking')

    setTimeout(() => {
      const response = MOCK_RESPONSES[text] ?? MOCK_RESPONSES.default
      const botMsg: ChatMessage = { id: String(nextId++), role: 'assistant', content: response }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
      setNoxState('happy')
      setTimeout(() => setNoxState('idle'), 2000)
    }, 1400)
  }

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100dvh - 80px)' }}>
      {/* Header */}
      <header
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(120,150,210,0.12)', background: 'rgba(6,10,18,0.50)', backdropFilter: 'blur(12px)' }}
      >
        <button className="w-10 h-10 flex items-center justify-center text-ink-2">
          <ArrowLeft size={20} />
        </button>
        <NoxAvatar state={noxState} size={48} />
        <div className="flex-1">
          <div className="font-display font-bold text-[17px] text-ink-1 flex items-center gap-1.5">
            Nox <Sparkle size={14} weight="fill" color="var(--cyan-300)" />
          </div>
          <div className="text-[11.5px] flex items-center gap-1.5" style={{ color: 'var(--success-400)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--success-400)' }} />
            Assistant IA · en ligne
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-ink-2">
          <DotsThreeVertical size={20} />
        </button>
      </header>

      {/* Chat */}
      <div className="flex-1 overflow-hidden">
        <AssistantChat
          messages={messages}
          isTyping={isTyping}
          onSend={handleSend}
          suggestions={SUGGESTIONS}
        />
      </div>
    </div>
  )
}
