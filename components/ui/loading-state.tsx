import { cn } from '@/lib/utils'

interface LoadingStateProps {
  message?: string
  className?: string
}

export function LoadingState({ message = 'Chargement…', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 gap-4', className)}>
      <div className="w-10 h-10 rounded-full border-2 border-surface-3 border-t-primary-500 animate-spin-fast" />
      <span className="font-display font-semibold text-caption text-ink-3 tracking-widest uppercase">
        {message}
      </span>
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg overflow-hidden bg-surface-1 border border-[rgba(120,150,210,0.12)] animate-pulse', className)}>
      <div className="h-20 bg-surface-2" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-surface-3 rounded-pill w-3/4" />
        <div className="h-2.5 bg-surface-2 rounded-pill w-1/2" />
      </div>
    </div>
  )
}
