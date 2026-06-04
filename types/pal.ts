export type PalElement =
  | 'Feu' | 'Eau' | 'Glace' | 'Foudre' | 'Terre'
  | 'Ténèbres' | 'Dragon' | 'Neutre' | 'Herbe' | 'Fée'

export type PalRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'alpha' | 'lucky' | 'boss'

export interface Pal {
  id: string
  palNumber: number
  name: string
  elementPrimary: PalElement
  elementSecondary?: PalElement
  rarity: PalRarity
  imageUrl?: string
  description?: string
  baseStats?: {
    hp: number
    attack: number
    defense: number
    speed: number
    work: number
  }
  workTypes?: string[]
}

export interface UserCollectionEntry {
  palId: string
  isCaptured: boolean
  isAlpha: boolean
  isLucky: boolean
  notes?: string
}
