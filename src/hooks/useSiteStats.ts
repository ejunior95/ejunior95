import { useEffect, useState } from 'react'

export type StatsPeriod = '1d' | '7d' | '30d'

export interface SiteStats {
  period: StatsPeriod
  visitors: number
  pageViews: number
  topCountries: Array<{ name: string; count: number; pct: number }>
}

interface UseSiteStatsResult {
  data: SiteStats | null
  loading: boolean
  error: boolean
}

const CACHE_TTL = 60 * 60 * 1000 // 1 hour
const cacheKey = (period: StatsPeriod) => `site-stats:${period}`

interface CacheEntry {
  data: SiteStats
  timestamp: number
}

function getCached(period: StatsPeriod): SiteStats | null {
  try {
    const raw = localStorage.getItem(cacheKey(period))
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(cacheKey(period))
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

function setCached(period: StatsPeriod, data: SiteStats) {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() }
    localStorage.setItem(cacheKey(period), JSON.stringify(entry))
  } catch {
    // ignore quota / private mode errors
  }
}

export function useSiteStats(period: StatsPeriod): UseSiteStatsResult {
  const [data, setData] = useState<SiteStats | null>(() => getCached(period))
  const [loading, setLoading] = useState<boolean>(() => getCached(period) === null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cached = getCached(period)
    if (cached) {
      queueMicrotask(() => {
        setData(cached)
        setLoading(false)
        setError(false)
      })
      return
    }

    queueMicrotask(() => {
      setLoading(true)
      setError(false)
    })
    const controller = new AbortController()

    fetch(`/api/stats?period=${period}`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json: SiteStats & { error?: string }) => {
        if (json.error) {
          setError(true)
          setData(null)
          setLoading(false)
          return
        }
        const normalized: SiteStats = {
          period,
          visitors: json.visitors ?? 0,
          pageViews: json.pageViews ?? 0,
          topCountries: json.topCountries ?? []
        }
        setCached(period, normalized)
        setData(normalized)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(true)
        setLoading(false)
      })

    return () => controller.abort()
  }, [period])

  return { data, loading, error }
}
