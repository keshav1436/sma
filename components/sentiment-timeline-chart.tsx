'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { SentimentPoint } from '@/lib/mock-data'

const chartConfig = {
  positive: { label: 'Positive', color: 'var(--chart-2)' },
  neutral: { label: 'Neutral', color: 'var(--chart-1)' },
  negative: { label: 'Negative', color: 'var(--chart-4)' },
} satisfies ChartConfig

type SentimentTimelineChartProps = {
  data: SentimentPoint[]
}

export function SentimentTimelineChart({ data }: SentimentTimelineChartProps) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillPositive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-positive)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-positive)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-neutral)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-neutral)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillNegative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-negative)" stopOpacity={0.55} />
            <stop offset="95%" stopColor="var(--color-negative)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={10}
          interval={1}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10} width={36} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="negative"
          type="monotone"
          fill="url(#fillNegative)"
          stroke="var(--color-negative)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="neutral"
          type="monotone"
          fill="url(#fillNeutral)"
          stroke="var(--color-neutral)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="positive"
          type="monotone"
          fill="url(#fillPositive)"
          stroke="var(--color-positive)"
          strokeWidth={2}
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
