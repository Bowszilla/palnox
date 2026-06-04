# PALNOX — Design System

**Le companion Palworld ultime.** Système de design dark-only, mobile-first, pour une app de capture, élevage et optimisation de créatures.

> Identité : **fusion 70 % Palworld** (azur, cyan, aventure) **+ 30 % Betnox** (violet premium).

---

## 📁 Structure du projet

```
PALNOX Design System.html   ← LIVRABLE CENTRAL (ouvrir en premier)
colors_and_type.css         ← tokens couleurs + type (source de vérité)
components.css              ← bibliothèque de composants (boutons, cartes, badges…)
assets/                    ← logo, mascotte Nox
screens/                   ← 8 écrans hi-fi (390×844)
  ├─ accueil.html
  ├─ breeding.html
  ├─ optimizer.html
  ├─ collection.html
  ├─ carte.html
  ├─ nox.html
  ├─ profil.html
  ├─ parametres.html
  ├─ screen.css            ← shell mobile partagé
  └─ common.js             ← status bar + tab bar injectés
dev/
  ├─ tokens.json           ← tokens neutres (toute plateforme)
  └─ palnox.preset.js      ← preset Tailwind (Next.js + React Native)
```

Ouvre **`PALNOX Design System.html`** pour la documentation navigable complète.

---

## 🎨 Fondations

### Couleurs
| Rôle | Token | HEX |
|---|---|---|
| Primary (Palworld) | `--primary-500` | `#2E8FE8` |
| Secondary (cyan) | `--cyan-500` | `#1FC3D4` |
| Accent (Betnox) | `--violet-500` | `#8B45E6` |
| Fond app | `--bg-0` | `#0A0F1B` |
| Surface carte | `--surface-1` | `#131B2D` |
| Succès / Alerte / Erreur | — | `#2FCB85` / `#F5A524` / `#F2555A` |

**Rareté in-game** (alignée sur la marque) : Commun `#8A97B8` · Rare `#2E8FE8` · Épique `#8B45E6` · Legendary `#F5B638` · Alpha `#F2555A` · Lucky `#1FC3D4` · Boss `#E0457E`.

### Typographie
- **Chakra Petch** — titres, chiffres, UI, navigation, boutons.
- **Space Grotesk** — corps de texte.
- **Rajdhani** — grands chiffres de stats.
- Min. 13 px en UI mobile. Tabular-nums sur tous les compteurs.

### Spacing & radius
Base 4 px (`--sp-1` … `--sp-10`). Rayon carte par défaut `--r-lg` (18 px) ; pills à 999 px.

---

## 🧩 Composants
Boutons (Primary / Secondary / Ghost / Danger / Premium) · Cartes (dont carte Pal) · Badges de rareté & pills sémantiques · Champs, recherche, filtres, toggles, onglets · Navigation (app bar, bottom tab bar avec FAB Nox central).

Toutes les classes vivent dans `components.css` et s'appuient sur les variables de `colors_and_type.css`.

---

## 👻 Mascotte — Nox
Esprit flottant cyan/violet : assistant IA, onboarding, états vides. Vues requises : face + 3/4. Le glow d'aura encode l'état (cyan idle, vert succès, rouge erreur, violet réflexion). Prompt de génération fourni dans la doc.

> ⚠️ Les visuels de créatures dans les écrans sont des **placeholders** (mascotte Nox recolorée). À remplacer par les illustrations finales.

---

## 📱 Écrans hi-fi
8 écrans, 390 × 844 (iPhone) :
1. **Accueil** — dashboard, progression Paldex, accès rapides
2. **Breeding Calculator** — combinaison de parents, descendant prédit, chemins
3. **Trait Optimizer** — build de passifs, score, stats projetées
4. **Collection Tracker** — Paldex en grille, filtres, raretés
5. **Carte Interactive** — pins boss/spawn/alpha, fiche de lieu
6. **Assistant IA Nox** — chat companion avec recommandations
7. **Profil** — stats joueur, succès, activité
8. **Paramètres** — préférences, notifications, compte, Pro

---

## 🛠 Intégration développeur

**Tailwind (Next.js / React Native via NativeWind)**
```js
// tailwind.config.js
module.exports = { presets: [require('./dev/palnox.preset.js')] };
// → bg-surface-1, text-ink-1, bg-grad-brand, shadow-glow-violet, font-display…
```

**Tokens neutres** : `dev/tokens.json` (consommable par Style Dictionary, Figma Tokens, etc.).

**CSS direct** : importe `colors_and_type.css` + `components.css`.

---

## 📌 Notes
- **Branding Betnox** : le violet et le ton premium sont dérivés du concept fourni. Remplacer logo/couleurs par les assets Betnox officiels dès réception.
- Système **dark-only** par choix produit (univers nocturne, gaming).
- Companion **non officiel** — aucun asset propriétaire de Palworld n'est inclus.
