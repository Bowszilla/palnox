'use client'
import { useEffect, useState } from 'react'
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Coordinate space: 0-100 in DB, mapped to 0-600 for the 600x600 map images
// T_WorldMap.png and spawn maps (001-day.png etc.) share the same 600x600 space
const BOUNDS: L.LatLngBoundsExpression = [[0, 0], [600, 600]]
const WORLD_MAP_URL = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/T_WorldMap.png'
const SPAWN_BASE = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/maps/'

export type MarkerType = 'boss' | 'alpha' | 'spawn' | 'resource' | 'camp'

export interface MapLocation {
  id: string
  name: string
  type: MarkerType
  x: number // 0-100 scale in DB
  y: number // 0-100 scale in DB, 0=top
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

// DB coords (x,y in 0-100, y=0 at top) → Leaflet CRS.Simple [lat, lng]
// In CRS.Simple lat increases upward, so we invert y: lat = 600 - y*6
function toLatLng(x: number, y: number): L.LatLngExpression {
  return [600 - y * 6, x * 6]
}

function createMarkerIcon(type: MarkerType) {
  const color = TYPE_COLORS[type]
  const icon = TYPE_ICONS[type]
  return L.divIcon({
    className: '',
    html: `<div style="
      width:42px; height:42px; border-radius:50%;
      background:${color}30;
      border:2.5px solid ${color};
      display:flex; align-items:center; justify-content:center;
      font-size:18px;
      box-shadow:0 0 16px ${color}99, 0 2px 8px rgba(0,0,0,0.6);
      backdrop-filter:blur(4px);
      cursor:pointer;
    ">${icon}</div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -24],
  })
}

function Markers({ locations, onMarkerClick }: Pick<Props, 'locations' | 'onMarkerClick'>) {
  const map = useMap()

  useEffect(() => {
    const markers: L.Marker[] = []

    locations.forEach(loc => {
      const m = L.marker(toLatLng(loc.x, loc.y), {
        icon: createMarkerIcon(loc.type),
        interactive: true,
      }).addTo(map)

      const color = TYPE_COLORS[loc.type]
      m.bindTooltip(
        `<b style="color:${color}">${loc.name}</b>`,
        { permanent: false, direction: 'top', offset: [0, -24], className: '' }
      )

      if (onMarkerClick) {
        m.on('click', (e) => {
          L.DomEvent.stopPropagation(e)
          onMarkerClick(loc)
        })
      }

      markers.push(m)
    })

    return () => { markers.forEach(m => { m.off(); m.remove() }) }
  }, [map, locations, onMarkerClick])

  return null
}

export function PalworldMap({ locations, spawnPalNumber, spawnMode = 'day', onMarkerClick }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  // When a pal is selected, the spawn map already includes the world map background
  const activeMapUrl = spawnPalNumber
    ? `${SPAWN_BASE}${String(spawnPalNumber).padStart(3, '0')}-${spawnMode}.png`
    : WORLD_MAP_URL

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={BOUNDS}
      minZoom={-2}
      maxZoom={2}
      style={{ width: '100%', height: '100%', background: '#060A12' }}
      zoomControl={false}
    >
      <ImageOverlay key={activeMapUrl} url={activeMapUrl} bounds={BOUNDS} opacity={1} />
      <Markers locations={locations} onMarkerClick={onMarkerClick} />
    </MapContainer>
  )
}
