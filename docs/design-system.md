# Design System PALNOX

Source : `palnox-design/project/` (Claude Design)

## Palette

| Token CSS | Hex | Usage |
|-----------|-----|-------|
| `--bg-base` | `#060A12` | Fond le plus profond, nav |
| `--bg-0` | `#0A0F1B` | Fond app principal |
| `--surface-1` | `#131B2D` | Cartes |
| `--surface-2` | `#1A2438` | Inputs, cartes surélevées |
| `--surface-3` | `#243150` | Hover, chips |
| `--primary-500` | `#2E8FE8` | Bleu Palworld (CTA, actif) |
| `--cyan-500` | `#1FC3D4` | Accent cyan (Nox, lucky) |
| `--violet-500` | `#8B45E6` | Violet Betnox (premium, traits) |

## Gradients

| Classe Tailwind | Définition | Usage |
|-----------------|-----------|-------|
| `bg-grad-brand` | blue → violet | CTA principal |
| `bg-grad-cyan` | cyan clair → blue | Barres de progression |
| `bg-grad-premium` | violet → or | Pro, premium |
| `bg-grad-surface` | surface sheen | Fond des cartes |
| `bg-grad-nox` | radial cyan/blue/violet | Avatar Nox |

## Typographie

| Famille | Variable CSS | Usage |
|---------|-------------|-------|
| Chakra Petch | `--font-chakra-petch` | `font-display` — titres, nav, boutons |
| Space Grotesk | `--font-space-grotesk` | `font-body` — corps de texte |
| Rajdhani | `--font-rajdhani` | `font-stat` — chiffres, stats |

## Border-radius

```
rounded-xs  → 6px
rounded-sm  → 10px   (chips, boutons sm)
rounded-md  → 14px   (inputs, boutons)
rounded-lg  → 18px   (cartes)
rounded-xl  → 24px   (cards larges)
rounded-2xl → 32px   (modales)
rounded-pill → 999px (badges, chips)
```

## Glows (box-shadows colorées)

```css
--glow-blue:    0 0 0 1px rgba(46,143,232,0.40), 0 8px 28px rgba(46,143,232,0.35)
--glow-violet:  0 0 0 1px rgba(139,69,230,0.45), 0 8px 30px rgba(139,69,230,0.40)
--glow-premium: 0 8px 30px rgba(245,182,56,0.30), 0 0 0 1px rgba(245,182,56,0.35)
```

## Couleurs de rareté Pals

| Rareté | Couleur |
|--------|---------|
| Common | `#8A97B8` |
| Rare | `#2E8FE8` |
| Epic | `#8B45E6` |
| Legendary | `#F5B638` |
| Alpha | `#F2555A` |
| Lucky | `#1FC3D4` |
| Boss | `#E0457E` |

## Icônes

Le projet utilise **Phosphor Icons** (`@phosphor-icons/react`).

```tsx
import { House, Dna, Sparkle } from '@phosphor-icons/react'
<House size={24} weight="fill" />
<Dna size={20} weight="duotone" />
```

Poids disponibles : `regular`, `bold`, `fill`, `duotone`, `light`, `thin`

## Tailwind v4

Tous les tokens sont définis dans `app/globals.css` via `@theme inline`.

Exemples d'utilisation :
```tsx
// Couleurs
className="bg-surface-1 text-ink-1"
className="text-primary-500 bg-cyan-300"

// Gradients
className="bg-grad-brand"
style={{ background: 'var(--grad-surface)' }}

// Glows (box-shadow)
className="shadow-glow-blue"
style={{ boxShadow: 'var(--glow-violet)' }}

// Radius
className="rounded-lg"   // 18px
className="rounded-pill" // 999px

// Fonts
className="font-display font-bold"
className="font-stat font-semibold"
```
