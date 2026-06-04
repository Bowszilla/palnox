import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between px-5 pt-1.5 pb-3.5 relative z-10',
        className
      )}
    >
      <div>
        <h1 className="font-display font-bold text-[22px] tracking-tight text-ink-1 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-ink-3 mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}

export function IconButton({
  children,
  onClick,
  href,
  className,
}: {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
}) {
  const base = cn(
    'w-[42px] h-[42px] rounded-[13px] flex items-center justify-center',
    'bg-surface-2 border border-[rgba(120,150,210,0.12)]',
    'text-ink-2 text-[19px] cursor-pointer transition-all duration-150',
    'hover:text-ink-1 hover:border-[rgba(120,150,210,0.22)]',
    className
  )

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  )
}
