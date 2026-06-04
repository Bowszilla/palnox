'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Question, PencilSimple, Sword, Lightning, Wind, Heart, Check } from '@phosphor-icons/react'
import { PageHeader, IconButton } from '@/components/layout/page-header'
import { ProgressRing } from '@/components/ui/progress-ring'
import { PremiumButton } from '@/components/ui/premium-button'
import { STATIC_PALS } from '@/data/static/pals'
import { STATIC_TRAITS } from '@/data/static/traits'

const ICON_MAP: Record<string, React.ElementType> = {
  Sword, Lightning, Wind, Heart,
}

const STAT_BARS = [
  { label: 'Attaque',  value: 920,  max: 1000, color: 'var(--grad-cyan)',                  textColor: 'var(--cyan-300)'    },
  { label: 'Défense',  value: 540,  max: 1000, color: 'var(--grad-violet)',                textColor: 'var(--text-1)'     },
  { label: 'Vitesse',  value: 680,  max: 1000, color: 'var(--grad-success)',               textColor: 'var(--success-400)' },
  { label: 'Travail',  value: 700,  max: 1000, color: 'linear-gradient(90deg,#F5B638,#F5A524)', textColor: 'var(--warning-400)' },
]

const TIER_STYLE: Record<string, { bg: string; color: string }> = {
  S: { bg: 'var(--grad-premium)', color: '#1a1206' },
  A: { bg: 'rgba(139,69,230,0.18)', color: 'var(--violet-300)' },
  B: { bg: 'rgba(46,143,232,0.16)', color: 'var(--primary-300)' },
  C: { bg: 'rgba(120,150,210,0.14)', color: 'var(--text-2)' },
}

export default function TraitsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['destroyer', 'berserker', 'athletic']))
  const target = STATIC_PALS[3] // Astegon
  const traits = STATIC_TRAITS.slice(0, 4)

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Trait Optimizer"
        subtitle="Combinaison de passifs parfaite"
        actions={<IconButton><Question size={19} /></IconButton>}
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        {/* Target card */}
        <div
          className="flex items-center gap-3.5 p-4 rounded-lg border mb-3.5"
          style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
        >
          <div
            className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center flex-none"
            style={{ background: 'var(--grad-nox)' }}
          >
            <Image src="/mascot/nox-mascot.png" alt={target.name} width={48} height={48}
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }} />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-[18px] text-ink-1 m-0">{target.name}</h3>
            <p className="text-[12px] text-ink-3 mt-1 m-0">Cible · build Attaque/Travail</p>
          </div>
          <IconButton><PencilSimple size={18} /></IconButton>
        </div>

        {/* Score ring */}
        <div
          className="flex items-center gap-[18px] p-[18px] rounded-xl border relative overflow-hidden mb-4"
          style={{
            background: 'linear-gradient(150deg, #13233e, #101829)',
            borderColor: 'rgba(120,150,210,0.22)',
          }}
        >
          <div
            className="absolute -right-8 -bottom-10 w-36 h-36 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(47,203,133,0.22), transparent 70%)' }}
          />
          <ProgressRing percent={94} size={96} strokeWidth={8} label="S+" sublabel="BUILD" gradientId="scoreGrad" />
          <div className="relative">
            <b className="font-display font-bold text-[16px] text-ink-1 block">Build optimal trouvé</b>
            <p className="text-[12px] text-ink-2 mt-1.5 leading-[1.45] m-0">
              4 passifs « S-tier ». +38 % de puissance d&apos;attaque vs. build de base.
            </p>
          </div>
        </div>

        {/* Trait slots */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-[17px] text-ink-1">Passifs recommandés</h3>
          <span className="text-[12px] font-display font-semibold" style={{ color: 'var(--cyan-300)' }}>
            {selected.size}/4
          </span>
        </div>

        {traits.map(trait => {
          const isSelected = selected.has(trait.id)
          const tier = TIER_STYLE[trait.tier]
          const IconComp = ICON_MAP[trait.icon ?? '']

          return (
            <div
              key={trait.id}
              onClick={() => toggle(trait.id)}
              className="flex items-center gap-3 p-3.5 rounded-md border mb-2.5 cursor-pointer transition-all duration-200"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(47,203,133,0.12), transparent)'
                  : 'var(--grad-surface)',
                borderColor: isSelected ? 'var(--success-500)' : 'rgba(120,150,210,0.12)',
              }}
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] flex-none"
                style={{ background: 'rgba(242,85,90,0.14)', color: 'var(--error-400)' }}
              >
                {IconComp ? <IconComp size={20} weight="fill" /> : '✦'}
              </div>
              <div className="flex-1">
                <b className="font-display font-semibold text-[14px] text-ink-1 block">{trait.name}</b>
                <span className="text-[11.5px] text-ink-3">{trait.description}</span>
              </div>
              <div
                className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center font-display font-bold text-[13px] flex-none"
                style={{ background: tier.bg, color: tier.color }}
              >
                {trait.tier}
              </div>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-none border-2"
                style={
                  isSelected
                    ? { background: 'var(--success-500)', borderColor: 'var(--success-500)', color: '#06210f' }
                    : { borderColor: 'rgba(120,150,210,0.22)' }
                }
              >
                {isSelected && <Check size={13} weight="bold" />}
              </div>
            </div>
          )
        })}

        {/* Stat bars */}
        <div className="flex items-center justify-between mt-5 mb-3">
          <h3 className="font-display font-bold text-[17px] text-ink-1">Stats projetées</h3>
        </div>
        <div
          className="rounded-lg p-5 border"
          style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
        >
          {STAT_BARS.map(({ label, value, max, color, textColor }) => (
            <div key={label} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
              <span className="w-[74px] text-[12px] text-ink-2 font-display font-semibold">{label}</span>
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--surface-3)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${(value / max) * 100}%`, background: color }}
                />
              </div>
              <span className="w-8 text-right font-stat font-bold text-[13px]" style={{ color: textColor }}>
                {value >= 1000 ? `${value / 100}×` : value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <PremiumButton fullWidth size="lg">Exporter le build (Pro)</PremiumButton>
        </div>
      </div>
    </div>
  )
}
