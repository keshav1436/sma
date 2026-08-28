'use client'

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { ageGroups, topRegions } from '@/lib/mock-data'

const ageChartConfig = {
  '18-25': { label: '18 – 25', color: 'var(--chart-1)' },
  '26-35': { label: '26 – 35', color: 'var(--chart-4)' },
  '36-50': { label: '36 – 50', color: 'var(--chart-2)' },
} satisfies ChartConfig

const ageData = ageGroups.map((item) => ({
  ...item,
  fill: `var(--color-${item.group})`,
}))

const regionChartConfig = {
  percentage: { label: 'Share of audience', color: 'var(--chart-1)' },
} satisfies ChartConfig

const regionColors = ['var(--chart-1)', 'var(--chart-4)', 'var(--chart-2)']

export function DemographicsChart() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Age Distribution
        </p>
        <div className="flex items-center gap-4">
          <ChartContainer config={ageChartConfig} className="aspect-square h-32 w-32 shrink-0">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="group" hideLabel />} />
              <Pie
                data={ageData}
                dataKey="percentage"
                nameKey="group"
                innerRadius={32}
                outerRadius={52}
                strokeWidth={2}
                stroke="var(--card)"
              >
                {ageData.map((entry) => (
                  <Cell key={entry.group} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="flex flex-1 flex-col gap-2">
            {ageData.map((item) => (
              <div key={item.group} className="flex items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.fill }}
                    aria-hidden="true"
                  />
                  {ageChartConfig[item.group as keyof typeof ageChartConfig].label}
                </span>
                <span className="font-mono font-medium text-card-foreground">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Top Regions
        </p>
        <ChartContainer config={regionChartConfig} className="aspect-auto h-28 w-full">
          <BarChart
            data={topRegions}
            layout="vertical"
            margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="region"
              type="category"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              width={96}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="percentage" radius={4}>
              {topRegions.map((_, index) => (
                <Cell key={index} fill={regionColors[index % regionColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
