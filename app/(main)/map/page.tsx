'use client'
import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { MagnifyingGlass, Crown, PawPrint, Sword, Cube, Tent, X, Sun, Moon } from '@phosphor-icons/react'
import { TraitBadge } from '@/components/ui/trait-badge'
import { createClient } from '@/lib/supabase/client'
import type { MapLocation, MarkerType } from '@/components/map/palworld-map'

const PalworldMap = dynamic(
  () => import('@/components/map/palworld-map').then(m => m.PalworldMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center" style={{ background: '#071520' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="font-display text-[13px] text-ink-3">Chargement de la carte…</p>
        </div>
      </div>
    ),
  }
)

const FILTER_CHIPS = [
  { id: 'all',      label: 'Tous',       Icon: PawPrint },
  { id: 'boss',     label: 'Boss',       Icon: Crown    },
  { id: 'alpha',    label: 'Alpha',      Icon: Sword    },
  { id: 'spawn',    label: 'Spawns',     Icon: PawPrint },
  { id: 'resource', label: 'Ressources', Icon: Cube     },
  { id: 'camp',     label: 'Camps',      Icon: Tent     },
]

interface SpawnPal { palNumber: number; name: string; imageUrl?: string }

const FALLBACK = '/mascot/nox-mascot.png'

function SpawnPalRow({ pal, selected, onSelect }: { pal: SpawnPal; selected: boolean; onSelect: () => void }) {
  const [src, setSrc] = useState(pal.imageUrl ?? FALLBACK)
  return (
    <button
      onClick={onSelect}
      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md transition-all"
      style={{ background: selected ? 'rgba(46,143,232,0.16)' : 'transparent', border: selected ? '1px solid rgba(46,143,232,0.4)' : '1px solid transparent' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={pal.name} width={32} height={32} onError={() => setSrc(FALLBACK)} className="object-contain" />
      <span className="font-display font-semibold text-[13px] text-ink-1">{pal.name}</span>
      <span className="text-[11px] text-ink-4 ml-auto">#{String(pal.palNumber).padStart(3,'0')}</span>
    </button>
  )
}

export default function MapPage() {
  const [locations, setLocations] = useState<MapLocation[]>([])
  const [pals, setPals] = useState<SpawnPal[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedMarker, setSelectedMarker] = useState<MapLocation | null>(null)
  const [spawnPalNumber, setSpawnPalNumber] = useState<number | null>(null)
  const [spawnMode, setSpawnMode] = useState<'day' | 'night'>('day')
  const [showPalSearch, setShowPalSearch] = useState(false)
  const [palSearch, setPalSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const [{ data: locs }, { data: palData }] = await Promise.all([
        supabase.from('map_locations').select('id, name, type, description, x_coordinate, y_coordinate, metadata'),
        supabase.from('pals').select('pal_number, name, image_url').order('pal_number'),
      ])

      if (locs) {
        setLocations(locs.map((l: { id: string; name: string; type: string; description: string | null; x_coordinate: number; y_coordinate: number; metadata: Record<string, unknown> | null }) => ({
          id: l.id,
          name: l.name,
          type: l.type as MarkerType,
          x: l.x_coordinate,
          y: l.y_coordinate,
          description: l.description ?? undefined,
          palName: (l.metadata as Record<string, string> | null)?.pal,
        })))
      }

      if (palData) {
        setPals((palData as Array<{ pal_number: number; name: string; image_url: string | null }>).map(p => ({
          palNumber: p.pal_number,
          name: p.name,
          imageUrl: p.image_url ?? undefined,
        })))
      }
    }
    load()
  }, [])

  const filteredLocations = activeFilter === 'all'
    ? locations
    : locations.filter(l => l.type === activeFilter)

  const filteredPals = pals.filter(p =>
    !palSearch || p.name.toLowerCase().includes(palSearch.toLowerCase())
  )

  const handleMarkerClick = useCallback((loc: MapLocation) => {
    setSelectedMarker(loc)
    setShowPalSearch(false)
  }, [])

  const selectedPal = pals.find(p => p.palNumber === spawnPalNumber)

  return (
    <div className="relative flex flex-col" style={{ height: 'calc(100dvh - 64px)', overflow: 'hidden' }}>

      {/* Leaflet map */}
      <div className="absolute inset-0 z-[1]">
        <PalworldMap
          locations={filteredLocations}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* Top overlay — search + filters */}
      <div className="absolute top-0 left-0 right-0 z-[10] px-4 pt-4 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Search bar */}
          <div
            className="flex items-center gap-2.5 h-12 px-3.5 rounded-full border mb-2.5"
            style={{ background: 'rgba(10,15,27,0.88)', backdropFilter: 'blur(14px)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            <MagnifyingGlass size={16} color="var(--text-3)" />
            <button
              className="flex-1 text-left font-body text-[14px] text-ink-4"
              onClick={() => setShowPalSearch(v => !v)}
            >
              {selectedPal ? `Spawns : ${selectedPal.name}` : 'Voir les spawns d\'un Pal…'}
            </button>
            {selectedPal && (
              <button onClick={() => { setSpawnPalNumber(null); setShowPalSearch(false) }}>
                <X size={16} color="var(--text-3)" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {FILTER_CHIPS.map(({ id, label, Icon }) => {
              const on = activeFilter === id
              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className="flex-none flex items-center gap-1.5 h-[32px] px-[12px] rounded-full font-display font-semibold text-[12px] border cursor-pointer transition-all"
                  style={on
                    ? { background: 'var(--grad-brand)', color: '#fff', borderColor: 'transparent', backdropFilter: 'blur(12px)' }
                    : { background: 'rgba(10,15,27,0.82)', backdropFilter: 'blur(12px)', color: 'var(--text-2)', borderColor: 'rgba(120,150,210,0.12)' }
                  }
                >
                  <Icon size={13} weight={on ? 'fill' : 'regular'} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pal spawn search panel */}
      {showPalSearch && (
        <div
          className="absolute left-4 right-4 top-28 z-[20] rounded-xl border overflow-hidden"
          style={{ background: 'rgba(10,15,27,0.96)', backdropFilter: 'blur(20px)', borderColor: 'rgba(120,150,210,0.22)', maxHeight: '45vh' }}
        >
          <div className="px-3 pt-3 pb-2 border-b" style={{ borderColor: 'rgba(120,150,210,0.12)' }}>
            <input
              autoFocus
              type="text"
              value={palSearch}
              onChange={e => setPalSearch(e.target.value)}
              placeholder="Rechercher un Pal…"
              className="w-full bg-transparent outline-none font-body text-[13px] text-ink-1 placeholder:text-ink-4"
            />
          </div>
          <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(45vh - 48px)', scrollbarWidth: 'none' }}>
            {filteredPals.map(pal => (
              <SpawnPalRow
                key={pal.palNumber}
                pal={pal}
                selected={spawnPalNumber === pal.palNumber}
                onSelect={() => {
                  setSpawnPalNumber(pal.palNumber)
                  setShowPalSearch(false)
                  setPalSearch('')
                  setSelectedMarker(null)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Day / Night toggle */}
      {spawnPalNumber && (
        <div className="absolute right-3.5 top-32 z-[10] flex flex-col gap-1.5">
          {(['day', 'night'] as const).map(m => (
            <button
              key={m}
              onClick={() => setSpawnMode(m)}
              className="w-10 h-10 rounded-[12px] flex items-center justify-center border transition-all"
              style={spawnMode === m
                ? { background: 'var(--grad-brand)', borderColor: 'transparent' }
                : { background: 'rgba(10,15,27,0.86)', backdropFilter: 'blur(12px)', borderColor: 'rgba(120,150,210,0.22)' }
              }
            >
              {m === 'day' ? <Sun size={18} weight={spawnMode === m ? 'fill' : 'regular'} color={spawnMode === m ? '#fff' : 'var(--text-2)'} />
                           : <Moon size={18} weight={spawnMode === m ? 'fill' : 'regular'} color={spawnMode === m ? '#fff' : 'var(--text-2)'} />}
            </button>
          ))}
        </div>
      )}

      {/* Marker detail bottom sheet */}
      {selectedMarker && (
        <div
          className="absolute left-3 right-3 bottom-4 z-[10] rounded-xl p-4 border"
          style={{ background: 'rgba(12,18,32,0.94)', backdropFilter: 'blur(18px)', borderColor: 'rgba(120,150,210,0.22)', boxShadow: '0 -4px 30px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display font-bold text-[17px] text-ink-1 m-0">{selectedMarker.name}</h3>
              {selectedMarker.description && (
                <p className="text-[12px] text-ink-3 mt-0.5 leading-relaxed">{selectedMarker.description}</p>
              )}
            </div>
            <button onClick={() => setSelectedMarker(null)} className="w-8 h-8 rounded-full flex items-center justify-center flex-none" style={{ background: 'var(--surface-2)' }}>
              <X size={15} color="var(--text-3)" />
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <TraitBadge label={selectedMarker.type} variant="common" dot />
            {selectedMarker.palName && (
              <span className="text-[12px] font-display font-semibold" style={{ color: 'var(--cyan-300)' }}>
                {selectedMarker.palName}
              </span>
            )}
            <span className="text-[11px] text-ink-4 ml-auto font-display">
              {selectedMarker.x.toFixed(0)}, {selectedMarker.y.toFixed(0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
