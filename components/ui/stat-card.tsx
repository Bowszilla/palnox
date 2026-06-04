import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StatCardProps {
  value: string | number
  label: string
  valueColor?: string
  icon?: ReactNode
  className?: string
}

export function StatCard({ value, label, valueColor, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex-1 p-3 rounded-md text-center',
        'bg-grad-surface border border-[rgba(120,150,210,0.12)]',
        className
      )}
    >
      {icon && <div className="flex justify-center mb-1">{icon}</div>}
      <b
        className="font-stat font-bold text-[22px] block leading-tight"
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </b>
      <span className="font-display font-semibold text-[10.5px] tracking-[0.04em] uppercase text-ink-3">
        {label}
      </span>
    </div>
  )
}
