---
description: "Scaffold a new bilingual blog post under content/blog/ with valid frontmatter (title/titleEn, summary/summaryEn, date, tags, slug) and PT-BR + EN body sections."
argument-hint: "Post slug in kebab-case (e.g. why-typescript-everywhere)"
agent: "agent"
---

# New Blog Post Scaffolder

Create a new blog post in [content/blog/](../../content/blog/). Posts are auto-discovered by [src/utils/blogLoader.ts](../../src/utils/blogLoader.ts) — no registration step needed.

Follow [blog-post.instructions.md](../instructions/blog-post.instructions.md) strictly. Use [hello-world.md](../../content/blog/hello-world.md) as the canonical reference.

## Inputs

The argument is the **slug** in kebab-case (e.g. `why-typescript-everywhere`). It will be used as both the filename (`<slug>.md`) and the `slug` frontmatter field.

Confirm with the user (only if missing):

1. **`title`** — Portuguese (PT-BR) title
2. **`titleEn`** — English title
3. **`tags`** — array of lowercase, kebab-case tags (e.g. `["typescript", "react", "ai"]`)
4. **`summary`** — 1–2 sentence Portuguese summary
5. **`summaryEn`** — 1–2 sentence English summary
6. **`date`** — default to today (`YYYY-MM-DD`); ask only if user wants a different date

If the user only gives a slug, draft reasonable placeholder values for title/summary based on the slug, mark them as TODO, and list them in the final summary.

## Steps

1. **Pre-flight checks:**
   - Slug is kebab-case: lowercase letters, digits, and hyphens only.
   - File [content/blog/`<slug>`.md](../../content/blog/) does **not** already exist. If it does, stop and tell the user.

2. **Create the file** at `content/blog/<slug>.md` with this exact frontmatter shape:

   ```yaml
   ---
   title: "<PT-BR title>"
   titleEn: "<English title>"
   date: "YYYY-MM-DD"
   tags: ["tag1", "tag2"]
   summary: "<PT-BR summary>"
   summaryEn: "<English summary>"
   slug: "<slug>"
   ---
   ```

3. **Body template** (bilingual, mirroring [hello-world.md](../../content/blog/hello-world.md)):

   ```markdown
   ## Português (PT-BR)

   <PT-BR intro paragraph — placeholder if user did not provide content>

   ## English

   <English intro paragraph — placeholder if user did not provide content>
   ```

   GFM is enabled (`remark-gfm`) — tables, task lists, strikethrough, autolinks all work. Use them where helpful.

## Rules (do not violate)

- All eight frontmatter fields are required. Do not omit `titleEn` or `summaryEn` "to fill in later".
- `slug` value must equal the filename (without `.md`).
- `date` is a quoted ISO string `"YYYY-MM-DD"`.
- `tags` is a YAML array.
- Do **not** modify [blogLoader.ts](../../src/utils/blogLoader.ts) — the glob picks up the new file automatically.
- Do **not** add the post to any index/list — [BlogList](../../src/components/blog/BlogList.tsx) reads from the loader.

## Output

End with a short summary listing:
- The file created (workspace-relative markdown link)
- The frontmatter values used
- Any placeholder content the user should replace before publishing
- Reminder: run `npm run dev` and open `/blog/<slug>` to preview
