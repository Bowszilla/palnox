-- ============================================================
-- PALNOX — Seed Data
-- Run after schema.sql
-- ============================================================

-- ── Pals ────────────────────────────────────────────────────
INSERT INTO public.pals (pal_number, name, element_primary, rarity, description, image_url, base_hp, base_attack, base_defense, base_speed, base_work, work_types) VALUES
  (1,   'Lamball',     'Neutre',   'common',    'Mouton inoffensif producteur de laine.',                        'https://palworld.wiki.gg/images/Lamball_icon.png',     70,  50,  60,  70,  2, ARRAY['Jardinage','Transport']),
  (2,   'Cattiva',     'Neutre',   'common',    'Chat espiègle qui vole les provisions mais reste attachant.',   'https://palworld.wiki.gg/images/Cattiva_icon.png',     75,  65,  55,  85,  3, ARRAY['Collecte','Artisanat']),
  (3,   'Relaxaurus',  'Dragon',   'rare',      'Dragon massif à la flemme légendaire.',                         'https://palworld.wiki.gg/images/Relaxaurus_icon.png',  120, 95,  85,  50,  2, ARRAY['Transport','Jardinage']),
  (4,   'Chikipi',     'Neutre',   'common',    'Poulet des prairies, producteur d''œufs.',                      'https://palworld.wiki.gg/images/Chikipi_icon.png',     65,  40,  50,  75,  2, ARRAY['Jardinage','Collecte']),
  (5,   'Foxparks',    'Feu',      'rare',      'Renard ardent au pelage embrasé.',                              'https://palworld.wiki.gg/images/Foxparks_icon.png',    80,  90,  60,  100, 2, ARRAY['Forgeron','Éclairage']),
  (6,   'Lifmunk',     'Herbe',    'common',    'Écureuil végétal énergique.',                                   'https://palworld.wiki.gg/images/Lifmunk_icon.png',     75,  60,  65,  95,  3, ARRAY['Jardinage','Médecine']),
  (10,  'Pengullet',   'Eau',      'common',    'Manchot aquatique à la personnalité explosive.',                'https://palworld.wiki.gg/images/Pengullet_icon.png',   70,  75,  65,  80,  2, ARRAY['Arrosage','Transport']),
  (15,  'Mau',         'Ténèbres', 'rare',      'Chat de la nuit porteur de fortune ou de malchance.',           'https://palworld.wiki.gg/images/Mau_icon.png',         80,  85,  70,  90,  3, ARRAY['Jardinage','Médecine']),
  (42,  'Anubis',      'Terre',    'legendary', 'Gardien mystique des anciens temples.',                         'https://palworld.wiki.gg/images/Anubis_icon.png',      110, 130, 80,  90,  3, ARRAY['Artisanat','Mines']),
  (50,  'Grizzbolt',   'Foudre',   'epic',      'Ours électrique imposant.',                                     'https://palworld.wiki.gg/images/Grizzbolt_icon.png',   115, 115, 90,  85,  3, ARRAY['Forgeron','Transport','Électricité']),
  (58,  'Mammorest',   'Herbe',    'epic',      'Mammouth végétal colossal.',                                    'https://palworld.wiki.gg/images/Mammorest_icon.png',   140, 100, 110, 55,  4, ARRAY['Coupe de bois','Jardinage','Mines']),
  (77,  'Blazamut',    'Feu',      'epic',      'Titan de lave endormi.',                                        'https://palworld.wiki.gg/images/Blazamut_icon.png',    130, 125, 100, 60,  4, ARRAY['Forgeron','Mines','Artisanat']),
  (89,  'Frostallion', 'Glace',    'legendary', 'Souverain des plaines enneigées.',                              'https://palworld.wiki.gg/images/Frostallion_icon.png', 100, 120, 90,  120, 2, ARRAY['Transport','Refroidissement']),
  (95,  'Astegon',     'Ténèbres', 'epic',      'Dragon des ténèbres aux ailes qui déchirent les étoiles.',      'https://palworld.wiki.gg/images/Astegon_icon.png',     105, 140, 70,  110, 2, ARRAY['Mines','Artisanat']),
  (111, 'Jetragon',    'Dragon',   'legendary', 'Dragon de la foudre d''une vitesse inégalée.',                  'https://palworld.wiki.gg/images/Jetragon_icon.png',    95,  145, 65,  160, 1, ARRAY['Transport'])
ON CONFLICT (pal_number) DO UPDATE SET
  image_url = EXCLUDED.image_url;

-- ── Traits ──────────────────────────────────────────────────
INSERT INTO public.traits (name, description, category, effect, rarity, tier) VALUES
  ('Seigneur de la destruction', '+30 % dégâts d''attaque',              'Attaque',  '+30% ATK',           'epic',      'S'),
  ('Berserker',                  '+20 % attaque, −10 % défense',         'Attaque',  '+20% ATK, -10% DEF', 'rare',      'S'),
  ('Athlétique',                 '+15 % vitesse de déplacement',         'Mobilité', '+15% SPD',           'rare',      'A'),
  ('Vigoureux',                  '+20 % PV max',                         'Défense',  '+20% HP',            'common',    'B'),
  ('Artisan',                    '+50 % vitesse de travail',             'Travail',  '+50% WORK SPD',      'epic',      'S'),
  ('Chanceux',                   '+15 % à tous les stats',               'Général',  '+15% ALL',           'legendary', 'S'),
  ('Tout en muscle',             '+30 % attaque, −50 % travail',        'Attaque',  '+30% ATK, -50% WORK','rare',      'A'),
  ('Courageux',                  '+10 % dégâts en combat',              'Attaque',  '+10% DMG',           'common',    'B'),
  ('Agile',                      '+10 % vitesse de déplacement',        'Mobilité', '+10% SPD',           'common',    'B'),
  ('Bourreau de travail',        'Pas de pénalité de fatigue au travail','Travail',  'No work fatigue',    'rare',      'A')
ON CONFLICT DO NOTHING;

-- ── Map Locations ────────────────────────────────────────────
INSERT INTO public.map_locations (name, type, description, x_coordinate, y_coordinate, metadata) VALUES
  ('Tour de la Fissure', 'boss',     'Repaire d''Astegon. Niv. 50 recommandé.',         52.0, 40.0, '{"pal":"Astegon","level":50,"captureRate":14}'),
  ('Forêt de Crystalwood','spawn',   'Zone de spawn pour Frostallion.',                 24.0, 30.0, '{"pal":"Frostallion"}'),
  ('Plaine des Orages',  'alpha',    'Alpha Jetragon apparu ici régulièrement.',         72.0, 25.0, '{"pal":"Jetragon","level":45}'),
  ('Lac de Lave',        'resource', 'Ressources de pierre de feu abondantes.',          38.0, 55.0, '{"resources":["Pierre de feu","Soufre"]}'),
  ('Camp du Dresseur',   'camp',     'Point de ravitaillement sécurisé.',               77.0, 55.0, '{"level_recommended":20}')
ON CONFLICT DO NOTHING;
