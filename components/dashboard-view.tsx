'use client'

import { useState } from 'react'
import { Activity, LayoutGrid, LineChart, PieChart, Network, Radar, Hash } from 'lucide-react'
import { IntelligenceSummary } from '@/components/intelligence-summary'
import { DashboardCard } from '@/components/dashboard-card'
import { SentimentTimelineChart } from '@/components/sentiment-timeline-chart'
import { DemographicsChart } from '@/components/demographics-chart'
import { TrendingKeywords } from '@/components/trending-keywords'
import { InfluenceNetwork } from '@/components/influence-network'

type TabId = 'overview' | 'sentiment' | 'demographics' | 'network'

const tabs: { id: TabId; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'sentiment', label: 'Sentiment', icon: LineChart },
  { id: 'demographics', label: 'Demographics', icon: PieChart },
  { id: 'network', label: 'Network Flow', icon: Network },
]

type DashboardViewProps = {
  query: string
  onReset: () => void
}

export function DashboardView({ query, onReset }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Radar className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              SENTINEL<span className="text-primary">-AI</span>
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Social Intelligence Command Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Activity className="h-3.5 w-3.5 text-chart-2" aria-hidden="true" />
            New Analysis
          </button>
          <div className="flex items-center gap-2 rounded-full border border-chart-2/30 bg-chart-2/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-chart-2" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-chart-2">
              Live Data Feed: Mocked for Prototype
            </span>
          </div>
        </div>
      </header>

      <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <Hash className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Active Query
        </span>
        <span className="text-sm font-semibold text-foreground">{query}</span>
      </div>

      {/* Tab navigation */}
      <nav
        aria-label="Dashboard sections"
        className="mb-8 flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/15 text-primary shadow-[inset_0_0_0_1px_var(--primary)]'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <main key={activeTab} className="flex animate-in flex-col gap-6 fade-in duration-500">
        {activeTab === 'overview' && <IntelligenceSummary />}

        {activeTab === 'sentiment' && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <DashboardCard title="Sentiment Timeline" subtitle="Hourly · 08:00 – 20:00" icon={LineChart}>
              <SentimentTimelineChart />
            </DashboardCard>
            <DashboardCard title="Trending Keywords" subtitle="Top volume signals" icon={Hash}>
              <TrendingKeywords />
            </DashboardCard>
          </div>
        )}

        {activeTab === 'demographics' && (
          <DashboardCard
            title="Audience Demographics"
            subtitle="Age & region breakdown"
            icon={PieChart}
          >
            <DemographicsChart />
          </DashboardCard>
        )}

        {activeTab === 'network' && (
          <DashboardCard title="Influence Network" subtitle="Node & edge topology" icon={Network}>
            <InfluenceNetwork />
          </DashboardCard>
        )}
      </main>
    </div>
  )
}
