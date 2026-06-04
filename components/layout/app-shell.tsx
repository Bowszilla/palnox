import { DesktopSidebar } from '@/components/navigation/desktop-sidebar'
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav'
import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: `
          radial-gradient(90% 60% at 50% -10%, rgba(46,143,232,0.12), transparent 60%),
          var(--bg-0)
        `,
      }}
    >
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 overflow-y-auto pb-safe">{children}</main>
        <div className="lg:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </div>
  )
}
