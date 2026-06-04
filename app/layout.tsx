import type { Metadata, Viewport } from 'next'
import { Chakra_Petch, Space_Grotesk, Rajdhani } from 'next/font/google'
import './globals.css'

const chakraPetch = Chakra_Petch({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-chakra-petch',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PALNOX — The Ultimate Palworld Companion',
  description:
    'Breed calculator, trait optimizer, collection tracker, interactive map and AI assistant for Palworld.',
  keywords: ['Palworld', 'breeding', 'companion', 'Paldex', 'traits', 'collection'],
  authors: [{ name: 'PALNOX' }],
  manifest: '/manifest.json',
  icons: { icon: '/logo-favicon.png', apple: '/logo-favicon.png' },
  openGraph: {
    title: 'PALNOX — The Ultimate Palworld Companion',
    description: 'Your complete Palworld companion app.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0F1B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${chakraPetch.variable} ${spaceGrotesk.variable} ${rajdhani.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
