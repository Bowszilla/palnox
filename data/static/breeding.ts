import type { BreedingPath } from '@/types/breeding'

export const MOCK_BREEDING_PATHS: BreedingPath[] = [
  {
    rank: 1,
    combo: 'Anubis × Jetragon',
    steps: '→ Astegon · directe',
    generations: 2,
    label: 'le + rapide',
    isBest: true,
  },
  {
    rank: 2,
    combo: 'Anubis × Relaxaurus',
    steps: '→ Mau → Astegon',
    generations: 3,
    label: 'équilibré',
  },
  {
    rank: 3,
    combo: 'Jetragon × Frostallion',
    steps: '→ Blazamut → Astegon',
    generations: 4,
    label: 'traits rares',
  },
]

export interface MockBreedingCombo {
  parentAId: string
  parentBId: string
  childId: string
  probability: number
  generations: number
}

export const MOCK_BREEDING_COMBOS: MockBreedingCombo[] = [
  { parentAId: 'anubis',    parentBId: 'jetragon',    childId: 'astegon',    probability: 86, generations: 2 },
  { parentAId: 'anubis',    parentBId: 'blazamut',    childId: 'mammorest',  probability: 72, generations: 3 },
  { parentAId: 'foxparks',  parentBId: 'lifmunk',     childId: 'chikipi',    probability: 94, generations: 1 },
  { parentAId: 'grizzbolt', parentBId: 'frostallion', childId: 'pengullet',  probability: 68, generations: 2 },
  { parentAId: 'lamball',   parentBId: 'cattiva',     childId: 'lifmunk',    probability: 88, generations: 1 },
  { parentAId: 'relaxaurus', parentBId: 'mau',        childId: 'astegon',    probability: 55, generations: 4 },
]

export const NOX_TIPS = [
  {
    title: 'Astuce d\'élevage',
    text: 'Croise <strong>Anubis × Jetragon</strong> pour viser un Astegon avec le trait « Légende » plus rapidement.',
  },
  {
    title: 'Capture rapide',
    text: 'Jetragon se trouve dans le <strong>Secteur 4</strong> près de la Tour de la Fissure. Niv. 50 recommandé.',
  },
  {
    title: 'Traits optimaux',
    text: 'Pour un build ATK, combine <strong>Berserker + Seigneur de la destruction</strong> dès la 2ᵉ génération.',
  },
]
