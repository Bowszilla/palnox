'use client'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Tile server: cdn.th.gl — 512px tiles, zoom 0-4, TMS convention (y=0 at bottom)
// Full map fits in a 512×512 CRS.Simple coordinate space at z=0
const TILE_URL = 'https://cdn.th.gl/palworld/map-tiles/default/{z}/{x}/{y}.webp'
const TILE_SIZE = 512
const MAP_UNITS = TILE_SIZE // at z=0, one tile covers the whole map
const BOUNDS: L.LatLngBoundsExpression = [[0, 0], [MAP_UNITS, MAP_UNITS]]

export type MarkerType = 'boss' | 'alpha' | 'spawn' | 'resource' | 'camp'

export interface MapLocation {
  id: string
  name: string
  type: MarkerType
  x: number // 0-100 (% from left)
  y: number // 0-100 (% from top, 0=top)
  description?: string
  palName?: string
}

interface Props {
  locations: MapLocation[]
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

// DB (x,y 0-100, y=0 at top) → Leaflet [lat, lng]
// CRS.Simple: lat increases upward → lat = MAP_UNITS * (1 - y/100)
function toLatLng(x: number, y: number): L.LatLngExpression {
  return [MAP_UNITS * (1 - y / 100), MAP_UNITS * (x / 100)]
}

function createMarkerIcon(type: MarkerType) {
  const color = TYPE_COLORS[type]
  const icon = TYPE_ICONS[type]
  return L.divIcon({
    className: '',
    html: `<div style="
      width:44px;height:44px;border-radius:50%;
      background:${color}28;border:2.5px solid ${color};
      display:flex;align-items:center;justify-content:center;
      font-size:20px;
      box-shadow:0 0 18px ${color}99, 0 3px 10px rgba(0,0,0,0.7);
      backdrop-filter:blur(4px);cursor:pointer;
    ">${icon}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
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
        `<b style="color:${color};font-family:sans-serif;font-size:13px">${loc.name}</b>`,
        { permanent: false, direction: 'top', offset: [0, -26], className: '' }
      )

      if (onMarkerClick) {
        m.on('click', (e) => { L.DomEvent.stopPropagation(e); onMarkerClick(loc) })
      }

      markers.push(m)
    })

    return () => { markers.forEach(m => { m.off(); m.remove() }) }
  }, [map, locations, onMarkerClick])

  return null
}

export function PalworldMap({ locations, onMarkerClick }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={BOUNDS}
      minZoom={0}
      maxZoom={4}
      style={{ width: '100%', height: '100%', background: '#071520' }}
      zoomControl={false}
    >
      <TileLayer
        url={TILE_URL}
        tileSize={TILE_SIZE}
        minZoom={0}
        maxZoom={4}
        noWrap
        tms
        attribution='Map tiles © <a href="https://palworld.th.gl" target="_blank">palworld.th.gl</a>'
      />
      <Markers locations={locations} onMarkerClick={onMarkerClick} />
    </MapContainer>
  )
}
