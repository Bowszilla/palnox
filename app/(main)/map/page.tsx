'use client'
import { useState } from 'react'
import Image from 'next/image'
import { MagnifyingGlass, Crown, PawPrint, Sword, Cube, Tent, Drop, Plus, Minus, NavigationArrow } from '@phosphor-icons/react'
import { TraitBadge } from '@/components/ui/trait-badge'

const MAP_CHIPS = [
  { id: 'boss',       label: 'Boss',       Icon: Crown,    color: '#fff' },
  { id: 'spawns',     label: 'Spawns',     Icon: PawPrint, color: 'var(--text-2)' },
  { id: 'alpha',      label: 'Alpha',      Icon: Sword,    color: 'var(--text-2)' },
  { id: 'resources',  label: 'Ressources', Icon: Cube,     color: 'var(--text-2)' },
  { id: 'camps',      label: 'Camps',      Icon: Tent,     color: 'var(--text-2)' },
]

const MOCK_PINS = [
  { id: 'p1', type: 'boss',   x: '52%', y: '40%', pulse: true },
  { id: 'p2', type: 'alpha',  x: '24%', y: '30%', pulse: false },
  { id: 'p3', type: 'spawn',  x: '72%', y: '25%', pulse: false },
  { id: 'p4', type: 'water',  x: '38%', y: '55%', pulse: false },
  { id: 'p5', type: 'spawn',  x: '77%', y: '55%', pulse: false },
]

const PIN_STYLE: Record<string, { bg: string; Icon: React.ElementType; iconColor: string }> = {
  boss:  { bg: 'var(--grad-premium)', Icon: Crown,        iconColor: '#1a1206' },
  alpha: { bg: 'linear-gradient(135deg,#FB6E72,#D63A40)', Icon: Sword, iconColor: '#fff' },
  spawn: { bg: 'var(--grad-violet)',  Icon: PawPrint,     iconColor: '#fff' },
  water: { bg: 'var(--grad-cyan)',    Icon: Drop,         iconColor: '#fff' },
}

export default function MapPage() {
  const [activeChip, setActiveChip] = useState('boss')
  const [showSheet, setShowSheet] = useState(true)

  return (
    <div className="relative flex flex-col" style={{ height: 'calc(100dvh - 80px)', overflow: 'hidden' }}>
      {/* Map background */}
      <div className="absolute inset-0 z-[1]">
        <div
          style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(70% 60% at 30% 25%, rgba(47,203,133,0.18), transparent 55%),
              radial-gradient(60% 50% at 78% 70%, rgba(46,143,232,0.20), transparent 55%),
              radial-gradient(50% 40% at 60% 12%, rgba(245,165,36,0.14), transparent 55%),
              #0b1322
            `,
          }}
        />
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(120,150,210,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,210,0.06) 1px, transparent 1px)`,
            backgroundSize: '46px 46px',
          }}
        />
        {/* Terrain blobs */}
        <div style={{ position:'absolute', width:'160px', height:'140px', left:'-30px', top:'120px', borderRadius:'50%', filter:'blur(1px)', background:'radial-gradient(circle,rgba(47,203,133,0.3),transparent 70%)' }} />
        <div style={{ position:'absolute', width:'180px', height:'160px', right:'-40px', top:'360px', borderRadius:'50%', filter:'blur(1px)', background:'radial-gradient(circle,rgba(46,143,232,0.3),transparent 70%)' }} />

        {/* Pins */}
        {MOCK_PINS.map(pin => {
          const style = PIN_STYLE[pin.type] ?? PIN_STYLE.spawn
          const { Icon } = style
          return (
            <div key={pin.id} style={{ position:'absolute', left: pin.x, top: pin.y, transform:'translate(-50%,-100%)', zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer' }}>
              {pin.pulse && (
                <div style={{ position:'absolute', width:'38px', height:'38px', borderRadius:'50%', transform:'translate(-50%,-50%)', left:'50%', top:'50%' }}>
                  <div className="animate-map-pulse" style={{ position:'absolute', inset:0, borderRadius:'50%', border:`2px solid var(--rarity-legendary)` }} />
                </div>
              )}
              <div
                style={{
                  width:'38px', height:'38px', borderRadius:'50% 50% 50% 0', transform:'rotate(45deg)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: style.bg, boxShadow:'0 6px 14px rgba(0,0,0,0.5)', border:'2px solid rgba(255,255,255,0.18)',
                }}
              >
                <div style={{ transform:'rotate(-45deg)', color: style.iconColor }}>
                  <Icon size={18} weight="fill" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Top overlay */}
      <div className="absolute top-0 left-0 right-0 z-[6] px-4 pt-14">
        <div
          className="flex items-center gap-2.5 h-12 px-3.5 rounded-full border mb-3"
          style={{ background: 'rgba(10,15,27,0.82)', backdropFilter: 'blur(12px)', borderColor: 'rgba(120,150,210,0.22)' }}
        >
          <MagnifyingGlass size={16} color="var(--text-3)" />
          <input
            placeholder="Rechercher un lieu ou un Pal…"
            className="flex-1 bg-transparent border-none outline-none font-body text-[14px] text-ink-1 placeholder:text-ink-4"
          />
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {MAP_CHIPS.map(({ id, label, Icon }) => {
            const on = activeChip === id
            return (
              <button
                key={id}
                onClick={() => setActiveChip(id)}
                className="flex-none flex items-center gap-1.5 h-[34px] px-[13px] rounded-full font-display font-semibold text-[12.5px] border cursor-pointer transition-all"
                style={
                  on
                    ? { background: 'var(--grad-brand)', color: '#fff', borderColor: 'transparent', backdropFilter: 'blur(12px)' }
                    : { background: 'rgba(10,15,27,0.82)', backdropFilter: 'blur(12px)', color: 'var(--text-2)', borderColor: 'rgba(120,150,210,0.12)' }
                }
              >
                <Icon size={14} weight={on ? 'fill' : 'regular'} />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3.5 bottom-52 z-[6] flex flex-col gap-2">
        {[Plus, Minus].map((Icon, i) => (
          <button
            key={i}
            className="w-11 h-11 rounded-[13px] flex items-center justify-center border"
            style={{ background: 'rgba(10,15,27,0.86)', backdropFilter: 'blur(12px)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            <Icon size={20} color="var(--text-1)" weight="bold" />
          </button>
        ))}
        <button
          className="w-11 h-11 rounded-[13px] flex items-center justify-center border"
          style={{ background: 'rgba(10,15,27,0.86)', backdropFilter: 'blur(12px)', borderColor: 'rgba(120,150,210,0.22)' }}
        >
          <NavigationArrow size={20} color="var(--cyan-300)" weight="fill" />
        </button>
      </div>

      {/* Bottom sheet */}
      {showSheet && (
        <div
          className="absolute left-2.5 right-2.5 bottom-20 z-[7] rounded-xl p-4 border"
          style={{
            background: 'rgba(15,22,38,0.92)',
            backdropFilter: 'blur(18px)',
            borderColor: 'rgba(120,150,210,0.22)',
            boxShadow: 'var(--shadow-4)',
          }}
        >
          <div
            className="w-[38px] h-1 rounded-full mb-3.5 mx-auto"
            style={{ background: 'var(--surface-4)' }}
          />
          <div className="flex items-center gap-3.5">
            <div
              className="w-[60px] h-[60px] rounded-[15px] flex items-center justify-center flex-none border"
              style={{
                background: 'radial-gradient(circle at 50% 35%, rgba(245,182,56,0.3), transparent 70%)',
                borderColor: 'rgba(120,150,210,0.12)',
              }}
            >
              <Image src="/mascot/nox-mascot.png" alt="Astegon" width={48} height={48}
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-[18px] text-ink-1 m-0">Astegon</h3>
                <TraitBadge label="Boss" variant="legendary" dot />
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-ink-3">
                <NavigationArrow size={12} weight="fill" />
                Tour de la Fissure · Secteur 4
              </div>
            </div>
            <button
              className="w-[42px] h-[42px] rounded-[13px] flex items-center justify-center border"
              style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.12)' }}
            >
              <NavigationArrow size={18} color="var(--text-2)" />
            </button>
          </div>
          <div
            className="flex gap-[18px] mt-3.5 pt-3.5 border-t"
            style={{ borderColor: 'rgba(120,150,210,0.12)' }}
          >
            {[
              { v: 'Niv. 50', l: 'Recommandé', color: 'var(--rarity-legendary)' },
              { v: '14%',     l: 'Capture',    color: 'var(--text-1)' },
              { v: '3',       l: 'Spots actifs', color: 'var(--cyan-300)' },
            ].map(({ v, l, color }) => (
              <div key={l}>
                <div className="font-stat font-bold text-[16px]" style={{ color }}>{v}</div>
                <div className="font-display font-semibold text-[10.5px] tracking-[0.04em] uppercase text-ink-3">{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
