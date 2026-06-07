'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dna, Sparkle, SquaresFour, MapTrifold, ArrowUpRight, Flame, PawPrint, Crown } from '@phosphor-icons/react'
import { ProgressRing } from '@/components/ui/progress-ring'
import { PalMiniCard } from '@/components/cards/pal-card'
import { NOX_TIPS } from '@/data/static/breeding'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/lib/hooks/use-user'
import type { Pal, PalElement, PalRarity } from '@/types/pal'

const TOTAL_PALDEX = 180

const QUICK_ACCESS = [
  { title: 'Breeding', desc: 'Calcule la meilleure combinaison', href: '/breeding', color: 'var(--primary-300)', bg: 'rgba(46,143,232,0.14)', Icon: Dna },
  { title: 'Traits', desc: 'Optimise les passifs parfaits', href: '/traits', color: 'var(--violet-300)', bg: 'rgba(139,69,230,0.14)', Icon: Sparkle },
  { title: 'Collection', desc: 'Suis ta Paldex complète', href: '/collection', color: 'var(--cyan-300)', bg: 'rgba(31,195,212,0.14)', Icon: SquaresFour },
  { title: 'Carte', desc: 'Spawns, boss & ressources', href: '/map', color: 'var(--success-400)', bg: 'rgba(47,203,133,0.14)', Icon: MapTrifold },
]

const tip = NOX_TIPS[0]

interface RecentPal { pal: Pal; badge: string }

export default function DashboardPage() {
  const { user, displayName } = useUser()
  const [capturedCount, setCapturedCount] = useState(0)
  const [recentPals, setRecentPals] = useState<RecentPal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }

    const uid = user.id
    const supabase = createClient()

    type PalRow = { id: string; pal_number: number; name: string; element_primary: string; rarity: string; image_url: string | null }
    const RARITY_BADGE: Record<string, string> = { legendary: 'Légd.', alpha: 'Alpha', lucky: 'Lucky', boss: 'Boss', epic: 'Épique', rare: 'Rare', common: 'Comm.' }

    async function load() {
      const { count } = await supabase
        .from('user_collection')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', uid)

      setCapturedCount(count ?? 0)

      const { data: rawRecent } = await supabase
        .from('user_collection')
        .select('pal_id')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(5)

      const recentIds = (rawRecent as { pal_id: string }[] | null)?.map(r => r.pal_id) ?? []

      if (recentIds.length > 0) {
        const { data: rawPals } = await supabase
          .from('pals')
          .select('id, pal_number, name, element_primary, rarity, image_url')
          .in('id', recentIds)

        const palsData = rawPals as PalRow[] | null
        if (palsData) {
          const ordered = recentIds
            .map(id => palsData.find(p => p.id === id))
            .filter((p): p is PalRow => !!p)

          setRecentPals(ordered.map(p => ({
            pal: { id: p.id, palNumber: p.pal_number, name: p.name, elementPrimary: p.element_primary as PalElement, rarity: p.rarity as PalRarity, imageUrl: p.image_url ?? undefined },
            badge: RARITY_BADGE[p.rarity] ?? p.rarity,
          })))
        }
      }

      setLoading(false)
    }

    load()
  }, [user])

  const percent = Math.round((capturedCount / TOTAL_PALDEX) * 100)
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="px-5 pt-4 pb-28 max-w-xl mx-auto lg:max-w-2xl">
      {/* Welcome header */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-display font-semibold text-[13px] text-ink-3">Bon retour, dresseur</div>
          <div className="font-display font-bold text-[24px] tracking-tight text-ink-1">
            Salut, {displayName} 👋
          </div>
        </div>
        <div
          className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center relative border"
          style={{ background: 'var(--grad-violet)', boxShadow: 'var(--glow-violet)', borderColor: 'rgba(255,255,255,0.14)' }}
        >
          <b className="font-display font-bold text-white text-[18px]">{initial}</b>
          <span className="absolute -top-[3px] -right-[3px] w-3.5 h-3.5 rounded-full border-2" style={{ background: 'var(--success-500)', borderColor: 'var(--bg-0)' }} />
        </div>
      </div>

      {/* Progress card */}
      <div
        className="rounded-xl p-5 relative overflow-hidden border mb-3"
        style={{ background: 'linear-gradient(150deg, #15223c 0%, #101829 100%)', borderColor: 'rgba(120,150,210,0.22)' }}
      >
        <div className="absolute -right-10 -top-10 w-44 h-44 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(46,143,232,0.25), transparent 70%)' }} />
        <div className="flex items-center gap-[18px] relative">
          <ProgressRing percent={percent} size={104} label={`${percent}%`} sublabel="PALDEX" />
          <div className="flex-1">
            {[
              { icon: <PawPrint size={15} weight="fill" color="var(--cyan-300)" />, label: 'Capturés', value: String(capturedCount), suffix: `/${TOTAL_PALDEX}` },
              { icon: <Crown size={15} weight="fill" color="var(--rarity-legendary)" />, label: 'Alpha', value: '—', suffix: '' },
              { icon: <Dna size={15} weight="fill" color="var(--violet-300)" />, label: 'Lignées', value: '—', suffix: '' },
            ].map(({ icon, label, value, suffix }) => (
              <div
                key={label}
                className="flex items-center justify-between py-[7px] border-b last:border-b-0"
                style={{ borderColor: 'rgba(120,150,210,0.12)' }}
              >
                <span className="flex items-center gap-[7px] text-[13px] text-ink-2">{icon}{label}</span>
                <span className="font-stat font-bold text-[16px] text-ink-1">
                  {loading ? <span className="inline-block w-6 h-3 rounded animate-pulse" style={{ background: 'var(--surface-3)' }} /> : value}
                  <span className="text-ink-4 font-normal text-[13px]">{suffix}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Streak */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 rounded-lg border mb-5"
        style={{ background: 'rgba(245,165,36,0.14)', borderColor: 'rgba(245,165,36,0.35)' }}
      >
        <Flame size={24} weight="fill" color="var(--warning-400)" />
        <div className="flex-1">
          <b className="font-display text-[14px] text-ink-1">Série de captures</b>
          <p className="text-[11.5px] text-ink-3 mt-0.5">Continue, prochain palier à 10 jours</p>
        </div>
        <span className="font-stat font-bold text-[24px]" style={{ color: 'var(--warning-400)' }}>—</span>
      </div>

      {/* Quick access */}
      <h3 className="font-display font-bold text-[17px] text-ink-1 mb-3">Accès rapide</h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {QUICK_ACCESS.map(({ title, desc, href, color, bg, Icon }) => (
          <Link
            key={href}
            href={href}
            className="relative p-4 rounded-lg border transition-all duration-200 hover:-translate-y-1"
            style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
          >
            <div className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center mb-3" style={{ background: bg, color }}>
              <Icon size={22} weight="duotone" />
            </div>
            <h4 className="font-display font-semibold text-[15px] text-ink-1 m-0 mb-0.5">{title}</h4>
            <p className="text-[11.5px] text-ink-3 m-0 leading-[1.4]">{desc}</p>
            <ArrowUpRight size={16} color="var(--text-4)" className="absolute right-3.5 top-4" />
          </Link>
        ))}
      </div>

      {/* Recently captured */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-[17px] text-ink-1">Récemment capturés</h3>
        <Link href="/collection" className="text-[12px] font-display font-semibold flex items-center gap-1" style={{ color: 'var(--cyan-300)' }}>
          Tout voir <ArrowUpRight size={12} />
        </Link>
      </div>

      {recentPals.length > 0 ? (
        <div
          className="flex gap-3 overflow-x-auto pb-1.5 mb-5"
          style={{ scrollbarWidth: 'none', marginLeft: '-20px', marginRight: '-20px', paddingLeft: '20px', paddingRight: '20px' }}
        >
          {recentPals.map(({ pal, badge }) => (
            <PalMiniCard key={pal.id} pal={pal} badge={badge} />
          ))}
        </div>
      ) : (
        <div
          className="flex items-center justify-center rounded-lg border mb-5 text-ink-4 font-display text-[13px]"
          style={{ height: 80, background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)', borderStyle: 'dashed' }}
        >
          {loading ? 'Chargement…' : 'Capture ton premier Pal dans la Collection'}
        </div>
      )}

      {/* Nox tip */}
      <h3 className="font-display font-bold text-[17px] text-ink-1 mb-3">Conseil de Nox</h3>
      <div
        className="flex gap-3 items-center p-4 rounded-lg border"
        style={{ background: 'linear-gradient(135deg, rgba(139,69,230,0.16), rgba(46,143,232,0.10))', borderColor: 'var(--violet-700)' }}
      >
        <img src="/mascot/nox-mascot.png" alt="Nox" className="w-12 flex-none" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }} />
        <div>
          <b className="font-display font-semibold text-[13px] block mb-0.5" style={{ color: 'var(--violet-200)' }}>{tip.title}</b>
          <p className="text-[12px] text-ink-2 m-0 leading-[1.45]" dangerouslySetInnerHTML={{ __html: tip.text }} />
        </div>
      </div>
    </div>
  )
}
