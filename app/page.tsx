'use client'

import { useState } from 'react'
import { LandingScreen } from '@/components/landing-screen'
import { ProcessingTerminal } from '@/components/processing-terminal'
import { DashboardView } from '@/components/dashboard-view'

type Stage = 'landing' | 'processing' | 'dashboard'

export default function Page() {
  const [stage, setStage] = useState<Stage>('landing')
  const [query, setQuery] = useState<string | null>(null)

  function handleAnalyze(topic: string) {
    setQuery(topic)
    setStage('processing')
  }

  function handleReset() {
    setQuery(null)
    setStage('landing')
  }

  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4] [background-image:radial-gradient(oklch(0.78_0.15_195_/_0.06)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      {stage === 'landing' && <LandingScreen onAnalyze={handleAnalyze} />}

      {stage === 'processing' && query !== null && (
        <ProcessingTerminal query={query} onComplete={() => setStage('dashboard')} />
      )}

      {stage === 'dashboard' && query !== null && (
        <DashboardView query={query} onReset={handleReset} />
      )}
    </div>
  )
}
