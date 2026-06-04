'use client'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  className?: string
}

export function SearchInput({ placeholder = 'Rechercher…', value, onChange, className }: SearchInputProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-[10px] h-12 px-[14px]',
        'bg-surface-2 border border-[rgba(120,150,210,0.12)] rounded-pill',
        'text-ink-3',
        className
      )}
    >
      <MagnifyingGlass size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-ink-1 font-body text-[15px] placeholder:text-ink-4"
      />
    </div>
  )
}
