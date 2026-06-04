'use client'
import { useEffect, useRef } from 'react'

interface ProgressRingProps {
  percent: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
  gradientId?: string
}

export function ProgressRing({
  percent,
  size = 104,
  strokeWidth = 9,
  label,
  sublabel,
  gradientId = 'ringgrad',
}: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return
    circle.style.strokeDasharray = `${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
    const timer = setTimeout(() => {
      circle.style.strokeDashoffset = `${circumference * (1 - percent / 100)}`
    }, 200)
    return () => clearTimeout(timer)
  }, [percent, circumference])

  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#29D6E6" />
            <stop offset="100%" stopColor="#8B45E6" />
          </linearGradient>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--surface-3)"
        />
        <circle
          ref={circleRef}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          className="ring-animate"
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && (
            <b className="font-stat font-bold text-[30px] leading-none">{label}</b>
          )}
          {sublabel && (
            <span className="font-display font-semibold text-[10px] tracking-[0.1em] text-ink-3 mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
