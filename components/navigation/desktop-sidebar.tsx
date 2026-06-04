'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  House,
  SquaresFour,
  Sparkle,
  MapTrifold,
  User,
  Dna,
  GearSix,
  Crown,
} from '@phosphor-icons/react'

const NAV_ITEMS = [
  { label: 'Accueil',     href: '/dashboard',  Icon: House },
  { label: 'Collection',  href: '/collection', Icon: SquaresFour },
  { label: 'Nox IA',     href: '/assistant',  Icon: Sparkle },
  { label: 'Carte',       href: '/map',        Icon: MapTrifold },
  { label: 'Breeding',    href: '/breeding',   Icon: Dna },
  { label: 'Traits',      href: '/traits',     Icon: Crown },
]

const BOTTOM_ITEMS = [
  { label: 'Profil',      href: '/profile',    Icon: User },
  { label: 'Paramètres',  href: '/settings',   Icon: GearSix },
]

export function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex flex-col w-[220px] min-h-screen shrink-0 border-r"
      style={{
        background: 'rgba(6,10,18,0.92)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(120,150,210,0.12)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <Image src="/logo/logo-mark.png" alt="PALNOX" width={32} height={32} />
        <span className="font-display font-bold text-[20px] text-ink-1 tracking-tight">
          PALNOX
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <motion.div key={href} whileTap={{ scale: 0.98 }}>
              <Link
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 group"
                style={{
                  background: active ? 'rgba(46,143,232,0.14)' : 'transparent',
                  color: active ? 'var(--primary-300)' : 'var(--text-3)',
                }}
              >
                <Icon
                  size={20}
                  weight={active ? 'fill' : 'regular'}
                  color={active ? 'var(--primary-400)' : 'var(--text-3)'}
                />
                <span className="font-display font-semibold text-[14px]">{label}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 space-y-0.5 border-t border-[rgba(120,150,210,0.12)] pt-3">
        {BOTTOM_ITEMS.map(({ label, href, Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150"
              style={{
                background: active ? 'rgba(46,143,232,0.14)' : 'transparent',
                color: active ? 'var(--primary-300)' : 'var(--text-3)',
              }}
            >
              <Icon size={20} weight={active ? 'fill' : 'regular'} />
              <span className="font-display font-semibold text-[14px]">{label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
