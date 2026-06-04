import Link from 'next/link'
import { ShareNetwork, GearSix, Trophy, Dna, Flame, Medal, Target, LockSimple, PawPrint, ChartLineUp, Crown } from '@phosphor-icons/react/dist/ssr'
import { PageHeader, IconButton } from '@/components/layout/page-header'
import { TraitBadge } from '@/components/ui/trait-badge'
import { StatCard } from '@/components/ui/stat-card'

const ACHIEVEMENTS = [
  { icon: Trophy,  label: '1er Alpha', color: 'var(--rarity-legendary)', locked: false },
  { icon: Dna,     label: 'Éleveur',   color: 'var(--violet-300)',       locked: false },
  { icon: Flame,   label: 'Série 7j',  color: 'var(--warning-400)',      locked: false },
  { icon: Medal,   label: 'Top 5%',    color: 'var(--cyan-300)',         locked: false },
  { icon: Target,  label: '100 capt.', color: 'var(--success-400)',      locked: false },
  { icon: LockSimple, label: 'Paldex',  color: 'var(--text-4)',          locked: true  },
  { icon: LockSimple, label: 'Boss×10', color: 'var(--text-4)',          locked: true  },
  { icon: LockSimple, label: 'Légende', color: 'var(--text-4)',          locked: true  },
]

const ACTIVITY = [
  {
    icon: PawPrint,   label: 'Dernière capture', sub: 'Anubis (Legendary) · il y a 2 h',
    color: 'var(--primary-300)', bg: 'rgba(46,143,232,0.14)', value: undefined,
  },
  {
    icon: Dna,        label: 'Lignées actives', sub: '4 en cours · 1 prête à éclore',
    color: 'var(--violet-300)', bg: 'rgba(139,69,230,0.14)', value: '4',
  },
  {
    icon: ChartLineUp, label: 'Classement hebdo', sub: 'Région Nord-Ouest',
    color: 'var(--success-400)', bg: 'rgba(47,203,133,0.14)', value: '#142',
  },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Profil"
        actions={
          <>
            <IconButton><ShareNetwork size={19} /></IconButton>
            <IconButton href="/settings"><GearSix size={19} /></IconButton>
          </>
        }
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        {/* Hero */}
        <div
          className="p-[18px] rounded-xl relative overflow-hidden border text-center mb-3.5"
          style={{
            background: 'linear-gradient(150deg, rgba(139,69,230,0.22), rgba(46,143,232,0.14))',
            borderColor: 'rgba(120,150,210,0.22)',
          }}
        >
          <div
            className="absolute -right-8 -top-10 w-40 h-40 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,182,56,0.18), transparent 70%)' }}
          />
          {/* Avatar */}
          <div
            className="w-[84px] h-[84px] rounded-[26px] flex items-center justify-center mx-auto mb-3 relative border-2"
            style={{
              background: 'var(--grad-violet)',
              boxShadow: 'var(--glow-violet)',
              borderColor: 'rgba(255,255,255,0.16)',
            }}
          >
            <b className="font-display font-bold text-[34px] text-white">D</b>
            <span
              className="absolute -bottom-1.5 -right-1.5 h-[26px] px-2.5 rounded-full flex items-center font-display font-bold text-[12px] border-2"
              style={{ background: 'var(--grad-premium)', color: '#1a1206', borderColor: 'var(--bg-0)' }}
            >
              Niv. 1
            </span>
          </div>

          <h2 className="font-display font-bold text-[22px] text-ink-1 m-0">Dresseur</h2>
          <div className="text-[13px] text-ink-2 mt-0.5">@dresseur · membre depuis 2025</div>
          <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-full font-display font-bold text-[12px]"
            style={{ background: 'var(--grad-premium)', color: '#1a1206' }}>
            <Crown size={12} weight="fill" /> PALNOX PRO
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2.5 mb-5">
          <StatCard value={9} label="Capturés" valueColor="var(--cyan-300)" />
          <StatCard value={1} label="Alpha" valueColor="var(--rarity-legendary)" />
          <StatCard value={2} label="Lignées" valueColor="var(--violet-300)" />
          <StatCard value={0} label="Série" valueColor="var(--warning-400)" />
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-[17px] text-ink-1">Succès</h3>
          <span className="text-[12px] font-display font-semibold" style={{ color: 'var(--cyan-300)' }}>
            5 / 40
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          {ACHIEVEMENTS.map(({ icon: Icon, label, color, locked }) => (
            <div
              key={label}
              className="aspect-square rounded-md flex flex-col items-center justify-center gap-1 border"
              style={{
                background: 'var(--grad-surface)',
                borderColor: 'rgba(120,150,210,0.12)',
                opacity: locked ? 0.45 : 1,
              }}
            >
              <Icon size={26} weight="fill" color={color} />
              <span className="font-display font-semibold text-[9px] text-ink-3">{label}</span>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-[17px] text-ink-1">Activité</h3>
        </div>
        {ACTIVITY.map(({ icon: Icon, label, sub, color, bg, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-4 py-3.5 rounded-md border mb-2.5"
            style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
          >
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-none" style={{ background: bg, color }}>
              <Icon size={20} weight="fill" />
            </div>
            <div className="flex-1">
              <b className="font-display font-semibold text-[14px] text-ink-1 block">{label}</b>
              <span className="text-[11.5px] text-ink-3">{sub}</span>
            </div>
            {value && (
              <span className="font-stat font-bold text-[15px]" style={{ color: 'var(--cyan-300)' }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
