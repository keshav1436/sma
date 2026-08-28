import { Flame, TrendingUp, Frown, Users, Share2, type LucideIcon } from 'lucide-react'

type SummaryItem = {
  icon: LucideIcon
  label: string
  value: string
  detail: string
  tone?: 'default' | 'negative' | 'positive'
}

const items: SummaryItem[] = [
  {
    icon: Flame,
    label: 'Rising Topic',
    value: 'Tech Policy Change 2026',
    detail: '184,320 posts tracked',
  },
  {
    icon: TrendingUp,
    label: 'Growth',
    value: '+342%',
    detail: 'vs. 24h baseline',
    tone: 'positive',
  },
  {
    icon: Frown,
    label: 'Overall Sentiment',
    value: 'Negative',
    detail: '58% of conversation',
    tone: 'negative',
  },
  {
    icon: Users,
    label: 'Major Audience',
    value: '26 – 35',
    detail: '41% of participants',
  },
  {
    icon: Share2,
    label: 'Influence Flow',
    value: '@siliconvalleyinsider',
    detail: 'Score 97 · 1.12M reach',
  },
]

export function IntelligenceSummary() {
  return (
    <section aria-labelledby="summary-heading">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-4 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h2
          id="summary-heading"
          className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Unified Intelligence Summary
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {items.map(({ icon: Icon, label, value, detail, tone = 'default' }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/5 blur-xl transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                  tone === 'negative'
                    ? 'border-destructive/30 bg-destructive/10 text-destructive'
                    : tone === 'positive'
                      ? 'border-chart-2/30 bg-chart-2/10 text-chart-2'
                      : 'border-primary/30 bg-primary/10 text-primary'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
            </div>
            <p className="mt-3 truncate text-lg font-semibold text-card-foreground" title={value}>
              {value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
