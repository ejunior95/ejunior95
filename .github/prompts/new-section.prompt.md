---
description: "Scaffold a new portfolio section component (.tsx + .css), wire it into App.tsx, and add EN+PT translation keys following the codebase conventions."
argument-hint: "Section name (e.g. Awards, Talks, OpenSource)"
agent: "agent"
---

# New Section Scaffolder

Create a new portfolio section component end-to-end. The user-supplied argument is the section name in PascalCase (e.g. `Awards`).

Follow the rules in [component-pattern.instructions.md](../instructions/component-pattern.instructions.md), [i18n.instructions.md](../instructions/i18n.instructions.md), and [css-theme.instructions.md](../instructions/css-theme.instructions.md). Use [Skills.tsx](../../src/components/Skills.tsx) and [Skills.css](../../src/components/Skills.css) as the canonical reference.

## Inputs to confirm with the user (only if not obvious)

1. **Section name** (PascalCase, e.g. `Awards`) — used for the file, component, and `id`.
2. **Bracket style** for the section title — pick one **not already used** by another section. Existing styles are: `{ skills }`, `[ experience ]`, `@ projects`, `< education />`, `/* certifications */`, `// achievements`, `( contact )`. Suggest one of: `# name`, `~ name ~`, `$ name`, `* name *`.
3. **Data-driven or self-contained?**
   - Data-driven → component receives a typed prop array; build the array in [App.tsx](../../src/App.tsx).
   - Self-contained → component reads only from `translations[language].<section>`; no props.
4. **Render position** in [App.tsx](../../src/App.tsx) — confirm where it slots into the existing order: `Hero → StatsInfo → Skills → Experience → Projects → GitHubProjects → Education → Certifications → Achievements → Contact`.
5. **Add to nav?** If yes, add a link in [Header.tsx](../../src/components/Header.tsx) using `handleNavClick(e, '<section-id>')`.

If the user gives only a name, infer reasonable defaults (self-contained, last position before `Contact`, no nav entry) and proceed — list the assumptions in your final summary.

## Steps

1. **Create [src/components/`<Name>`.tsx](../../src/components/)** following the template in [component-pattern.instructions.md](../instructions/component-pattern.instructions.md):
   - Imports order: contexts → translations → hooks → icons → styles
   - `useLanguage()` + `useScrollReveal<HTMLElement>()`
   - Section element with `id="<kebab-case>"`, `className={`section ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}`, `ref={ref}`
   - `<h2 className="section-title">` with the chosen bracket style
   - Default export

2. **Create [src/components/`<Name>`.css](../../src/components/)** with component-scoped styles only:
   - Use the palette: bg `#0a0a0a`, border `#1a1a1a`, accent `#09ec42`, secondary text `#a2a2a2`
   - Hover affordance: green border + `transform: translateY(-2px)`
   - Respect the 5 breakpoints (1400 / 1200 / 1024 / 768 / 480)
   - Do **not** redefine `.scroll-visible` / `.scroll-hidden` (already in [src/index.css](../../src/index.css))

3. **Add translation keys** to [src/i18n/translations.ts](../../src/i18n/translations.ts) — both `en.<section>` and `pt.<section>`, mirrored shape. At minimum: `title`. Add any item-level keys the component renders.

4. **Wire into [src/App.tsx](../../src/App.tsx):**
   - Import the component
   - Render at the agreed position
   - If data-driven: build the typed array using `t.<section>.*` keys and pass as a prop

5. **Optionally update [src/components/Header.tsx](../../src/components/Header.tsx)** with a nav link if the user requested it.

6. **Update the component table** in [.github/copilot-instructions.md](../copilot-instructions.md) (rows: Component, Section ID, Props, Purpose) and bump the total component count if mentioned.

## Validation

After scaffolding:
- Run `npm run lint` and fix any issues.
- Run `npm run build` to confirm TypeScript passes (catches missing PT keys).
- Do **not** start the dev server unless the user asks.

## Output

End with a short summary listing:
- Files created/modified (as workspace-relative markdown links)
- Assumptions made (bracket style, position, data-driven vs self-contained, nav inclusion)
- Any follow-ups left for the user (e.g., real content for placeholder translation values)
