'use client'
import { useEffect, useState } from 'react'
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Wiki map: 2155×1903 px — the most recent version (includes Feybreak Island)
// Leaflet CRS.Simple bounds match the image pixel dimensions
const MAP_W = 2155
const MAP_H = 1903
const BOUNDS: L.LatLngBoundsExpression = [[0, 0], [MAP_H, MAP_W]]
const WORLD_MAP_URL = 'https://palworld.wiki.gg/images/Palpagos_Islands.png'

export type MarkerType = 'boss' | 'alpha' | 'spawn' | 'resource' | 'camp'

export interface MapLocation {
  id: string
  name: string
  type: MarkerType
  x: number // 0-100 scale (% of map width)
  y: number // 0-100 scale (% of map height, 0=top)
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

// DB coords (x,y 0-100) → Leaflet [lat, lng]
// lat = MAP_H - y%*MAP_H  (invert y: 0=top in image → lat=MAP_H in Leaflet)
// lng = x% * MAP_W
function toLatLng(x: number, y: number): L.LatLngExpression {
  return [MAP_H - (y / 100) * MAP_H, (x / 100) * MAP_W]
}

function createMarkerIcon(type: MarkerType) {
  const color = TYPE_COLORS[type]
  const icon = TYPE_ICONS[type]
  return L.divIcon({
    className: '',
    html: `<div style="
      width:44px; height:44px; border-radius:50%;
      background:${color}28;
      border:2.5px solid ${color};
      display:flex; align-items:center; justify-content:center;
      font-size:20px;
      box-shadow:0 0 18px ${color}99, 0 3px 10px rgba(0,0,0,0.7);
      backdrop-filter:blur(4px);
      cursor:pointer;
    ">${icon}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -26],
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

export function PalworldMap({ locations, onMarkerClick }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={BOUNDS}
      minZoom={-3}
      maxZoom={2}
      style={{ width: '100%', height: '100%', background: '#071520' }}
      zoomControl={false}
    >
      <ImageOverlay url={WORLD_MAP_URL} bounds={BOUNDS} opacity={1} />
      <Markers locations={locations} onMarkerClick={onMarkerClick} />
    </MapContainer>
  )
}
