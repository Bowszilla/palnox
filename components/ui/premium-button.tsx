'use client'
import { motion } from 'framer-motion'
import { Crown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  showIcon?: boolean
}

export function PremiumButton({
  children,
  size = 'md',
  fullWidth = false,
  showIcon = true,
  className,
  disabled,
  ...props
}: PremiumButtonProps) {
  const sizes = {
    sm: 'h-[38px] px-4 text-[13px] rounded-sm',
    md: 'h-12 px-[22px] text-[15px] rounded-md',
    lg: 'h-[54px] px-7 text-base rounded-md',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.985, y: 1 }}
      whileHover={{ filter: 'brightness(1.06)' }}
      transition={{ duration: 0.12 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-display font-bold',
        'cursor-pointer select-none whitespace-nowrap border-0 outline-none',
        'bg-grad-premium text-[#1a1206]',
        'shadow-glow-premium',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
        sizes[size],
        className
      )}
      disabled={disabled}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {showIcon && <Crown size={18} weight="fill" />}
      {children}
    </motion.button>
  )
}
