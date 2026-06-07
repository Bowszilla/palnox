'use client'
import { useState, useMemo } from 'react'
import { X, MagnifyingGlass } from '@phosphor-icons/react'
import { getRarityColor } from '@/lib/utils'
import type { BreedingPal } from '@/lib/breeding/algorithm'

const FALLBACK = '/mascot/nox-mascot.png'

interface PalSelectorProps {
  pals: BreedingPal[]
  selected: BreedingPal | null
  label: string
  onSelect: (pal: BreedingPal) => void
}

function PalImage({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src ?? FALLBACK)
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imgSrc} alt={alt} width={52} height={52} onError={() => setImgSrc(FALLBACK)} className="object-contain drop-shadow-md" />
}

export function PalSelector({ pals, selected, label, onSelect }: PalSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() =>
    pals.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())),
    [pals, search]
  )

  const rarityColor = selected ? getRarityColor(selected.rarity as Parameters<typeof getRarityColor>[0]) : 'var(--surface-3)'

  return (
    <>
      {/* Trigger card */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 rounded-lg border p-3.5 text-center cursor-pointer transition-all duration-200 hover:border-primary-500"
        style={{ background: 'var(--grad-surface)', borderColor: selected ? rarityColor + '80' : 'rgba(120,150,210,0.22)' }}
      >
        <div className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase text-ink-3 mb-2">{label}</div>
        <div className="h-[60px] flex items-center justify-center">
          {selected ? (
            <PalImage src={selected.imageUrl} alt={selected.name} />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center text-ink-4" style={{ borderColor: 'rgba(120,150,210,0.3)' }}>
              <span className="text-[22px]">+</span>
            </div>
          )}
        </div>
        {selected ? (
          <>
            <div className="font-display font-semibold text-[13px] text-ink-1 mt-1.5 truncate">{selected.name}</div>
            <div className="text-[10px] text-ink-3">{selected.elementPrimary} · #{String(selected.palNumber).padStart(3,'0')}</div>
          </>
        ) : (
          <div className="font-display font-semibold text-[12px] text-ink-3 mt-2">Choisir un Pal</div>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(6,10,18,0.92)', backdropFilter: 'blur(8px)' }}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h2 className="font-display font-bold text-[18px] text-ink-1">Choisir — {label}</h2>
            <button onClick={() => { setOpen(false); setSearch('') }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
              <X size={18} color="var(--text-2)" />
            </button>
          </div>

          <div className="px-5 mb-3">
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-4" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher…"
                className="w-full h-11 pl-9 pr-4 rounded-md font-body text-[14px] text-ink-1 outline-none"
                style={{ background: 'var(--surface-2)', border: '1px solid rgba(120,150,210,0.22)' }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-8" style={{ scrollbarWidth: 'none' }}>
            <div className="grid grid-cols-3 gap-2">
              {filtered.map(pal => {
                const isSelected = selected?.palNumber === pal.palNumber
                const rc = getRarityColor(pal.rarity as Parameters<typeof getRarityColor>[0])
                return (
                  <button
                    key={pal.id}
                    onClick={() => { onSelect(pal); setOpen(false); setSearch('') }}
                    className="rounded-md border p-2 text-center transition-all duration-150 active:scale-95"
                    style={{
                      background: isSelected ? `${rc}22` : 'var(--grad-surface)',
                      borderColor: isSelected ? rc : 'rgba(120,150,210,0.12)',
                    }}
                  >
                    <div className="h-[52px] flex items-center justify-center relative"
                      style={{ background: `radial-gradient(circle at 50% 40%, ${rc}22, transparent 70%)` }}>
                      <PalImage src={pal.imageUrl} alt={pal.name} />
                    </div>
                    <div className="font-display font-semibold text-[10px] text-ink-1 truncate mt-1">{pal.name}</div>
                    <div className="text-[9px] text-ink-3">{pal.elementPrimary}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
