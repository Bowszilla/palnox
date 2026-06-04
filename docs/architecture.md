# Architecture PALNOX

## Vue d'ensemble

PALNOX est une application Next.js 16 avec App Router. Elle utilise un modèle hybride : pages statiques/SSR côté serveur, interactions client via React 19.

## Principes

- **Mobile-first** : layout adaptatif (bottom nav mobile → sidebar desktop)
- **Dark-only** : design system à thème unique
- **Data-agnostique** : données mockées en Phase 1, facilement remplacées par Supabase
- **Composants réutilisables** : design system interne cohérent

## Routage

```
/                  → Landing page (public, statique)
/auth/login        → Connexion (public)
/auth/register     → Inscription (public)

/(main)/dashboard  → Dashboard (protégé)
/(main)/breeding   → Breeding Calculator (protégé)
/(main)/traits     → Trait Optimizer (protégé)
/(main)/collection → Collection Tracker (protégé)
/(main)/map        → Carte Interactive (protégé)
/(main)/assistant  → Assistant Nox (protégé)
/(main)/profile    → Profil (protégé)
/(main)/settings   → Paramètres (protégé)
```

Le route group `(main)` fournit l'`AppShell` (sidebar + bottom nav) à toutes les routes protégées.

## Protection des routes

`proxy.ts` (renommé depuis `middleware.ts` en Next.js 16) intercepte toutes les requêtes :
- Routes protégées sans session → redirect `/auth/login?redirectTo=...`
- Routes `/auth/*` avec session → redirect `/dashboard`

## Flux de données

```
Phase 1 (MVP)      : data/static/*.ts  → importés directement dans les pages
Phase 2 (données)  : lib/supabase/client.ts → hooks React Query → pages
Phase 3 (IA Nox)   : API Route /api/assistant → OpenAI SDK → streaming
```

## Composants

| Dossier | Contenu |
|---------|---------|
| `components/ui/` | Primitives : boutons, badges, inputs, states |
| `components/layout/` | AppShell, PageHeader |
| `components/navigation/` | MobileBottomNav, DesktopSidebar |
| `components/cards/` | PalCard, BreedingResultCard, MapMarkerCard |
| `components/palnox/` | NoxAvatar (états idle/thinking/happy/error) |
| `components/feedback/` | AssistantChat |

## Animations

Framer Motion est utilisé avec parcimonie :
- `whileHover` / `whileTap` sur les cartes et boutons
- `AnimatePresence` pour les bulles de chat
- Floating animation sur la mascotte Nox

## Responsivité

| Breakpoint | Layout |
|------------|--------|
| `< lg` (< 1024px) | Mobile : bottom nav, full-width |
| `≥ lg` (≥ 1024px) | Desktop : sidebar 220px + contenu centré max-w-2xl |
