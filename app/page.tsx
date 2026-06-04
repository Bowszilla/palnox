import Link from 'next/link'
import Image from 'next/image'
import { Dna, SquaresFour, MapTrifold, Sparkle, Crown, ArrowRight, Star } from '@phosphor-icons/react/dist/ssr'

const FEATURES = [
  {
    icon: Dna,
    title: 'Breeding Calculator',
    desc: "Calcule la lignée optimale pour obtenir n'importe quel Pal.",
    color: 'var(--primary-300)',
    bg: 'rgba(46,143,232,0.14)',
    href: '/breeding',
  },
  {
    icon: Sparkle,
    title: 'Trait Optimizer',
    desc: 'Compose le build parfait avec les meilleurs passifs.',
    color: 'var(--violet-300)',
    bg: 'rgba(139,69,230,0.14)',
    href: '/traits',
  },
  {
    icon: SquaresFour,
    title: 'Collection Tracker',
    desc: 'Suis ta Paldex, tes Alphas et tes Lucky.',
    color: 'var(--cyan-300)',
    bg: 'rgba(31,195,212,0.14)',
    href: '/collection',
  },
  {
    icon: MapTrifold,
    title: 'Carte Interactive',
    desc: 'Localise spawns, boss, donjons et ressources.',
    color: 'var(--success-400)',
    bg: 'rgba(47,203,133,0.14)',
    href: '/map',
  },
]

export default function LandingPage() {
  return (
    <div
      className="min-h-screen font-body"
      style={{
        background: `
          radial-gradient(80% 50% at 50% -5%, rgba(46,143,232,0.20), transparent 60%),
          radial-gradient(60% 40% at 100% 20%, rgba(139,69,230,0.14), transparent 55%),
          var(--bg-0)
        `,
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <Image src="/logo/logo-mark.png" alt="PALNOX" width={32} height={32} />
          <span className="font-display font-bold text-[20px] text-ink-1 tracking-tight">PALNOX</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="font-display font-semibold text-[14px] text-ink-2 hover:text-ink-1 transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md font-display font-semibold text-[14px] text-white"
            style={{ background: 'var(--grad-brand)' }}
          >
            Commencer
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center px-5 pt-12 pb-16 max-w-2xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-display font-semibold mb-6 border"
          style={{
            background: 'rgba(46,143,232,0.12)',
            borderColor: 'rgba(46,143,232,0.35)',
            color: 'var(--primary-300)',
          }}
        >
          <Star size={12} weight="fill" />
          The Ultimate Palworld Companion
        </div>

        <h1
          className="font-display font-bold leading-tight mb-5"
          style={{ fontSize: 'clamp(36px, 8vw, 56px)', letterSpacing: '-0.02em' }}
        >
          <span className="text-ink-1">Maîtrise</span>
          <br />
          <span
            style={{
              background: 'var(--grad-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            chaque Pal
          </span>
        </h1>

        <p className="text-body-lg text-ink-2 mb-8 max-w-lg mx-auto leading-relaxed">
          Calculateur de lignée, optimiseur de traits, suivi de collection, carte interactive
          et assistant IA Nox — tout en un.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 h-[54px] px-8 rounded-md font-display font-bold text-base text-white animate-glow-pulse"
            style={{ background: 'var(--grad-brand)' }}
          >
            Commencer gratuitement
            <ArrowRight size={18} weight="bold" />
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 h-[54px] px-8 rounded-md font-display font-semibold text-base text-ink-1 border"
            style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Nox chat preview */}
      <div className="flex justify-center mb-12 px-5">
        <div
          className="relative w-full max-w-sm rounded-2xl p-6 border overflow-hidden"
          style={{
            background: 'linear-gradient(150deg, rgba(139,69,230,0.22), rgba(46,143,232,0.14))',
            borderColor: 'rgba(139,69,230,0.35)',
          }}
        >
          <div
            className="absolute -right-8 -top-8 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(31,195,212,0.18), transparent 70%)' }}
          />
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-none"
              style={{ background: 'var(--grad-nox)', boxShadow: 'var(--glow-cyan)' }}
            >
              <Image src="/mascot/nox-mascot.png" alt="Nox" width={36} height={36} />
            </div>
            <div>
              <div className="font-display font-bold text-[17px] text-ink-1 flex items-center gap-1.5">
                Nox <Sparkle size={14} weight="fill" color="var(--cyan-300)" />
              </div>
              <div className="text-[11.5px] flex items-center gap-1.5" style={{ color: 'var(--success-400)' }}>
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: 'var(--success-400)' }}
                />
                Assistant IA · en ligne
              </div>
            </div>
          </div>
          <div
            className="rounded-[18px] rounded-bl-[6px] px-4 py-3 text-[14px] leading-relaxed text-ink-1 border"
            style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.12)' }}
          >
            Bonne cible ! 🔥 Le chemin le plus court pour{' '}
            <strong style={{ color: 'var(--cyan-300)' }}>Astegon</strong> est{' '}
            <strong style={{ color: 'var(--cyan-300)' }}>2 générations</strong> via{' '}
            <strong style={{ color: 'var(--cyan-300)' }}>Anubis × Jetragon</strong>. Probabilité : 86 %.
          </div>
        </div>
      </div>

      {/* Features grid */}
      <section className="px-5 pb-16 max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-h2 text-ink-1 text-center mb-8 tracking-tight">
          Tout ce dont tu as besoin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
            >
              <div
                className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-none"
                style={{ background: bg, color }}
              >
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-[16px] text-ink-1 mb-1">{title}</h3>
                <p className="text-[13px] text-ink-3 leading-relaxed">{desc}</p>
              </div>
              <ArrowRight size={16} color="var(--text-4)" />
            </Link>
          ))}
        </div>
      </section>

      {/* Pro banner */}
      <section className="px-5 pb-20 max-w-2xl mx-auto">
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: 'var(--grad-premium)' }}
        >
          <Crown size={32} weight="fill" color="#1a1206" className="mx-auto mb-3" />
          <h3 className="font-display font-bold text-h2 text-[#1a1206] mb-2">PALNOX Pro</h3>
          <p className="text-[14px] mb-6" style={{ color: '#3a2a08' }}>
            Calculs illimités · IA avancée · Carte complète · Exports
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-md font-display font-bold text-[15px]"
            style={{ background: '#1a1206', color: 'var(--rarity-legendary)' }}
          >
            Essayer Pro gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t text-center py-6 text-[12px] text-ink-4 font-display"
        style={{ borderColor: 'rgba(120,150,210,0.12)' }}
      >
        PALNOX v1.0.0 · Companion non officiel · Non affilié à Pocketpair
      </footer>
    </div>
  )
}
