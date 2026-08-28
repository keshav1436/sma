import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type DashboardCardProps = {
  title: string
  subtitle: string
  icon: LucideIcon
  children?: ReactNode
}

export function DashboardCard({ title, subtitle, icon: Icon, children }: DashboardCardProps) {
  return (
    <section
      aria-label={title}
      className="flex min-h-[20rem] flex-col rounded-2xl border border-border bg-card"
    >
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
          Live
        </span>
      </header>

      {children ? (
        <div className="flex flex-1 flex-col p-5">{children}</div>
      ) : (
        <div className="flex flex-1 items-center justify-center p-5">
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="h-24 w-full max-w-[16rem] rounded-lg border border-dashed border-border"
              aria-hidden="true"
            />
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Awaiting data stream
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
