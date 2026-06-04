export interface UserProfile {
  id: string
  username: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  isPro?: boolean
  level?: number
  streak?: number
}

export interface UserStats {
  captured: number
  total: number
  alpha: number
  lucky: number
  activeBreedings: number
  streak: number
  completion: number
}
