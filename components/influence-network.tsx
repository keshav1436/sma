'use client'

import { networkNodes, networkEdges } from '@/lib/mock-data'

// Fixed radial layout: strongest influencer (highest score) in center-ish,
// others arranged around a circle for a clean topology view.
const positions: Record<string, { x: number; y: number }> = {
  influencer_3: { x: 50, y: 30 }, // @siliconvalleyinsider — top hub
  influencer_1: { x: 78, y: 62 }, // @techjournalist_maya
  influencer_2: { x: 22, y: 62 }, // @policywatchdog
  influencer_4: { x: 50, y: 85 }, // @digitalrightsnow
}

const edgeColors: Record<string, string> = {
  retweet: 'var(--chart-1)',
  quote: 'var(--chart-4)',
  reply: 'var(--chart-2)',
  mention: 'var(--chart-5)',
}

function formatFollowers(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}K`
}

export function InfluenceNetwork() {
  const maxWeight = Math.max(...networkEdges.map((e) => e.weight))

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-background/40 lg:max-w-[32rem]">
        {/* Edges */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {networkEdges.map((edge, i) => {
            const from = positions[edge.source]
            const to = positions[edge.target]
            if (!from || !to) return null
            const width = 0.3 + (edge.weight / maxWeight) * 1.2
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edgeColors[edge.interactionType] ?? 'var(--border)'}
                strokeWidth={width}
                strokeOpacity={0.5}
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {networkNodes.map((node) => {
          const pos = positions[node.id]
          if (!pos) return null
          const size = 40 + (node.influenceScore / 100) * 28
          return (
            <div
              key={node.id}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <span
                className="flex items-center justify-center rounded-full border border-primary/50 bg-primary/15 font-mono text-[10px] font-bold text-primary shadow-[0_0_20px_-4px_var(--primary)] transition-transform duration-300 group-hover:scale-110"
                style={{ width: size, height: size }}
              >
                {node.influenceScore}
              </span>
              <span className="mt-1.5 max-w-[7rem] truncate text-center text-[10px] font-medium text-foreground">
                {node.name}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground">
                {formatFollowers(node.followers)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend + edge list */}
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Interaction Types
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(edgeColors).map(([type, color]) => (
              <span key={type} className="flex items-center gap-1.5 text-xs text-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Influence Flow
          </p>
          {networkEdges.map((edge, i) => {
            const source = networkNodes.find((n) => n.id === edge.source)
            const target = networkNodes.find((n) => n.id === edge.target)
            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs"
              >
                <span className="flex items-center gap-2 truncate">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: edgeColors[edge.interactionType] }}
                    aria-hidden="true"
                  />
                  <span className="truncate text-foreground">{source?.name}</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="truncate text-foreground">{target?.name}</span>
                </span>
                <span className="shrink-0 font-mono text-muted-foreground">
                  {edge.weight.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
