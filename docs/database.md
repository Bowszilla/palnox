# Base de données PALNOX

## Supabase (PostgreSQL)

### Tables

#### `profiles`
Profil utilisateur lié à `auth.users`. Créé automatiquement via trigger.

| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid (PK) | = auth.users.id |
| username | text | Nom de dresseur |
| avatar_url | text | URL avatar |
| created_at | timestamptz | — |
| updated_at | timestamptz | — |

#### `pals`
Catalogue des Pals (données publiques).

| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid (PK) | — |
| pal_number | integer (UNIQUE) | Numéro Paldex |
| name | text | Nom |
| element_primary | text | Élément principal |
| element_secondary | text | Élément secondaire (opt.) |
| rarity | text | common/rare/epic/legendary/alpha/lucky/boss |
| image_url | text | URL image |
| base_hp/attack/defense/speed/work | integer | Stats de base |
| work_types | text[] | Types de travail |

#### `traits`
Catalogue des passifs (données publiques).

| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid (PK) | — |
| name | text | Nom du trait |
| description | text | Description |
| category | text | Attaque/Défense/Mobilité/Travail |
| effect | text | Effet court (+30% ATK) |
| rarity | text | Rareté |
| tier | text | S/A/B/C |

#### `breeding_combinations`
Combinaisons d'élevage connues.

| Colonne | Type | Description |
|---------|------|-------------|
| parent_a_id | uuid (FK → pals) | Parent A |
| parent_b_id | uuid (FK → pals) | Parent B |
| child_id | uuid (FK → pals) | Résultat |
| probability | numeric | Probabilité 0-100 |
| generations | integer | Nombre de générations min. |

#### `user_collection`
Collection personnelle de chaque utilisateur.
Contrainte UNIQUE sur `(user_id, pal_id)`.

#### `map_locations`
Points d'intérêt sur la carte (données publiques).

#### `assistant_conversations` + `assistant_messages`
Historique des conversations avec Nox.

### Row Level Security

| Table | Politique |
|-------|-----------|
| profiles | Lecture et écriture : own row uniquement |
| pals / traits / breeding / map | Lecture publique (authenticated + anon) |
| user_collection / user_favorites | CRUD : own rows uniquement |
| assistant_* | CRUD : own conversations/messages uniquement |

### Déploiement

```bash
# Via Supabase CLI
supabase db push

# Via SQL Editor (manual)
# Copier-coller supabase/schema.sql puis supabase/seed.sql
```
