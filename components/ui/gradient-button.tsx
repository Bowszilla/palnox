'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  icon?: ReactNode
}

export function GradientButton({
  children,
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  const sizes = {
    sm: 'h-[38px] px-4 text-[13px] rounded-sm',
    md: 'h-12 px-[22px] text-[15px] rounded-md',
    lg: 'h-[54px] px-7 text-base rounded-md',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.985, y: 1 }}
      whileHover={{ filter: 'brightness(1.08)' }}
      transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-display font-semibold',
        'text-white cursor-pointer select-none whitespace-nowrap border-0 outline-none',
        'transition-shadow duration-200',
        'bg-grad-brand shadow-[0_6px_20px_rgba(46,143,232,0.30)]',
        'hover:shadow-[0_8px_26px_rgba(46,143,232,0.42)]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        fullWidth && 'w-full',
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {isLoading ? (
        <span className="w-[18px] h-[18px] border-2 border-white/40 border-t-white rounded-full animate-spin-fast" />
      ) : (
        <>
          {icon && <span className="w-[18px] h-[18px] flex items-center justify-center">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  )
}
