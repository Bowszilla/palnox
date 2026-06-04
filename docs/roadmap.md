# Roadmap PALNOX

## Phase 1 — Socle MVP ✅ (actuel)

- [x] Architecture Next.js 16 App Router + TypeScript
- [x] Design system complet (tokens, composants, gradients, glassmorphism)
- [x] Supabase Auth (email/password + magic link)
- [x] Schéma PostgreSQL + RLS policies
- [x] Landing page
- [x] Dashboard avec stats mockées
- [x] Breeding Calculator (UI mockée)
- [x] Trait Optimizer (UI mockée)
- [x] Collection Tracker (UI mockée)
- [x] Carte Interactive (UI mockée)
- [x] Assistant Nox (chat mocké)
- [x] Profil & Paramètres
- [x] Navigation mobile (bottom nav + FAB Nox) + desktop (sidebar)
- [x] 20 composants UI réutilisables
- [x] Données statiques (15 Pals, 10 traits, combos)
- [x] Documentation complète

## Phase 2 — Données réelles

- [ ] Import dataset Pals complet (180 Pals Palworld)
- [ ] Breeding calculator avec algorithme réel (combinaisons exhaustives)
- [ ] Collection persistée dans Supabase
- [ ] Filtres et recherche avancée
- [ ] Suivi de progression synchronisé
- [ ] Carte Leaflet/Mapbox avec vraies coordonnées
- [ ] Marqueurs de spawns en temps réel
- [ ] React Query pour les fetches Supabase
- [ ] Optimistic updates collection

## Phase 3 — IA Nox

- [ ] Base de connaissance Palworld (embeddings)
- [ ] RAG via pgvector (Supabase Vector)
- [ ] API Route `/api/assistant` → OpenAI streaming
- [ ] Conversations persistées en DB
- [ ] Contexte utilisateur injecté (collection, lignées actives)
- [ ] Actions rapides : "ouvrir le calculateur pré-rempli"
- [ ] États animés Nox (idle/thinking/happy/error)
- [ ] Historique de conversations

## Phase 4 — Monétisation & PWA

- [ ] PALNOX Pro : feature gating (calculs illimités, IA avancée, exports)
- [ ] Stripe / Paddle intégration
- [ ] PWA manifest + service worker
- [ ] Push notifications (élosion, boss, série)
- [ ] App mobile (React Native / Expo avec NativeWind)
- [ ] Ads pour les utilisateurs Free (AdMob)
- [ ] Système de classements / leaderboards
- [ ] Partage de builds et lignées
- [ ] Mode hors-ligne (collection en cache)
