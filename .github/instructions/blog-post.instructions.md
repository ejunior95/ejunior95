---
description: "Use when creating or editing a blog post under content/blog/. Enforces required bilingual frontmatter (title/titleEn, summary/summaryEn, date, tags, slug)."
applyTo: "content/blog/**/*.md"
---

# Blog Post Frontmatter

Posts in [content/blog/](../../content/blog/) are auto-discovered by [src/utils/blogLoader.ts](../../src/utils/blogLoader.ts) via `import.meta.glob`. No registration step is needed — but the frontmatter must be complete.

## Required frontmatter

```yaml
---
title: "<Título em Português>"
titleEn: "<Title in English>"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
summary: "<Resumo em Português>"
summaryEn: "<Summary in English>"
slug: "kebab-case-slug"
---
```

## Rules

1. **All eight fields are required.** Missing `titleEn` or `summaryEn` breaks the EN view of [BlogList](../../src/components/blog/BlogList.tsx).
2. **`slug` must match the filename** (without `.md`). The route is `/blog/:slug`.
3. **`date` is ISO `YYYY-MM-DD`** as a quoted string. Used for sorting (newest first).
4. **`tags` is an array**, lowercase, kebab-case where multi-word.
5. **Bilingual body.** The post body should contain both PT-BR and EN sections; convention is a `## Português (PT-BR)` heading followed by `## English` (see [hello-world.md](../../content/blog/hello-world.md)).
6. **GFM is enabled** (`remark-gfm`) — tables, task lists, strikethrough, autolinks all work.
7. **No registration.** Do not edit `blogLoader.ts` to add the post; the glob picks it up.
