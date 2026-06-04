import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function getPalElementColor(element: string): string {
  const map: Record<string, string> = {
    Feu: 'var(--error-500)',
    Eau: 'var(--primary-300)',
    Glace: 'var(--cyan-300)',
    Foudre: 'var(--warning-400)',
    Terre: 'var(--rarity-legendary)',
    Ténèbres: 'var(--violet-300)',
    Dragon: 'var(--rarity-boss)',
    Neutre: 'var(--rarity-common)',
    Herbe: 'var(--success-400)',
    Fée: 'var(--rarity-boss)',
  }
  return map[element] ?? 'var(--text-3)'
}

export function getRarityColor(rarity: string): string {
  const map: Record<string, string> = {
    common: 'var(--rarity-common)',
    rare: 'var(--rarity-rare)',
    epic: 'var(--rarity-epic)',
    legendary: 'var(--rarity-legendary)',
    alpha: 'var(--rarity-alpha)',
    lucky: 'var(--rarity-lucky)',
    boss: 'var(--rarity-boss)',
  }
  return map[rarity.toLowerCase()] ?? 'var(--rarity-common)'
}
