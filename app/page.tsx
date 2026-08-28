import { Activity, LineChart, PieChart, Hash, Network, Radar } from 'lucide-react'
import { IntelligenceSummary } from '@/components/intelligence-summary'
import { DashboardCard } from '@/components/dashboard-card'
import { SentimentTimelineChart } from '@/components/sentiment-timeline-chart'
import { DemographicsChart } from '@/components/demographics-chart'
import { TrendingKeywords } from '@/components/trending-keywords'

const cards = [
  {
    title: 'Sentiment Timeline',
    subtitle: 'Hourly · 08:00 – 20:00',
    icon: LineChart,
    content: <SentimentTimelineChart />,
  },
  {
    title: 'Audience Demographics',
    subtitle: 'Age & region breakdown',
    icon: PieChart,
    content: <DemographicsChart />,
  },
  {
    title: 'Trending Keywords',
    subtitle: 'Top volume signals',
    icon: Hash,
    content: <TrendingKeywords />,
  },
  {
    title: 'Influence Network',
    subtitle: 'Node & edge graph',
    icon: Network,
    content: null,
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4] [background-image:radial-gradient(oklch(0.78_0.15_195_/_0.06)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
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
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex">
              <Activity className="h-3.5 w-3.5 text-chart-2" aria-hidden="true" />
              <span className="font-mono text-[11px] text-muted-foreground">
                Streaming · {new Date().getUTCFullYear()}
              </span>
            </div>
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

        <main className="flex flex-col gap-8">
          <IntelligenceSummary />

          <section aria-labelledby="analytics-heading">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-4 w-1 rounded-full bg-primary" aria-hidden="true" />
              <h2
                id="analytics-heading"
                className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
              >
                Analytics Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {cards.map((card) => (
                <DashboardCard
                  key={card.title}
                  title={card.title}
                  subtitle={card.subtitle}
                  icon={card.icon}
                >
                  {card.content}
                </DashboardCard>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
