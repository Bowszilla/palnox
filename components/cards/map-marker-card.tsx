import Image from 'next/image'
import { MapPin, NavigationArrow } from '@phosphor-icons/react'
import { TraitBadge } from '@/components/ui/trait-badge'
import type { PalRarity } from '@/types/pal'

export interface MapLocation {
  id: string
  name: string
  type: 'boss' | 'alpha' | 'spawn' | 'resource' | 'dungeon' | 'camp'
  location: string
  palId?: string
  recommendedLevel?: number
  captureRate?: number
  activeSpots?: number
  rarity?: PalRarity
}

export function MapMarkerCard({ loc }: { loc: MapLocation }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        background: 'rgba(15,22,38,0.92)',
        backdropFilter: 'blur(18px)',
        borderColor: 'rgba(120,150,210,0.22)',
        boxShadow: 'var(--shadow-4)',
      }}
    >
      <div className="w-10 h-2 rounded-full mb-3.5 mx-auto" style={{ background: 'var(--surface-4)' }} />
      <div className="flex items-center gap-3.5">
        <div
          className="w-[60px] h-[60px] rounded-[15px] flex items-center justify-center flex-none border"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(245,182,56,0.3), transparent 70%)',
            borderColor: 'rgba(120,150,210,0.12)',
          }}
        >
          <Image
            src="/mascot/nox-mascot.png"
            alt={loc.name}
            width={48}
            height={48}
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-[18px] text-ink-1 m-0">{loc.name}</h3>
            {loc.rarity && <TraitBadge label={loc.type === 'boss' ? 'Boss' : 'Alpha'} variant={loc.rarity} dot />}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-ink-3 mt-1">
            <MapPin size={14} weight="fill" />
            {loc.location}
          </div>
        </div>
        <button
          className="w-[42px] h-[42px] rounded-[13px] flex items-center justify-center"
          style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.12)', border: '1px solid' }}
        >
          <NavigationArrow size={18} color="var(--text-2)" />
        </button>
      </div>

      {(loc.recommendedLevel || loc.captureRate !== undefined || loc.activeSpots !== undefined) && (
        <div
          className="flex gap-[18px] mt-3.5 pt-3.5 border-t"
          style={{ borderColor: 'rgba(120,150,210,0.12)' }}
        >
          {loc.recommendedLevel && (
            <div>
              <div className="font-stat font-bold text-[16px]" style={{ color: 'var(--rarity-legendary)' }}>
                Niv. {loc.recommendedLevel}
              </div>
              <div className="font-display font-semibold text-[10.5px] tracking-[0.04em] uppercase text-ink-3">
                Recommandé
              </div>
            </div>
          )}
          {loc.captureRate !== undefined && (
            <div>
              <div className="font-stat font-bold text-[16px] text-ink-1">{loc.captureRate}%</div>
              <div className="font-display font-semibold text-[10.5px] tracking-[0.04em] uppercase text-ink-3">
                Capture
              </div>
            </div>
          )}
          {loc.activeSpots !== undefined && (
            <div>
              <div className="font-stat font-bold text-[16px]" style={{ color: 'var(--cyan-300)' }}>
                {loc.activeSpots}
              </div>
              <div className="font-display font-semibold text-[10.5px] tracking-[0.04em] uppercase text-ink-3">
                Spots actifs
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
