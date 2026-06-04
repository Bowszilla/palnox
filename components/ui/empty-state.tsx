import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center gap-3', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-xl bg-surface-2 border border-[rgba(120,150,210,0.12)] flex items-center justify-center text-ink-3 mb-1">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-title text-ink-1">{title}</h3>
      {description && <p className="text-body-sm text-ink-3 max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
