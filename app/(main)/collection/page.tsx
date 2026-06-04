'use client'
import { useState } from 'react'
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react'
import { PageHeader, IconButton } from '@/components/layout/page-header'
import { FilterChip } from '@/components/ui/filter-chip'
import { StatCard } from '@/components/ui/stat-card'
import { PalCard } from '@/components/cards/pal-card'
import { SearchInput } from '@/components/ui/search-input'
import { STATIC_PALS } from '@/data/static/pals'

const FILTERS = ['Tous', 'Capturés', 'Manquants', 'Alpha', 'Feu', 'Eau', 'Glace']

const CAPTURED_IDS = new Set(['anubis', 'jetragon', 'frostallion', 'astegon', 'relaxaurus', 'lamball', 'blazamut', 'mau', 'foxparks'])
const TOTAL = 180
const CAPTURED_COUNT = CAPTURED_IDS.size
const ALPHA_COUNT = 9

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  const filtered = STATIC_PALS.filter(pal => {
    if (search && !pal.name.toLowerCase().includes(search.toLowerCase())) return false
    if (activeFilter === 'Capturés') return CAPTURED_IDS.has(pal.id)
    if (activeFilter === 'Manquants') return !CAPTURED_IDS.has(pal.id)
    if (activeFilter === 'Alpha') return CAPTURED_IDS.has(pal.id) && pal.rarity === 'alpha'
    if (['Feu', 'Eau', 'Glace'].includes(activeFilter)) return pal.elementPrimary === activeFilter
    return true
  })

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Collection"
        subtitle={`Paldex · ${CAPTURED_COUNT} / ${TOTAL}`}
        actions={
          <>
            <IconButton><MagnifyingGlass size={19} /></IconButton>
            <IconButton><Funnel size={19} /></IconButton>
          </>
        }
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        {/* Search */}
        <SearchInput
          placeholder="Rechercher un Pal…"
          value={search}
          onChange={setSearch}
          className="mb-3"
        />

        {/* Stats */}
        <div className="flex gap-2.5 mb-3.5">
          <StatCard value={CAPTURED_COUNT} label="Capturés" valueColor="var(--cyan-300)" />
          <StatCard value={ALPHA_COUNT} label="Alpha" valueColor="var(--rarity-legendary)" />
          <StatCard value={TOTAL - CAPTURED_COUNT} label="Manquants" valueColor="var(--text-4)" />
          <StatCard value="62%" label="Complet" valueColor="var(--success-400)" />
        </div>

        {/* Filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-3.5"
          style={{ scrollbarWidth: 'none', marginLeft: '-20px', marginRight: '-20px', paddingLeft: '20px', paddingRight: '20px' }}
        >
          {FILTERS.map(f => (
            <FilterChip
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {filtered.map(pal => (
            <PalCard
              key={pal.id}
              pal={pal}
              isCaptured={CAPTURED_IDS.has(pal.id)}
            />
          ))}
          {/* Locked placeholders */}
          {Array.from({ length: 3 }).map((_, i) => (
            <PalCard
              key={`locked-${i}`}
              pal={{ id: `locked-${i}`, palNumber: 120 + i, name: '???', elementPrimary: 'Neutre', rarity: 'common' }}
              isCaptured={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
