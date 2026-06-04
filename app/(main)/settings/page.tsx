'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Translate, GlobeHemisphereWest, SlidersHorizontal, Egg, Flame, Crown, Sparkle, Microphone, CloudArrowUp, ShieldCheck, SignOut } from '@phosphor-icons/react'
import { PageHeader, IconButton } from '@/components/layout/page-header'

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative cursor-pointer"
      style={{
        width: '46px', height: '28px', borderRadius: '999px',
        background: on ? 'var(--grad-brand)' : 'var(--surface-3)',
        border: `1px solid ${on ? 'transparent' : 'rgba(120,150,210,0.22)'}`,
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <span
        className="absolute top-[3px] rounded-full transition-all duration-200"
        style={{
          width: '20px', height: '20px',
          left: on ? '21px' : '3px',
          background: on ? '#fff' : 'var(--text-2)',
        }}
      />
    </button>
  )
}

interface SettingItem {
  icon: React.ElementType
  label: string
  sub?: string
  value?: string
  bg: string
  color: string
  toggle: boolean
  toggleKey?: string
  segmented?: boolean
}

interface SettingGroup {
  label: string
  items: SettingItem[]
}

const SETTINGS_GROUPS: SettingGroup[] = [
  {
    label: 'Préférences de jeu',
    items: [
      { icon: Translate,             label: 'Langue',           sub: undefined,                     value: 'Français', bg: 'rgba(46,143,232,0.14)',  color: 'var(--primary-300)', toggle: false },
      { icon: GlobeHemisphereWest,   label: 'Version du jeu',   sub: 'Patch & DLC suivis',         value: 'v3.2',     bg: 'rgba(31,195,212,0.14)',  color: 'var(--cyan-300)',    toggle: false },
      { icon: SlidersHorizontal,     label: 'Unités de stats',  sub: undefined,                     value: undefined,  bg: 'rgba(139,69,230,0.14)', color: 'var(--violet-300)', toggle: false, segmented: true },
    ],
  },
  {
    label: 'Notifications',
    items: [
      { icon: Egg,   label: 'Éclosion d\'œufs',   sub: 'Alerte quand une lignée est prête', value: undefined, bg: 'rgba(47,203,133,0.14)',  color: 'var(--success-400)', toggle: true,  toggleKey: 'eggs'   },
      { icon: Flame, label: 'Rappel de série',     sub: 'Ne casse pas ta série de captures', value: undefined, bg: 'rgba(245,165,36,0.14)',  color: 'var(--warning-400)', toggle: true,  toggleKey: 'streak' },
      { icon: Crown, label: 'Apparition de boss',  sub: 'Événements de raid en temps réel', value: undefined, bg: 'rgba(242,85,90,0.14)',   color: 'var(--error-400)',   toggle: true,  toggleKey: 'boss'   },
    ],
  },
  {
    label: 'Assistant Nox',
    items: [
      { icon: Sparkle,    label: 'Conseils proactifs', sub: 'Nox suggère des actions d\'élevage', value: undefined, bg: 'var(--grad-nox)',        color: '#fff',              toggle: true,  toggleKey: 'noxTips' },
      { icon: Microphone, label: 'Réponses vocales',   sub: undefined,                             value: undefined, bg: 'var(--surface-3)',       color: 'var(--text-2)',     toggle: true,  toggleKey: 'voice'   },
    ],
  },
  {
    label: 'Compte',
    items: [
      { icon: CloudArrowUp, label: 'Sauvegarde cloud', sub: 'Dernière : aujourd\'hui 09:12', value: undefined, bg: 'var(--surface-3)', color: 'var(--text-2)', toggle: false },
      { icon: ShieldCheck,  label: 'Confidentialité',  sub: undefined,                        value: undefined, bg: 'var(--surface-3)', color: 'var(--text-2)', toggle: false },
    ],
  },
]

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    eggs: true, streak: true, boss: false, noxTips: true, voice: false,
  })

  const toggle = (key: string) => setToggles(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Paramètres"
        actions={<IconButton href="/profile"><ArrowLeft size={19} /></IconButton>}
      />

      <div className="px-5 pb-28 overflow-y-auto max-w-xl mx-auto w-full lg:max-w-2xl">
        {/* Pro banner */}
        <div
          className="flex items-center gap-3.5 p-[18px] rounded-xl relative overflow-hidden mb-2"
          style={{ background: 'var(--grad-premium)' }}
        >
          <Image src="/mascot/nox-mascot.png" alt="Nox" width={64} height={64} className="flex-none"
            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' }} />
          <div className="flex-1">
            <h3 className="font-display font-bold text-[17px] text-[#1a1206] m-0">PALNOX Pro est actif</h3>
            <p className="text-[12px] text-[#3a2a08] mt-1 m-0 leading-[1.4]">
              Calculs illimités · cartes · IA avancée. Renouvellement le 14 mars.
            </p>
          </div>
          <div
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center flex-none"
            style={{ background: '#1a1206', color: 'var(--rarity-legendary)' }}
          >
            <ArrowRight size={18} />
          </div>
        </div>

        {SETTINGS_GROUPS.map(group => (
          <div key={group.label}>
            <div className="font-display font-semibold text-[11px] tracking-[0.12em] uppercase text-ink-3 mt-5 mb-2.5 mx-1">
              {group.label}
            </div>
            <div
              className="rounded-lg border overflow-hidden"
              style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
            >
              {group.items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3.5 border-b last:border-b-0"
                    style={{ borderColor: 'rgba(120,150,210,0.12)' }}
                  >
                    <div
                      className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center flex-none"
                      style={{ background: item.bg }}
                    >
                      <Icon size={18} weight="fill" color={item.color} />
                    </div>
                    <div className="flex-1">
                      <b className="font-display font-semibold text-[14px] text-ink-1 block">{item.label}</b>
                      {item.sub && <span className="text-[11.5px] text-ink-3">{item.sub}</span>}
                    </div>
                    {item.toggle && item.toggleKey && (
                      <Toggle on={toggles[item.toggleKey]} onChange={() => toggle(item.toggleKey!)} />
                    )}
                    {item.value && (
                      <div className="flex items-center gap-1.5 text-[13px] text-ink-3">
                        {item.value} <ArrowRight size={16} color="var(--text-4)" />
                      </div>
                    )}
                    {item.segmented && (
                      <div
                        className="flex gap-[3px] p-[3px] rounded-[10px]"
                        style={{ background: 'var(--bg-1)' }}
                      >
                        {['Brut', '%'].map((opt, i) => (
                          <button
                            key={opt}
                            className="font-display font-semibold text-[12px] px-3 py-1.5 rounded-[7px] cursor-pointer border-none"
                            style={{
                              background: i === 1 ? 'var(--surface-3)' : 'transparent',
                              color: i === 1 ? 'var(--text-1)' : 'var(--text-3)',
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {!item.toggle && !item.value && !item.segmented && (
                      <ArrowRight size={16} color="var(--text-4)" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div
          className="rounded-lg border overflow-hidden mt-5"
          style={{ borderColor: 'rgba(120,150,210,0.12)' }}
        >
          <button
            className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer"
            style={{ background: 'var(--grad-surface)' }}
          >
            <div
              className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center flex-none"
              style={{ background: 'rgba(242,85,90,0.14)' }}
            >
              <SignOut size={18} weight="fill" color="var(--error-400)" />
            </div>
            <b className="font-display font-semibold text-[14px]" style={{ color: 'var(--error-400)' }}>
              Déconnexion
            </b>
          </button>
        </div>

        <div className="text-center mt-5 text-[11.5px] font-display" style={{ color: 'var(--text-4)' }}>
          PALNOX v1.0.0 · Companion non officiel
        </div>
      </div>
    </div>
  )
}
