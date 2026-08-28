'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'lucide-react'

type ProcessingTerminalProps = {
  query: string
  onComplete: () => void
}

type LogLine = {
  tag: string
  tone: 'system' | 'data' | 'nlp' | 'graph' | 'success'
  message: string
}

const LOGS: LogLine[] = [
  { tag: 'SYSTEM', tone: 'system', message: 'Initiating web crawlers for X and Telegram...' },
  { tag: 'DATA', tone: 'data', message: '14,023 posts ingested.' },
  { tag: 'NLP', tone: 'nlp', message: 'Running Multi-Dimensional Sentiment Inference...' },
  { tag: 'GRAPH', tone: 'graph', message: 'Mapping influencer network topology...' },
  { tag: 'SUCCESS', tone: 'success', message: 'Compiling Intelligence Dashboard...' },
]

const TONE_CLASS: Record<LogLine['tone'], string> = {
  system: 'text-primary',
  data: 'text-chart-4',
  nlp: 'text-chart-5',
  graph: 'text-chart-2',
  success: 'text-chart-2',
}

// Total sequence runs ~5s: 5 logs staggered, then a short hold before transition.
const LINE_DELAY = 850
const FINAL_HOLD = 750

export function ProcessingTerminal({ query, onComplete }: ProcessingTerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    LOGS.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(index + 1)
        }, LINE_DELAY * (index + 1)),
      )
    })

    timers.push(
      setTimeout(
        () => onCompleteRef.current(),
        LINE_DELAY * LOGS.length + FINAL_HOLD,
      ),
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  const progress = Math.round((visibleCount / LOGS.length) * 100)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_0_60px_-20px_oklch(0.78_0.15_195_/_0.4)]">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-chart-5/70" />
              <span className="h-3 w-3 rounded-full bg-chart-2/70" />
            </span>
            <div className="ml-2 flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="font-mono text-[11px] text-muted-foreground">
                sentinel-engine — analyzing "{query}"
              </span>
            </div>
          </div>

          <div
            className="min-h-[16rem] space-y-2 p-5 font-mono text-[13px] leading-relaxed"
            role="log"
            aria-live="polite"
          >
            {LOGS.slice(0, visibleCount).map((log, index) => (
              <div key={log.tag} className="flex gap-2 animate-in fade-in slide-in-from-left-2">
                <span className="text-muted-foreground/60">{'>'}</span>
                <span className={TONE_CLASS[log.tone]}>[{log.tag}]</span>
                <span className="text-foreground/90">{log.message}</span>
                {index === visibleCount - 1 && visibleCount < LOGS.length && (
                  <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-border px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Processing
              </span>
              <span className="font-mono text-[10px] text-primary">{progress}%</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
