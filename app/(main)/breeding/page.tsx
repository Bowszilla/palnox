'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Plus, ArrowsClockwise, ClockCounterClockwise, BookmarkSimple, GitBranch } from '@phosphor-icons/react'
import { PageHeader, IconButton } from '@/components/layout/page-header'
import { GradientButton } from '@/components/ui/gradient-button'
import { BreedingResultCard, BreedingPathRow } from '@/components/cards/breeding-result-card'
import { STATIC_PALS } from '@/data/static/pals'
import { MOCK_BREEDING_PATHS } from '@/data/static/breeding'

const palA = STATIC_PALS[0] // Anubis
const palB = STATIC_PALS[1] // Jetragon
const child = STATIC_PALS[3] // Astegon

export default function BreedingPage() {
  const [hasResult] = useState(true)

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Breeding"
        subtitle="Calculateur de lignée optimale"
        actions={
          <>
            <IconButton><ClockCounterClockwise size={19} /></IconButton>
            <IconButton><BookmarkSimple size={19} /></IconButton>
          </>
        }
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        {/* Parent selector */}
        <div className="flex items-stretch gap-2.5 mt-1.5">
          {/* Parent A */}
          <div
            className="flex-1 rounded-lg border p-3.5 text-center cursor-pointer"
            style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            <div className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase text-ink-3 mb-2">
              Parent A
            </div>
            <div className="h-[72px] flex items-center justify-center">
              <Image src="/mascot/nox-mascot.png" alt={palA.name} width={64} height={64}
                style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }} />
            </div>
            <div className="font-display font-semibold text-[14px] text-ink-1 mt-1.5">{palA.name}</div>
            <div className="text-[11px] text-ink-3">{palA.elementPrimary} · #{String(palA.palNumber).padStart(3,'0')}</div>
          </div>

          {/* VS orb */}
          <div className="flex-none self-center">
            <div
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-display font-bold text-[13px] text-white"
              style={{ background: 'var(--grad-brand)', boxShadow: 'var(--glow-blue)' }}
            >
              VS
            </div>
          </div>

          {/* Parent B */}
          <div
            className="flex-1 rounded-lg border p-3.5 text-center cursor-pointer"
            style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            <div className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase text-ink-3 mb-2">
              Parent B
            </div>
            <div className="h-[72px] flex items-center justify-center">
              <Image src="/mascot/nox-mascot.png" alt={palB.name} width={64} height={64}
                style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4)) hue-rotate(140deg)' }} />
            </div>
            <div className="font-display font-semibold text-[14px] text-ink-1 mt-1.5">{palB.name}</div>
            <div className="text-[11px] text-ink-3">{palB.elementPrimary} · #{String(palB.palNumber).padStart(3,'0')}</div>
          </div>
        </div>

        {/* Empty parent slot hint */}
        {!hasResult && (
          <div
            className="flex-1 rounded-lg border-dashed border p-3.5 text-center cursor-pointer mt-3"
            style={{ background: 'var(--surface-1)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ background: 'var(--surface-3)', color: 'var(--cyan-300)' }}
            >
              <Plus size={22} />
            </div>
            <div className="text-[11px] font-display font-semibold uppercase tracking-widest text-ink-3">
              Choisir un Pal
            </div>
          </div>
        )}

        {/* Result */}
        {hasResult && (
          <>
            <div className="flex items-center justify-between mt-5 mb-3">
              <h3 className="font-display font-bold text-[17px] text-ink-1">Descendant prédit</h3>
              <button className="flex items-center gap-1.5 text-[12px] font-display font-semibold" style={{ color: 'var(--cyan-300)' }}>
                <ArrowsClockwise size={14} /> Inverser
              </button>
            </div>
            <BreedingResultCard
              child={child}
              probability={86}
              generations={2}
              paths={MOCK_BREEDING_PATHS}
            />

            <div className="flex items-center justify-between mt-5 mb-3">
              <h3 className="font-display font-bold text-[17px] text-ink-1">Meilleurs chemins</h3>
              <span className="text-[12px] font-display font-semibold" style={{ color: 'var(--cyan-300)' }}>
                {MOCK_BREEDING_PATHS.length} trouvés
              </span>
            </div>
            <div>
              {MOCK_BREEDING_PATHS.map(path => (
                <BreedingPathRow key={path.rank} path={path} />
              ))}
            </div>

            <div className="mt-5">
              <GradientButton fullWidth size="lg" icon={<GitBranch size={18} weight="bold" />}>
                Lancer le plan d&apos;élevage
              </GradientButton>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
