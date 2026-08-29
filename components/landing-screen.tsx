'use client'

import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Radar, Search, TrendingUp, Zap } from 'lucide-react'
import { searchSuggestions, trendingSearches } from '@/lib/mock-data'

type LandingScreenProps = {
  onAnalyze: (query: string) => void
}

export function LandingScreen({ onAnalyze }: LandingScreenProps) {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Filter the mocked "live API" pool in real-time, case-insensitively.
  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase()
    if (!q) return []
    return searchSuggestions.filter((topic) => topic.toLowerCase().includes(q)).slice(0, 6)
  }, [value])

  const showDropdown = isOpen && suggestions.length > 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onAnalyze(trimmed)
  }

  function handleTrendingClick(tag: string) {
    // Fill the input for visual feedback, then immediately run the engine.
    setValue(tag)
    onAnalyze(tag)
  }

  function handleSuggestionClick(topic: string) {
    // Cancel the pending blur close, fill the bar, and run the engine instantly.
    if (blurTimeout.current) clearTimeout(blurTimeout.current)
    setIsOpen(false)
    setValue(topic)
    onAnalyze(topic)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <Radar className="h-8 w-8" aria-hidden="true" />
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          SENTINEL<span className="text-primary">-AI</span>
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Social Intelligence Command Center
        </p>
        <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Analyze real-time sentiment, audience demographics, and influence networks for any topic
          across the social web.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 w-full">
          <div className="group relative">
            <Search
              className="pointer-events-none absolute left-4 top-[26px] h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
            <label htmlFor="topic-search" className="sr-only">
              Enter topic, hashtag, or keyword to analyze
            </label>
            <input
              id="topic-search"
              type="text"
              role="combobox"
              aria-expanded={showDropdown}
              aria-autocomplete="list"
              aria-controls="topic-suggestions"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => {
                // Delay so a suggestion click registers before the list closes.
                blurTimeout.current = setTimeout(() => setIsOpen(false), 150)
              }}
              placeholder="Enter topic, hashtag, or keyword to analyze (e.g., #TechPolicy2026)"
              className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 text-sm text-foreground shadow-lg outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />

            {showDropdown && (
              <ul
                id="topic-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border bg-card py-1.5 text-left shadow-2xl"
              >
                {suggestions.map((topic) => (
                  <li key={topic} role="option" aria-selected={false}>
                    <button
                      type="button"
                      // onMouseDown fires before input blur, keeping the value intact.
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleSuggestionClick(topic)
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <Search
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate">{topic}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <p className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary" aria-hidden="true" />
              Trending Searches
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {trendingSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTrendingClick(tag)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-xs font-medium text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <span className="text-primary/60 transition-colors group-hover:text-primary">
                    {'>'}
                  </span>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!value.trim()}
            className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_oklch(0.78_0.15_195_/_0.6)] transition-all hover:shadow-[0_0_36px_-2px_oklch(0.78_0.15_195_/_0.8)] hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <Zap className="h-4 w-4" aria-hidden="true" />
            Run SENTINEL-AI Engine
          </button>
        </form>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Prototype · Mocked data engine
        </p>
      </div>
    </div>
  )
}
