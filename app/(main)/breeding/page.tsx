'use client'
import { useState, useEffect, useMemo } from 'react'
import { ArrowsClockwise, GitBranch, MagnifyingGlass } from '@phosphor-icons/react'
import { PageHeader, IconButton } from '@/components/layout/page-header'
import { GradientButton } from '@/components/ui/gradient-button'
import { TraitBadge } from '@/components/ui/trait-badge'
import { PalSelector } from '@/components/breeding/pal-selector'
import { createClient } from '@/lib/supabase/client'
import { calculateChild, findParentsForTarget, type BreedingPal, type BreedingCombo } from '@/lib/breeding/algorithm'
import { getRarityColor } from '@/lib/utils'
import { BREEDING_DATA } from '@/data/static/breeding-data'

const FALLBACK = '/mascot/nox-mascot.png'

type Mode = 'find-child' | 'find-parents'

function PalImage({ src, alt, size = 68 }: { src?: string; alt: string; size?: number }) {
  const [imgSrc, setImgSrc] = useState(src ?? FALLBACK)
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imgSrc} alt={alt} width={size} height={size} onError={() => setImgSrc(FALLBACK)} className="object-contain" style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.45))' }} />
}

function ChildResultCard({ child }: { child: BreedingPal }) {
  const rc = getRarityColor(child.rarity as Parameters<typeof getRarityColor>[0])
  const breedData = BREEDING_DATA[child.palNumber]
  return (
    <div className="rounded-xl p-[18px] relative overflow-hidden border"
      style={{ background: 'linear-gradient(150deg, rgba(46,143,232,0.16), rgba(139,69,230,0.12))', borderColor: 'rgba(46,143,232,0.45)' }}>
      <div className="absolute -right-8 -top-8 w-36 h-36 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,182,56,0.18), transparent 70%)' }} />
      <div className="flex items-center gap-3.5 relative">
        <div className="w-[84px] h-[84px] rounded-[18px] flex items-center justify-center flex-none border"
          style={{ background: `radial-gradient(circle at 50% 35%, ${rc}44, transparent 70%)`, borderColor: 'rgba(120,150,210,0.12)' }}>
          <PalImage src={child.imageUrl} alt={child.name} />
        </div>
        <div>
          <h2 className="font-display font-bold text-[22px] text-ink-1 m-0">{child.name}</h2>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            <TraitBadge label={child.rarity} variant={child.rarity as Parameters<typeof TraitBadge>[0]['variant']} dot />
            <span className="inline-flex items-center h-[22px] px-[11px] rounded-pill font-display font-semibold text-[11px]"
              style={{ background: 'rgba(139,69,230,0.16)', color: 'var(--violet-300)' }}>
              {child.elementPrimary}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mt-3.5 relative">
        {[
          { k: 'Index Paldex',   v: `#${String(child.palNumber).padStart(3,'0')}` },
          { k: 'Breeding Rank',  v: breedData?.rank ?? '—',  color: 'var(--cyan-300)' },
          { k: 'Peut être enfant', v: breedData?.childEligible ? 'Oui' : 'Non', color: breedData?.childEligible ? 'var(--success-400)' : 'var(--error-400)' },
          { k: 'Rareté',        v: child.rarity, color: rc },
        ].map(({ k, v, color }) => (
          <div key={k} className="rounded-md px-3.5 py-3 border"
            style={{ background: 'rgba(8,12,20,0.5)', borderColor: 'rgba(120,150,210,0.12)' }}>
            <div className="font-display font-semibold text-[11px] tracking-[0.06em] uppercase text-ink-3">{k}</div>
            <div className="font-stat font-bold text-[18px] mt-1 capitalize" style={color ? { color } : undefined}>{String(v)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComboRow({ combo, index, allPals }: { combo: BreedingCombo; index: number; allPals: BreedingPal[] }) {
  const child = calculateChild(combo.parentA, combo.parentB, allPals)
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-md border mb-2"
      style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}>
      <div className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center font-display font-bold text-[12px] flex-none"
        style={{ background: index === 0 ? 'var(--grad-premium)' : 'var(--surface-3)', color: index === 0 ? '#1a1206' : 'var(--text-2)' }}>
        {index + 1}
      </div>
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <div className="w-8 h-8 flex-none flex items-center justify-center">
          <PalImage src={combo.parentA.imageUrl} alt={combo.parentA.name} size={32} />
        </div>
        <span className="font-display font-semibold text-[12px] text-ink-1 truncate">{combo.parentA.name}</span>
        <span className="text-ink-4 text-[11px] flex-none">×</span>
        <div className="w-8 h-8 flex-none flex items-center justify-center">
          <PalImage src={combo.parentB.imageUrl} alt={combo.parentB.name} size={32} />
        </div>
        <span className="font-display font-semibold text-[12px] text-ink-1 truncate">{combo.parentB.name}</span>
      </div>
      {child && (
        <div className="text-right flex-none">
          <div className="text-[10px] text-ink-3 font-display">→ {child.name}</div>
        </div>
      )}
    </div>
  )
}

export default function BreedingPage() {
  const [allPals, setAllPals] = useState<BreedingPal[]>([])
  const [loading, setLoading] = useState(true)
  const [parentA, setParentA] = useState<BreedingPal | null>(null)
  const [parentB, setParentB] = useState<BreedingPal | null>(null)
  const [target, setTarget] = useState<BreedingPal | null>(null)
  const [mode, setMode] = useState<Mode>('find-child')

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const { data } = await supabase
        .from('pals')
        .select('id, pal_number, name, element_primary, rarity, image_url')
        .order('pal_number')

      if (data) {
        setAllPals((data as Array<{ id: string; pal_number: number; name: string; element_primary: string; rarity: string; image_url: string | null }>).map(p => ({
          id: p.id,
          palNumber: p.pal_number,
          name: p.name,
          elementPrimary: p.element_primary,
          rarity: p.rarity,
          imageUrl: p.image_url ?? undefined,
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  const child = useMemo(() => {
    if (mode !== 'find-child' || !parentA || !parentB || allPals.length === 0) return null
    return calculateChild(parentA, parentB, allPals)
  }, [parentA, parentB, allPals, mode])

  const combos = useMemo(() => {
    if (mode !== 'find-parents' || !target || allPals.length === 0) return []
    return findParentsForTarget(target, allPals, 20)
  }, [target, allPals, mode])

  const swapParents = () => {
    setParentA(parentB)
    setParentB(parentA)
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Breeding"
        subtitle="Calculateur de lignée"
        actions={<IconButton onClick={swapParents}><ArrowsClockwise size={19} /></IconButton>}
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        {/* Mode tabs */}
        <div className="flex gap-1.5 mb-4 mt-1.5 p-1 rounded-lg" style={{ background: 'var(--surface-1)' }}>
          {([['find-child', 'Parent → Enfant'], ['find-parents', 'Trouver les parents']] as [Mode, string][]).map(([m, label]) => (
            <button key={m} onClick={() => setMode(m)}
              className="flex-1 h-9 rounded-md font-display font-semibold text-[13px] transition-all duration-200"
              style={{
                background: mode === m ? 'var(--grad-brand)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--text-3)',
              }}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-ink-3 font-display text-[14px]">Chargement des Pals…</div>
        ) : mode === 'find-child' ? (
          <>
            {/* Parent selector row */}
            <div className="flex items-stretch gap-2.5">
              <PalSelector pals={allPals} selected={parentA} label="Parent A" onSelect={setParentA} />
              <div className="flex-none self-center">
                <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-display font-bold text-[13px] text-white"
                  style={{ background: 'var(--grad-brand)', boxShadow: 'var(--glow-blue)' }}>
                  ×
                </div>
              </div>
              <PalSelector pals={allPals} selected={parentB} label="Parent B" onSelect={setParentB} />
            </div>

            {/* Result */}
            {child && (
              <div className="mt-5">
                <h3 className="font-display font-bold text-[17px] text-ink-1 mb-3">Descendant prédit</h3>
                <ChildResultCard child={child} />

                <div className="mt-4">
                  <GradientButton fullWidth size="lg" icon={<GitBranch size={18} weight="bold" />}>
                    Lancer le plan d&apos;élevage
                  </GradientButton>
                </div>
              </div>
            )}

            {!parentA && !parentB && (
              <p className="text-center text-[13px] text-ink-3 font-display mt-6">
                Sélectionne deux parents pour calculer leur descendant
              </p>
            )}
          </>
        ) : (
          <>
            {/* Target selector */}
            <div className="mb-4">
              <div className="font-display font-semibold text-[12px] tracking-[0.08em] uppercase text-ink-3 mb-2">
                Pal cible
              </div>
              <PalSelector pals={allPals.filter(p => BREEDING_DATA[p.palNumber]?.childEligible !== false)} selected={target} label="Quel Pal veux-tu obtenir ?" onSelect={setTarget} />
            </div>

            {target && combos.length === 0 && (
              <div className="text-center py-8 text-ink-3 font-display text-[13px]">
                Aucune combinaison trouvée pour {target.name}
              </div>
            )}

            {combos.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-[17px] text-ink-1">Combinaisons</h3>
                  <span className="text-[12px] font-display font-semibold" style={{ color: 'var(--cyan-300)' }}>
                    {combos.length} trouvées
                  </span>
                </div>
                {combos.map((combo, i) => (
                  <ComboRow key={i} combo={combo} index={i} allPals={allPals} />
                ))}
              </>
            )}

            {!target && (
              <p className="text-center text-[13px] text-ink-3 font-display mt-4">
                Choisis le Pal que tu veux obtenir par élevage
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
