import { cn } from '@/lib/utils'
import type { PalRarity } from '@/types/pal'

interface TraitBadgeProps {
  label: string
  variant?: PalRarity | 'soft' | 'premium'
  dot?: boolean
  className?: string
}

const variantStyles: Record<string, string> = {
  common:    'text-rarity-common    bg-[rgba(138,151,184,0.16)]   border-[rgba(138,151,184,0.40)]',
  rare:      'text-rarity-rare      bg-[rgba(46,143,232,0.16)]    border-[rgba(46,143,232,0.45)]',
  epic:      'text-rarity-epic      bg-[rgba(139,69,230,0.18)]    border-[rgba(139,69,230,0.50)]',
  legendary: 'text-rarity-legendary bg-[rgba(245,182,56,0.18)]   border-[rgba(245,182,56,0.50)]',
  alpha:     'text-rarity-alpha     bg-[rgba(242,85,90,0.18)]    border-[rgba(242,85,90,0.50)]',
  lucky:     'text-rarity-lucky     bg-[rgba(31,195,212,0.18)]   border-[rgba(31,195,212,0.50)]',
  boss:      'text-rarity-boss      bg-[rgba(224,69,126,0.18)]   border-[rgba(224,69,126,0.50)]',
  soft:      'text-ink-2            bg-surface-3                  border-[rgba(120,150,210,0.12)]',
  premium:   'text-[#1a1206]        bg-grad-premium               border-transparent',
}

export function TraitBadge({ label, variant = 'soft', dot = false, className }: TraitBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[5px] h-6 px-[10px] rounded-pill',
        'font-display font-semibold text-[12px] tracking-[0.03em]',
        'border',
        variantStyles[variant] ?? variantStyles.soft,
        className
      )}
    >
      {dot && (
        <span className="w-[6px] h-[6px] rounded-full bg-current" />
      )}
      {label}
    </span>
  )
}
