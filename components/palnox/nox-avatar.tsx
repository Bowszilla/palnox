'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type NoxState = 'idle' | 'thinking' | 'happy' | 'error' | 'success' | 'loading'

interface NoxAvatarProps {
  state?: NoxState
  size?: number
  animated?: boolean
  showGlow?: boolean
  className?: string
}

const STATE_IMAGE: Record<NoxState, string> = {
  idle:     '/mascot/nox-idle.png',
  thinking: '/mascot/nox-thinking.png',
  happy:    '/mascot/nox-happy.png',
  error:    '/mascot/nox-error.png',
  success:  '/mascot/nox-success.png',
  loading:  '/mascot/nox-loading.png',
}

export function NoxAvatar({
  state = 'idle',
  size = 48,
  animated = true,
  showGlow = true,
  className,
}: NoxAvatarProps) {
  const imgSrc = STATE_IMAGE[state]

  return (
    <motion.div
      className={cn('relative rounded-full flex items-center justify-center', className)}
      style={{
        width: size,
        height: size,
        background: 'var(--grad-nox)',
        boxShadow: showGlow ? 'var(--glow-cyan)' : undefined,
        border: '1px solid rgba(255,255,255,0.14)',
        flexShrink: 0,
      }}
      animate={
        animated && state === 'loading'
          ? { opacity: [1, 0.7, 1] }
          : animated
          ? { y: [0, -3, 0] }
          : undefined
      }
      transition={
        state === 'loading'
          ? { duration: 1, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <Image
        src={imgSrc}
        alt="Nox"
        width={Math.round(size * 0.8)}
        height={Math.round(size * 0.8)}
        className="object-contain"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
      />
    </motion.div>
  )
}

/* Inline mini Nox (for chat bubbles) */
export function NoxMini({ size = 30 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: 'var(--grad-nox)',
      }}
    >
      <Image
        src="/mascot/nox-mascot.png"
        alt="Nox"
        width={Math.round(size * 0.8)}
        height={Math.round(size * 0.8)}
        className="object-contain"
      />
    </div>
  )
}
