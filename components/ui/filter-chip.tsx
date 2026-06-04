'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface FilterChipProps {
  label: string
  active?: boolean
  icon?: ReactNode
  onClick?: () => void
  className?: string
}

export function FilterChip({ label, active = false, icon, onClick, className }: FilterChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex-none inline-flex items-center gap-[6px] h-[34px] px-[14px] rounded-pill',
        'font-display font-semibold text-[13px] cursor-pointer',
        'border transition-all duration-200',
        active
          ? 'bg-[rgba(46,143,232,0.18)] text-primary-200 border-primary-500'
          : 'bg-surface-2 text-ink-2 border-[rgba(120,150,210,0.22)] hover:border-[rgba(120,150,210,0.35)] hover:text-ink-1',
        className
      )}
    >
      {icon}
      {label}
    </motion.button>
  )
}
