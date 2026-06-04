'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode, HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  sheen?: boolean
  padding?: boolean
}

export function GlassCard({
  children,
  hover = false,
  sheen = false,
  padding = true,
  className,
  onClick,
  ...rest
}: GlassCardProps) {
  const base = cn(
    'relative overflow-hidden rounded-lg',
    'bg-grad-surface border border-[rgba(120,150,210,0.12)]',
    'shadow-card',
    padding && 'p-5',
    sheen && 'card-sheen',
    className
  )

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -3, borderColor: 'rgba(46,143,232,0.45)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
        className={cn(base, 'cursor-pointer')}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={base} onClick={onClick} {...rest}>
      {children}
    </div>
  )
}
