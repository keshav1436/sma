import type { Keyword } from '@/lib/mock-data'

const barColors = ['var(--chart-1)', 'var(--chart-4)', 'var(--chart-2)', 'var(--chart-1)', 'var(--chart-4)']

type TrendingKeywordsProps = {
  keywords: Keyword[]
}

export function TrendingKeywords({ keywords }: TrendingKeywordsProps) {
  const maxVolume = Math.max(...keywords.map((item) => item.volume))

  return (
    <ul className="flex w-full flex-col gap-4">
      {keywords.map((item, index) => {
        const widthPercent = (item.volume / maxVolume) * 100
        const color = barColors[index % barColors.length]

        return (
          <li key={item.keyword} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-2 font-medium text-card-foreground">
                <span className="font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.keyword}
              </span>
              <span className="font-mono tabular-nums text-muted-foreground">
                {item.volume.toLocaleString()}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-[width]"
                style={{ width: `${widthPercent}%`, backgroundColor: color }}
                aria-hidden="true"
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
