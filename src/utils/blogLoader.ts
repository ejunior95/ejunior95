export interface BlogPost {
  slug: string
  title: string
  titleEn: string
  date: string
  tags: string[]
  summary: string
  summaryEn: string
  content: string
}

function parseFrontmatter(raw: string): { metadata: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { metadata: {}, content: raw }

  const frontmatter = match[1]
  const content = match[2]
  const metadata: Record<string, string | string[]> = {}

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()

    // Handle arrays like ["tag1", "tag2"]
    if (value.startsWith('[') && value.endsWith(']')) {
      metadata[key] = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      // Remove surrounding quotes
      metadata[key] = value.replace(/^["']|["']$/g, '')
    }
  }

  return { metadata, content }
}

const modules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const { metadata, content } = parseFrontmatter(raw as string)
    const slug = (metadata.slug as string) || path.split('/').pop()?.replace('.md', '') || ''

    posts.push({
      slug,
      title: (metadata.title as string) || '',
      titleEn: (metadata.titleEn as string) || (metadata.title as string) || '',
      date: (metadata.date as string) || '',
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      summary: (metadata.summary as string) || '',
      summaryEn: (metadata.summaryEn as string) || (metadata.summary as string) || '',
      content,
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(p => p.slug === slug)
}
