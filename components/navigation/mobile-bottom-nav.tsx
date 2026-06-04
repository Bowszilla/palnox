'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  House,
  SquaresFour,
  Sparkle,
  MapTrifold,
  User,
} from '@phosphor-icons/react'

const TABS = [
  { id: 'dashboard',  label: 'Accueil', href: '/dashboard',  Icon: House },
  { id: 'collection', label: 'Pals',    href: '/collection', Icon: SquaresFour },
  { id: 'assistant',  label: 'Nox',     href: '/assistant',  Icon: Sparkle,    fab: true },
  { id: 'map',        label: 'Carte',   href: '/map',        Icon: MapTrifold },
  { id: 'profile',    label: 'Profil',  href: '/profile',    Icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 flex items-end justify-around z-50"
      style={{
        background: 'rgba(6,10,18,0.86)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(120,150,210,0.12)',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
        paddingTop: '10px',
      }}
    >
      {TABS.map(({ id, label, href, Icon, fab }) => {
        const active = pathname.startsWith(href)

        if (fab) {
          return (
            <Link key={id} href={href} className="flex flex-col items-center gap-1 px-3">
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="w-14 h-14 rounded-full flex items-center justify-center -translate-y-4"
                style={{
                  background: 'var(--grad-brand)',
                  boxShadow: 'var(--glow-blue)',
                  border: '2px solid rgba(255,255,255,0.12)',
                }}
              >
                <Icon size={26} weight="fill" color="#fff" />
              </motion.div>
              <span
                className="font-display font-semibold text-[10px]"
                style={{ color: active ? 'var(--cyan-300)' : 'var(--text-3)' }}
              >
                {label}
              </span>
            </Link>
          )
        }

        return (
          <Link
            key={id}
            href={href}
            className="flex flex-col items-center gap-1 py-1 px-3 cursor-pointer"
          >
            <motion.div whileTap={{ scale: 0.85 }}>
              <Icon
                size={23}
                weight={active ? 'fill' : 'regular'}
                color={active ? 'var(--primary-400)' : 'var(--text-3)'}
              />
            </motion.div>
            <span
              className="font-display font-semibold text-[10px]"
              style={{ color: active ? 'var(--primary-300)' : 'var(--text-3)' }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
