import type { Pal } from './pal'

export interface BreedingCombination {
  id: string
  parentA: Pal
  parentB: Pal
  child: Pal
  probability?: number
  estimatedGenerations?: number
  notes?: string
}

export interface BreedingPath {
  rank: number
  combo: string
  steps: string
  generations: number
  label: string
  isBest?: boolean
}

export interface BreedingResult {
  child: Pal
  probability: number
  estimatedGenerations: number
  paths: BreedingPath[]
}

export interface TraitSlot {
  id: string
  name: string
  description: string
  effect: string
  tier: 'S' | 'A' | 'B' | 'C'
  category: string
  icon?: string
  isSelected?: boolean
}

export interface TraitBuildResult {
  score: string
  label: string
  traits: TraitSlot[]
  projectedStats: {
    attack: number
    defense: number
    speed: number
    work: number
  }
  powerBoost: number
}
