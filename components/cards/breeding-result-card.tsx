import Image from 'next/image'
import { Crown } from '@phosphor-icons/react'
import { TraitBadge } from '@/components/ui/trait-badge'
import { getRarityColor } from '@/lib/utils'
import type { BreedingPath } from '@/types/breeding'
import type { Pal } from '@/types/pal'

interface BreedingResultCardProps {
  child: Pal
  probability: number
  generations: number
  paths: BreedingPath[]
}

export function BreedingResultCard({ child, probability, generations, paths }: BreedingResultCardProps) {
  const rarityColor = getRarityColor(child.rarity)
  return (
    <div
      className="rounded-xl p-[18px] relative overflow-hidden border"
      style={{
        background: 'linear-gradient(150deg, rgba(46,143,232,0.16), rgba(139,69,230,0.12))',
        borderColor: 'rgba(46,143,232,0.45)',
      }}
    >
      {/* Glow bleed */}
      <div
        className="absolute -right-8 -top-8 w-36 h-36 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,182,56,0.22), transparent 70%)' }}
      />

      {/* Top row */}
      <div className="flex items-center gap-3.5 relative">
        <div
          className="w-[84px] h-[84px] rounded-[18px] flex items-center justify-center flex-none border"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${rarityColor}4D, transparent 70%)`,
            borderColor: 'rgba(120,150,210,0.12)',
          }}
        >
          <Image
            src="/mascot/nox-mascot.png"
            alt={child.name}
            width={68}
            height={68}
            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }}
          />
        </div>
        <div>
          <h2 className="font-display font-bold text-[22px] text-ink-1 m-0">{child.name}</h2>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <TraitBadge label={child.rarity === 'legendary' ? 'Legendary' : child.rarity} variant={child.rarity} dot />
            <span
              className="inline-flex items-center gap-1.5 h-[22px] px-[11px] rounded-pill font-display font-semibold text-[11px]"
              style={{
                background: 'rgba(139,69,230,0.16)',
                color: 'var(--violet-300)',
              }}
            >
              {child.elementPrimary}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5 mt-3.5 relative">
        {[
          { k: 'Index Paldex',  v: `#${String(child.palNumber).padStart(3,'0')}`, color: undefined },
          { k: 'Power base',    v: child.baseStats?.attack ?? '—',                  color: 'var(--cyan-300)' },
          { k: 'Probabilité',   v: `${probability}%`,                              color: 'var(--success-400)' },
          { k: 'Générations',   v: `${generations} min.`,                          color: undefined },
        ].map(({ k, v, color }) => (
          <div
            key={k}
            className="rounded-md px-3.5 py-3 border"
            style={{ background: 'rgba(8,12,20,0.5)', borderColor: 'rgba(120,150,210,0.12)' }}
          >
            <div className="font-display font-semibold text-[11px] tracking-[0.06em] uppercase text-ink-3">{k}</div>
            <div
              className="font-stat font-bold text-[20px] mt-1"
              style={color ? { color } : undefined}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BreedingPathRow({ path }: { path: BreedingPath }) {
  return (
    <div
      className="flex items-center gap-2.5 px-3.5 py-3 rounded-md border mb-2 last:mb-0"
      style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
    >
      <div
        className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center font-display font-bold text-[13px] flex-none"
        style={
          path.isBest
            ? { background: 'var(--grad-premium)', color: '#1a1206' }
            : { background: 'var(--surface-3)', color: 'var(--text-2)' }
        }
      >
        {path.isBest ? <Crown size={14} weight="fill" /> : path.rank}
      </div>
      <div className="flex-1 text-[13px]">
        <b className="font-display font-semibold text-ink-1">{path.combo}</b>
        <br />
        <span className="text-ink-3">{path.steps}</span>
      </div>
      <div className="text-right">
        <div className="font-stat font-bold text-[15px]" style={{ color: 'var(--cyan-300)' }}>
          {path.generations} gén.
        </div>
        <div className="text-[10px] text-ink-3 font-display">{path.label}</div>
      </div>
    </div>
  )
}
