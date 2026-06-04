# PALNOX — The Ultimate Palworld Companion

Companion app pour Palworld : calculateur de lignée, optimiseur de traits, suivi de collection, carte interactive et assistant IA Nox.

## Stack

- **Frontend** : Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Backend** : Supabase (PostgreSQL + Auth + RLS)
- **UI** : Phosphor Icons · Framer Motion · Custom Design System
- **Fonts** : Chakra Petch (display) · Space Grotesk (body) · Rajdhani (stats)

## Prérequis

- Node.js ≥ 18
- npm ≥ 9
- Compte Supabase (gratuit)

## Installation

```bash
git clone https://github.com/ton-user/palnox.git
cd palnox
npm install
```

## Variables d'environnement

Récupère les clés depuis le dashboard Supabase :
👉 `https://supabase.com/dashboard/project/_/settings/api`

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Pour Phase 3 — Nox IA
# OPENAI_API_KEY=sk-...
```

## Configuration Supabase

1. Crée un nouveau projet sur [supabase.com](https://supabase.com)
2. Dans **SQL Editor**, exécute dans l'ordre :
   - `supabase/schema.sql` — tables + RLS policies + trigger profil
   - `supabase/seed.sql` — données initiales (15 Pals, traits, locations)
3. Active l'auth email/password dans **Authentication > Providers**
4. Copie les clés API dans `.env.local`

## Lancement local

```bash
npm run dev
# Ouvre http://localhost:3000
```

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lancer le build de prod |
| `npm run lint` | Vérification ESLint |

## Structure du projet

```
app/
  (main)/          → Routes protégées (avec AppShell + navigation)
    dashboard/     → Tableau de bord principal
    breeding/      → Calculateur de lignée
    traits/        → Optimiseur de passifs
    collection/    → Suivi Paldex
    map/           → Carte interactive
    assistant/     → Assistant Nox IA
    profile/       → Profil utilisateur
    settings/      → Paramètres
  auth/
    login/         → Connexion
    register/      → Inscription
  page.tsx         → Landing page (/)

components/
  ui/              → Boutons, badges, cartes, inputs, states
  layout/          → AppShell, PageHeader
  navigation/      → MobileBottomNav, DesktopSidebar
  cards/           → PalCard, BreedingResultCard, MapMarkerCard
  palnox/          → NoxAvatar
  feedback/        → AssistantChat

data/static/       → Pals, traits, breeding (mock, peut être remplacé par Supabase)
lib/
  supabase/        → Clients browser + server
  design-tokens/   → Tokens du design system
  utils.ts         → cn(), helpers
types/             → database.ts, pal.ts, breeding.ts, user.ts
supabase/          → schema.sql, seed.sql
palnox-design/     → Design system source (Claude Design)
docs/              → Documentation technique
```

## Déploiement Vercel

1. Push sur GitHub : `git init && git add . && git commit -m "feat: PALNOX MVP"`
2. Import dans [vercel.com](https://vercel.com/new)
3. Ajoute les 3 variables d'env dans les settings
4. Deploy ✓

## Design System

Voir `docs/design-system.md` — palette, gradients, typographie, tokens Tailwind.
Fichiers sources dans `palnox-design/project/`.

## Roadmap

Voir `docs/roadmap.md` pour les 4 phases.
