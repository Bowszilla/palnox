'use client'
import { useState, useEffect, useCallback } from 'react'
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react'
import { PageHeader, IconButton } from '@/components/layout/page-header'
import { FilterChip } from '@/components/ui/filter-chip'
import { StatCard } from '@/components/ui/stat-card'
import { PalCard } from '@/components/cards/pal-card'
import { SearchInput } from '@/components/ui/search-input'
import { createClient } from '@/lib/supabase/client'
import type { Pal, PalElement, PalRarity } from '@/types/pal'

const FILTERS = ['Tous', 'Capturés', 'Manquants', 'Alpha', 'Feu', 'Eau', 'Glace', 'Terre']
const TOTAL_PALDEX = 180

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-md border animate-pulse"
          style={{ height: 118, background: 'var(--surface-1)', borderColor: 'rgba(120,150,210,0.08)' }}
        />
      ))}
    </div>
  )
}

export default function CollectionPage() {
  const [pals, setPals] = useState<Pal[]>([])
  const [capturedIds, setCapturedIds] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUserId(user.id)

      type PalRow = { id: string; pal_number: number; name: string; element_primary: string; element_secondary: string | null; rarity: string }

      const { data: rawPals } = await supabase
        .from('pals')
        .select('id, pal_number, name, element_primary, element_secondary, rarity')
        .order('pal_number')

      const palsData = rawPals as PalRow[] | null

      if (palsData) {
        setPals(palsData.map(p => ({
          id: p.id,
          palNumber: p.pal_number,
          name: p.name,
          elementPrimary: p.element_primary as PalElement,
          elementSecondary: p.element_secondary as PalElement ?? undefined,
          rarity: p.rarity as PalRarity,
        })))
      }

      if (user) {
        const { data: rawCollection } = await supabase
          .from('user_collection')
          .select('pal_id')
          .eq('user_id', user.id)
        const collectionData = rawCollection as { pal_id: string }[] | null
        if (collectionData) {
          setCapturedIds(new Set(collectionData.map(r => r.pal_id)))
        }
      }

      setLoading(false)
    }

    load()
  }, [])

  const toggleCapture = useCallback(async (palId: string) => {
    if (!userId) return

    const wasCaptured = capturedIds.has(palId)

    // Optimistic update
    setCapturedIds(prev => {
      const next = new Set(prev)
      wasCaptured ? next.delete(palId) : next.add(palId)
      return next
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const col = (createClient() as any).from('user_collection')

    if (wasCaptured) {
      const { error } = await col.delete().eq('user_id', userId).eq('pal_id', palId)
      if (error) setCapturedIds(prev => { const s = new Set(prev); s.add(palId); return s })
    } else {
      const { error } = await col.insert({ user_id: userId, pal_id: palId })
      if (error) setCapturedIds(prev => { const s = new Set(prev); s.delete(palId); return s })
    }
  }, [userId, capturedIds])

  const capturedCount = capturedIds.size
  const alphaCount = pals.filter(p => p.rarity === 'alpha' && capturedIds.has(p.id)).length
  const percent = pals.length > 0 ? Math.round((capturedCount / TOTAL_PALDEX) * 100) : 0

  const filtered = pals.filter(pal => {
    if (search && !pal.name.toLowerCase().includes(search.toLowerCase())) return false
    if (activeFilter === 'Capturés') return capturedIds.has(pal.id)
    if (activeFilter === 'Manquants') return !capturedIds.has(pal.id)
    if (activeFilter === 'Alpha') return pal.rarity === 'alpha'
    if (['Feu', 'Eau', 'Glace', 'Terre'].includes(activeFilter)) return pal.elementPrimary === activeFilter
    return true
  })

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Collection"
        subtitle={`Paldex · ${capturedCount} / ${TOTAL_PALDEX}`}
        actions={
          <>
            <IconButton><MagnifyingGlass size={19} /></IconButton>
            <IconButton><Funnel size={19} /></IconButton>
          </>
        }
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        <SearchInput
          placeholder="Rechercher un Pal…"
          value={search}
          onChange={setSearch}
          className="mb-3"
        />

        <div className="flex gap-2.5 mb-3.5">
          <StatCard value={capturedCount} label="Capturés" valueColor="var(--cyan-300)" />
          <StatCard value={alphaCount} label="Alpha" valueColor="var(--rarity-legendary)" />
          <StatCard value={TOTAL_PALDEX - capturedCount} label="Manquants" valueColor="var(--text-4)" />
          <StatCard value={`${percent}%`} label="Complet" valueColor="var(--success-400)" />
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-3.5"
          style={{ scrollbarWidth: 'none', marginLeft: '-20px', marginRight: '-20px', paddingLeft: '20px', paddingRight: '20px' }}
        >
          {FILTERS.map(f => (
            <FilterChip key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(f)} />
          ))}
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-ink-3 font-display">
            Aucun Pal trouvé
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {filtered.map(pal => (
              <PalCard
                key={pal.id}
                pal={pal}
                isCaptured={capturedIds.has(pal.id)}
                onClick={() => toggleCapture(pal.id)}
              />
            ))}
          </div>
        )}

        {!userId && !loading && (
          <p className="text-center text-[12px] text-ink-4 mt-4">
            Connecte-toi pour sauvegarder ta collection
          </p>
        )}
      </div>
    </div>
  )
}
