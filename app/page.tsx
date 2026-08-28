'use client'

import { useState } from 'react'
import { LandingScreen } from '@/components/landing-screen'
import { DashboardView } from '@/components/dashboard-view'

export default function Page() {
  const [query, setQuery] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4] [background-image:radial-gradient(oklch(0.78_0.15_195_/_0.06)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      {query === null ? (
        <LandingScreen onAnalyze={setQuery} />
      ) : (
        <DashboardView query={query} onReset={() => setQuery(null)} />
      )}
    </div>
  )
}
