export const colors = {
  bgBase:   '#060A12',
  bg0:      '#0A0F1B',
  bg1:      '#0E1422',
  surface1: '#131B2D',
  surface2: '#1A2438',
  surface3: '#243150',
  surface4: '#2E3D60',

  primary500: '#2E8FE8',
  primary300: '#5FA9F2',
  cyan300:    '#45E0EE',
  cyan500:    '#1FC3D4',
  violet300:  '#A66EF0',
  violet500:  '#8B45E6',

  text1: '#EEF3FF',
  text2: '#AEBBD8',
  text3: '#7787A8',
  text4: '#515E7C',

  rarity: {
    common:    '#8A97B8',
    rare:      '#2E8FE8',
    epic:      '#8B45E6',
    legendary: '#F5B638',
    alpha:     '#F2555A',
    lucky:     '#1FC3D4',
    boss:      '#E0457E',
  },
} as const

export const gradients = {
  brand:   'linear-gradient(135deg, #2E8FE8 0%, #8B45E6 100%)',
  cyan:    'linear-gradient(135deg, #29D6E6 0%, #2E8FE8 100%)',
  violet:  'linear-gradient(135deg, #A66EF0 0%, #7430C9 100%)',
  premium: 'linear-gradient(135deg, #8B45E6 0%, #F5B638 100%)',
  success: 'linear-gradient(135deg, #4ADE9E 0%, #1FA86B 100%)',
  surface: 'linear-gradient(160deg, #1A2438 0%, #121A2B 100%)',
  nox:     'radial-gradient(120% 120% at 50% 30%, #29D6E6 0%, #2E8FE8 38%, #7430C9 100%)',
} as const

export const radius = {
  xs:   '6px',
  sm:   '10px',
  md:   '14px',
  lg:   '18px',
  xl:   '24px',
  '2xl':'32px',
  pill: '999px',
} as const

export const animation = {
  easeOut:   'cubic-bezier(0.22, 1, 0.36, 1)',
  easeSpring:'cubic-bezier(0.34, 1.56, 0.64, 1)',
  fast:       0.12,
  normal:     0.2,
  slow:       0.36,
} as const

export const NAV_TABS = [
  { id: 'dashboard',  label: 'Accueil',    icon: 'House',       href: '/dashboard' },
  { id: 'collection', label: 'Pals',       icon: 'SquaresFour', href: '/collection' },
  { id: 'assistant',  label: 'Nox',        icon: 'Sparkle',     href: '/assistant', fab: true },
  { id: 'map',        label: 'Carte',      icon: 'MapTrifold',  href: '/map' },
  { id: 'profile',    label: 'Profil',     icon: 'User',        href: '/profile' },
] as const
