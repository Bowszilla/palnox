-- ============================================================
-- PALNOX — Supabase Schema
-- Run in Supabase SQL Editor or via supabase db push
-- ============================================================

-- ── profiles ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    text,
  avatar_url  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── pals ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.pals (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pal_number        integer UNIQUE NOT NULL,
  name              text NOT NULL,
  element_primary   text NOT NULL,
  element_secondary text,
  rarity            text NOT NULL DEFAULT 'common',
  image_url         text,
  description       text,
  base_hp           integer,
  base_attack       integer,
  base_defense      integer,
  base_speed        integer,
  base_work         integer,
  work_types        text[],
  created_at        timestamptz DEFAULT now()
);

-- ── traits ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.traits (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  category    text,
  effect      text,
  rarity      text DEFAULT 'common',
  tier        text DEFAULT 'C',
  created_at  timestamptz DEFAULT now()
);

-- ── breeding_combinations ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.breeding_combinations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_a_id  uuid REFERENCES public.pals(id),
  parent_b_id  uuid REFERENCES public.pals(id),
  child_id     uuid REFERENCES public.pals(id),
  probability  numeric,
  generations  integer,
  created_at   timestamptz DEFAULT now()
);

-- ── user_collection ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_collection (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  pal_id      uuid REFERENCES public.pals(id) ON DELETE CASCADE,
  is_captured boolean DEFAULT false,
  is_alpha    boolean DEFAULT false,
  is_lucky    boolean DEFAULT false,
  notes       text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  UNIQUE(user_id, pal_id)
);

-- ── user_favorites ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  pal_id     uuid REFERENCES public.pals(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, pal_id)
);

-- ── map_locations ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.map_locations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  type         text NOT NULL,
  description  text,
  x_coordinate numeric,
  y_coordinate numeric,
  image_url    text,
  metadata     jsonb,
  created_at   timestamptz DEFAULT now()
);

-- ── assistant_conversations ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.assistant_conversations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  title      text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── assistant_messages ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.assistant_messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.assistant_conversations(id) ON DELETE CASCADE,
  role            text NOT NULL CHECK (role IN ('user', 'assistant')),
  content         text NOT NULL,
  created_at      timestamptz DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pals                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traits                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breeding_combinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collection       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_locations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_messages    ENABLE ROW LEVEL SECURITY;

-- profiles: own profile only
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- pals, traits, breeding, map: public read
CREATE POLICY "Public pals read"
  ON public.pals FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public traits read"
  ON public.traits FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public breeding read"
  ON public.breeding_combinations FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public map read"
  ON public.map_locations FOR SELECT TO authenticated, anon USING (true);

-- user_collection: own rows only
CREATE POLICY "Users manage own collection"
  ON public.user_collection FOR ALL USING (auth.uid() = user_id);

-- user_favorites: own rows only
CREATE POLICY "Users manage own favorites"
  ON public.user_favorites FOR ALL USING (auth.uid() = user_id);

-- assistant: own conversations/messages only
CREATE POLICY "Users manage own conversations"
  ON public.assistant_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own messages"
  ON public.assistant_messages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assistant_conversations c
      WHERE c.id = conversation_id AND c.user_id = auth.uid()
    )
  );
