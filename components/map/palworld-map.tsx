'use client'
import { useEffect, useState } from 'react'
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getRarityColor } from '@/lib/utils'

// Map uses a 600×600 pixel coordinate system matching the spawn heatmaps
const BOUNDS: L.LatLngBoundsExpression = [[0, 0], [600, 600]]
const WORLD_MAP = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/T_WorldMap.png'
const SPAWN_BASE = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/maps/'

export type MarkerType = 'boss' | 'alpha' | 'spawn' | 'resource' | 'camp'

export interface MapLocation {
  id: string
  name: string
  type: MarkerType
  x: number // 0-100 scale stored in DB
  y: number // 0-100 scale stored in DB
  description?: string
  palName?: string
}

interface Props {
  locations: MapLocation[]
  spawnPalNumber?: number | null
  spawnMode?: 'day' | 'night'
  onMarkerClick?: (loc: MapLocation) => void
}

const TYPE_COLORS: Record<MarkerType, string> = {
  boss:     '#F2555A',
  alpha:    '#F5B638',
  spawn:    '#1FC3D4',
  resource: '#2FB76B',
  camp:     '#2E8FE8',
}

const TYPE_ICONS: Record<MarkerType, string> = {
  boss:     '☠',
  alpha:    '★',
  spawn:    '◎',
  resource: '◆',
  camp:     '⌂',
}

function toLeaflet(x: number, y: number): L.LatLngExpression {
  // Convert DB 0-100 coords to map 0-600 coords
  // Leaflet CRS.Simple uses [lat=y, lng=x] but Y is inverted for image coords
  return [600 - y * 6, x * 6]
}

function createMarkerIcon(type: MarkerType) {
  const color = TYPE_COLORS[type]
  const icon = TYPE_ICONS[type]
  return L.divIcon({
    className: '',
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${color}22;border:2px solid ${color};
      display:flex;align-items:center;justify-content:center;
      font-size:14px;box-shadow:0 0 10px ${color}88;
      backdrop-filter:blur(4px);
    ">${icon}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

function Markers({ locations, onMarkerClick }: { locations: MapLocation[]; onMarkerClick?: (loc: MapLocation) => void }) {
  const map = useMap()

  useEffect(() => {
    const markers: L.Marker[] = []

    locations.forEach(loc => {
      const icon = createMarkerIcon(loc.type)
      const m = L.marker(toLeaflet(loc.x, loc.y), { icon })
        .addTo(map)

      const color = TYPE_COLORS[loc.type]
      m.bindTooltip(`<div style="font-family:var(--font-display,sans-serif);font-weight:700;font-size:13px;color:#f0f4ff;background:#101829;border:1px solid ${color}55;border-radius:8px;padding:6px 10px;">${loc.name}</div>`, {
        permanent: false,
        direction: 'top',
        offset: [0, -18],
        className: 'leaflet-tooltip-palnox',
      })

      if (onMarkerClick) m.on('click', () => onMarkerClick(loc))
      markers.push(m)
    })

    return () => { markers.forEach(m => m.remove()) }
  }, [map, locations, onMarkerClick])

  return null
}

export function PalworldMap({ locations, spawnPalNumber, spawnMode = 'day', onMarkerClick }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const spawnUrl = spawnPalNumber
    ? `${SPAWN_BASE}${String(spawnPalNumber).padStart(3, '0')}-${spawnMode}.png`
    : null

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={BOUNDS}
      minZoom={-2}
      maxZoom={2}
      zoom={-1}
      style={{ width: '100%', height: '100%', background: '#060A12' }}
      zoomControl={false}
    >
      {/* World map base */}
      <ImageOverlay url={WORLD_MAP} bounds={BOUNDS} opacity={1} />

      {/* Spawn heatmap overlay */}
      {spawnUrl && (
        <ImageOverlay
          key={spawnUrl}
          url={spawnUrl}
          bounds={BOUNDS}
          opacity={0.75}
        />
      )}

      {/* Markers */}
      <Markers locations={locations} onMarkerClick={onMarkerClick} />
    </MapContainer>
  )
}
