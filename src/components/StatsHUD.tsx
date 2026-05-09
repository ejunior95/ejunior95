import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import { useSiteStats, type StatsPeriod } from '../hooks/useSiteStats'
import { countryFlag, countryNameToCode } from '../utils/countryFlag'
import './StatsHUD.css'

const COLLAPSED_KEY = 'stats-hud-collapsed'
const PERIOD_KEY = 'stats-hud-period'
const PERIODS: StatsPeriod[] = ['1d', '7d', '30d']

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

function StatsHUD() {
  const { language } = useLanguage()
  const t = translations[language].liveStats

  const [period, setPeriod] = useState<StatsPeriod>(() => {
    try {
      const saved = localStorage.getItem(PERIOD_KEY) as StatsPeriod | null
      return saved && PERIODS.includes(saved) ? saved : '7d'
    } catch {
      return '7d'
    }
  })

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(COLLAPSED_KEY)
      if (saved !== null) return saved === '1'
      // default: collapsed on small screens
      return typeof window !== 'undefined' && window.innerWidth <= 768
    } catch {
      return false
    }
  })

  useEffect(() => {
    try { localStorage.setItem(PERIOD_KEY, period) } catch { /* ignore */ }
  }, [period])

  useEffect(() => {
    try { localStorage.setItem(COLLAPSED_KEY, collapsed ? '1' : '0') } catch { /* ignore */ }
  }, [collapsed])

  const { data, loading, error } = useSiteStats(period)

  // Fail silently — no widget if API is unavailable / not configured
  if (error || (!loading && !data)) return null

  const periodLabels: Record<StatsPeriod, string> = {
    '1d': t.period24h,
    '7d': t.period7d,
    '30d': t.period30d
  }

  if (collapsed) {
    return (
      <button
        type="button"
        className="stats-hud-chip"
        onClick={() => setCollapsed(false)}
        aria-label={t.expandLabel}
        title={t.expandLabel}
      >
        <span className="stats-hud-led" aria-hidden="true" />
        [ {t.collapsedLabel} ]
      </button>
    )
  }

  return (
    <aside className="stats-hud" role="complementary" aria-label={t.title}>
      <header className="stats-hud-header">
        <span className="stats-hud-led" aria-hidden="true" />
        <span className="stats-hud-title">[ {t.title} ]</span>
        <button
          type="button"
          className="stats-hud-min"
          onClick={() => setCollapsed(true)}
          aria-label={t.minimizeLabel}
          title={t.minimizeLabel}
        >
          _
        </button>
      </header>

      <div className="stats-hud-tabs" role="tablist">
        {PERIODS.map(p => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={period === p}
            className={`stats-hud-tab${period === p ? ' is-active' : ''}`}
            onClick={() => setPeriod(p)}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      <div className="stats-hud-body">
        <div className="stats-hud-row">
          <span className="stats-hud-key">&gt; {t.visitors}:</span>
          <span className="stats-hud-val">
            {loading ? <span className="stats-hud-skeleton" /> : formatNumber(data?.visitors ?? 0)}
          </span>
        </div>
        <div className="stats-hud-row">
          <span className="stats-hud-key">&gt; {t.views}:</span>
          <span className="stats-hud-val">
            {loading ? <span className="stats-hud-skeleton" /> : formatNumber(data?.pageViews ?? 0)}
          </span>
        </div>

        <div className="stats-hud-countries-label">{t.topCountries}:</div>
        <ul className="stats-hud-countries">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="stats-hud-country">
              <span className="stats-hud-skeleton stats-hud-skeleton-line" />
            </li>
          ))}
          {!loading && (data?.topCountries ?? []).slice(0, 5).map(c => {
            const code = countryNameToCode(c.name) || '??'
            return (
              <li key={c.name} className="stats-hud-country">
                <span className="stats-hud-flag" aria-hidden="true">{countryFlag(c.name)}</span>
                <span className="stats-hud-code">{code}</span>
                <span className="stats-hud-bar" aria-hidden="true">
                  <span className="stats-hud-bar-fill" style={{ width: `${Math.min(100, Math.max(2, c.pct))}%` }} />
                </span>
                <span className="stats-hud-pct">{c.pct}%</span>
              </li>
            )
          })}
          {!loading && (data?.topCountries.length ?? 0) === 0 && (
            <li className="stats-hud-country stats-hud-empty">—</li>
          )}
        </ul>
      </div>
    </aside>
  )
}

export default StatsHUD
