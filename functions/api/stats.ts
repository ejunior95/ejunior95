/**
 * Cloudflare Pages Function: GET /api/stats?period=1d|7d|30d
 *
 * Proxies the Cloudflare GraphQL Analytics API for Web Analytics
 * (RUM) so the API token is never exposed to the browser.
 *
 * Required environment variables (Pages → Settings → Environment Variables):
 *   - CF_API_TOKEN  (Account permission: "Account Analytics: Read")
 *   - CF_ACCOUNT_ID (Cloudflare account tag / id)
 *   - CF_SITE_TAG   (Web Analytics site token, found in Web Analytics → site → "Site Tag")
 */

interface Env {
  CF_API_TOKEN?: string
  CF_ACCOUNT_ID?: string
  CF_SITE_TAG?: string
}

/**
 * Minimal local type for Cloudflare Pages Functions.
 * Avoids requiring `@cloudflare/workers-types` as a dev dependency
 * since this file is not part of the Vite/TS app build.
 */
type PagesFunction<E = unknown> = (context: {
  request: Request
  env: E
  params: Record<string, string | string[]>
  waitUntil: (promise: Promise<unknown>) => void
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>
  data: Record<string, unknown>
}) => Response | Promise<Response>

interface CountryGroup {
  count: number
  sum?: { visits?: number }
  dimensions: { metric?: string }
}

interface TotalsGroup {
  count: number
  sum?: { visits?: number }
  uniq?: { uniques?: number }
}

interface GraphQLResponse {
  data?: {
    viewer?: {
      accounts?: Array<{
        totals?: TotalsGroup[]
        countries?: CountryGroup[]
      }>
    }
  }
  errors?: Array<{ message: string }>
}

const PERIOD_DAYS: Record<string, number> = {
  '1d': 1,
  '7d': 7,
  '30d': 30
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(init.headers || {})
    }
  })
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const periodParam = url.searchParams.get('period') ?? '7d'
  const days = PERIOD_DAYS[periodParam] ?? 7
  const period = (PERIOD_DAYS[periodParam] ? periodParam : '7d') as '1d' | '7d' | '30d'

  if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID || !env.CF_SITE_TAG) {
    // Misconfigured — fail silently with no-store so the client can hide the widget.
    const missing: string[] = []
    if (!env.CF_API_TOKEN) missing.push('CF_API_TOKEN')
    if (!env.CF_ACCOUNT_ID) missing.push('CF_ACCOUNT_ID')
    if (!env.CF_SITE_TAG) missing.push('CF_SITE_TAG')
    return jsonResponse(
      { error: 'analytics_not_configured', missing },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const now = new Date()
  const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  const dateGeq = isoDate(start)
  const dateLeq = isoDate(now)

  const query = `
    query SiteStats($accountTag: String!, $siteTag: String!, $dateGeq: Date!, $dateLeq: Date!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          totals: rumPageloadEventsAdaptiveGroups(
            limit: 1
            filter: { siteTag: $siteTag, date_geq: $dateGeq, date_leq: $dateLeq }
          ) {
            count
            sum { visits }
            uniq { uniques }
          }
          countries: rumPageloadEventsAdaptiveGroups(
            limit: 10
            filter: { siteTag: $siteTag, date_geq: $dateGeq, date_leq: $dateLeq }
            orderBy: [count_DESC]
          ) {
            count
            sum { visits }
            dimensions { metric: countryName }
          }
        }
      }
    }
  `

  const variables = {
    accountTag: env.CF_ACCOUNT_ID,
    siteTag: env.CF_SITE_TAG,
    dateGeq,
    dateLeq
  }

  let gql: GraphQLResponse
  try {
    const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })

    if (!res.ok) {
      let bodySnippet = ''
      try {
        const text = await res.text()
        bodySnippet = text.slice(0, 200)
      } catch {
        // ignore body read errors
      }
      return jsonResponse(
        {
          error: `upstream_${res.status}`,
          statusText: res.statusText,
          bodySnippet
        },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    gql = (await res.json()) as GraphQLResponse
  } catch {
    return jsonResponse(
      { error: 'upstream_fetch_failed' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  if (gql.errors && gql.errors.length > 0) {
    return jsonResponse(
      { error: 'graphql_error', detail: gql.errors[0].message },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const account = gql.data?.viewer?.accounts?.[0]
  const totals = account?.totals?.[0]
  const countries = account?.countries ?? []

  const pageViews = totals?.count ?? 0
  const visitors = totals?.uniq?.uniques ?? totals?.sum?.visits ?? 0

  const countryTotal = countries.reduce((acc, c) => acc + (c.count ?? 0), 0) || pageViews || 1
  const topCountries = countries
    .filter(c => !!c.dimensions?.metric)
    .slice(0, 5)
    .map(c => ({
      name: c.dimensions.metric ?? 'Unknown',
      count: c.count ?? 0,
      pct: Math.round(((c.count ?? 0) / countryTotal) * 100)
    }))

  return jsonResponse(
    {
      period,
      dateGeq,
      dateLeq,
      visitors,
      pageViews,
      topCountries
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    }
  )
}
