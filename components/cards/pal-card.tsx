'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LockSimple } from '@phosphor-icons/react'
import { TraitBadge } from '@/components/ui/trait-badge'
import { getRarityColor } from '@/lib/utils'
import type { Pal } from '@/types/pal'

const FALLBACK = '/mascot/nox-mascot.png'

interface PalCardProps {
  pal: Pal
  isCaptured?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
}

const RARITY_LABEL: Record<string, string> = {
  common: 'Comm.',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légd.',
  alpha: 'Alpha',
  lucky: 'Lucky',
  boss: 'Boss',
}

function PalImage({ src, alt, size, captured }: { src?: string; alt: string; size: number; captured: boolean }) {
  const [imgSrc, setImgSrc] = useState(src ?? FALLBACK)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      onError={() => setImgSrc(FALLBACK)}
      className="object-contain"
      style={{
        filter: captured
          ? 'drop-shadow(0 5px 10px rgba(0,0,0,0.4))'
          : 'brightness(0) invert(0.22)',
      }}
    />
  )
}

export function PalCard({ pal, isCaptured = true, onClick, size = 'md' }: PalCardProps) {
  const rarityColor = getRarityColor(pal.rarity)
  const imgSize = size === 'sm' ? 52 : 60

  return (
    <motion.div
      whileHover={isCaptured ? { y: -3 } : undefined}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-md cursor-pointer border"
      style={{
        background: 'var(--grad-surface)',
        borderColor: 'rgba(120,150,210,0.12)',
        opacity: isCaptured ? 1 : 0.5,
      }}
    >
      {/* Image area */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: size === 'sm' ? 72 : 78,
          background: isCaptured
            ? `radial-gradient(circle at 50% 35%, ${rarityColor}33, transparent 70%)`
            : undefined,
        }}
      >
        <span className="absolute top-1.5 left-1.5 font-display font-bold text-[10px]" style={{ color: 'var(--text-4)' }}>
          {String(pal.palNumber).padStart(3, '0')}
        </span>

        {isCaptured && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: rarityColor }} />
        )}

        <div className="relative flex items-center justify-center" style={{ width: imgSize, height: imgSize }}>
          <PalImage
            src={isCaptured ? pal.imageUrl : undefined}
            alt={pal.name}
            size={imgSize}
            captured={isCaptured}
          />
        </div>

        {!isCaptured && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LockSimple size={22} weight="fill" color="var(--text-4)" />
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="px-2 py-2 border-t" style={{ borderColor: 'rgba(120,150,210,0.12)' }}>
        <b className="font-display font-semibold text-[12px] text-ink-1 block truncate">
          {isCaptured ? pal.name : '? ? ?'}
        </b>
        <span className="text-[10px] text-ink-3">
          {isCaptured ? pal.elementPrimary : 'Inconnu'}
        </span>
      </div>
    </motion.div>
  )
}

/* Mini card used in "recently captured" scroll */
export function PalMiniCard({ pal, badge }: { pal: Pal; badge?: string }) {
  const rarityColor = getRarityColor(pal.rarity)
  const [imgSrc, setImgSrc] = useState(pal.imageUrl ?? FALLBACK)

  return (
    <div
      className="flex-none w-32 rounded-lg overflow-hidden border"
      style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.12)' }}
    >
      <div
        className="h-24 flex items-center justify-center relative"
        style={{ background: `radial-gradient(circle at 50% 35%, ${rarityColor}33, transparent 70%)` }}
      >
        {badge && (
          <div className="absolute top-2 left-2">
            <TraitBadge label={badge} variant={pal.rarity} dot />
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={pal.name}
          width={78}
          height={78}
          onError={() => setImgSrc(FALLBACK)}
          className="object-contain"
          style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }}
        />
      </div>
      <div className="px-3 py-2">
        <b className="font-display font-semibold text-[14px] text-ink-1 block">{pal.name}</b>
        <span className="text-[11px] text-ink-3">
          #{String(pal.palNumber).padStart(3, '0')} · {pal.elementPrimary}
        </span>
      </div>
    </div>
  )
}
