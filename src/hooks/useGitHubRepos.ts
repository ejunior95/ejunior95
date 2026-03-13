import { useEffect, useState } from 'react'

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  updated_at: string
}

interface UseGitHubReposResult {
  repos: GitHubRepo[]
  loading: boolean
  error: boolean
}

const CACHE_KEY = 'github-repos-cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour
const EXCLUDED_REPOS = ['easychat-landing-page', 'easy-chat', 'discordia', 'formai']

interface CacheEntry {
  data: GitHubRepo[]
  timestamp: number
}

function getCachedRepos(): GitHubRepo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache: CacheEntry = JSON.parse(raw)
    if (Date.now() - cache.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return cache.data
  } catch {
    return null
  }
}

function setCachedRepos(data: GitHubRepo[]) {
  const entry: CacheEntry = { data, timestamp: Date.now() }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // localStorage full or unavailable — ignore
  }
}

export function useGitHubRepos(username: string): UseGitHubReposResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cached = getCachedRepos()
    if (cached) {
      // Use microtask to avoid synchronous setState in effect
      queueMicrotask(() => {
        setRepos(cached)
        setLoading(false)
      })
      return
    }

    const controller = new AbortController()

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github.mercy-preview+json' }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: GitHubRepo[]) => {
        const filtered = data.filter(
          repo => repo.topics?.includes('portfolio') &&
            !EXCLUDED_REPOS.includes(repo.name.toLowerCase())
        )
        setCachedRepos(filtered)
        setRepos(filtered)
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(true)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [username])

  return { repos, loading, error }
}
