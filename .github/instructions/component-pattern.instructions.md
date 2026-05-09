---
description: "Use when creating a new section/component under src/components/. Enforces the standard template: useLanguage, useScrollReveal, co-located CSS, default export, code-aesthetic title brackets."
applyTo: "src/components/**/*.tsx"
---

# Component Pattern

All section components follow a single template. See [Skills.tsx](../../src/components/Skills.tsx) as the canonical reference.

## Required structure

```tsx
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ComponentName.css'

interface ComponentNameProps {
  // only if data-driven; otherwise omit
}

function ComponentName(/* props */) {
  const { language } = useLanguage()
  const t = translations[language].componentName
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section
      id="section-id"
      className={`section ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
      ref={ref}
    >
      <h2 className="section-title">
        <span className="code-bracket">{"{"}</span> {t.title} <span className="code-bracket">{"}"}</span>
      </h2>
      {/* ... */}
    </section>
  )
}

export default ComponentName
```

## Rules

1. **Default export**, named function — `export default ComponentName`. No `React.FC`, no arrow-function default exports.
2. **Co-located CSS.** `Foo.tsx` ↔ `Foo.css` in the same folder. No global component styles.
3. **Use `useScrollReveal`** for entrance animations on every visible section.
4. **Use `useLanguage()` + `translations`** — never hardcode strings (see [i18n.instructions.md](./i18n.instructions.md)).
5. **Section title uses code-aesthetic brackets.** Each section picks its own bracket style — `{ skills }`, `[ experience ]`, `@ projects`, `< education />`, `/* certifications */`, `// achievements`, `( contact )`. Do not reuse another section's bracket style.
6. **Data-driven vs self-contained:** if the component needs structured data (dates, computed durations), build the array in [App.tsx](../../src/App.tsx) and pass as props. If it only needs translations, consume context directly.
7. **Import order:** contexts → translations → hooks → icons → styles.
8. **Wire-up checklist** when adding a new section:
   - [ ] Add `<ComponentName />` in [App.tsx](../../src/App.tsx) at the correct render position
   - [ ] Add EN+PT translation keys under `t.componentName`
   - [ ] Add nav link in [Header.tsx](../../src/components/Header.tsx) if the section is navigable
   - [ ] Section has a unique `id` for smooth-scroll
   - [ ] Update the component table in [.github/copilot-instructions.md](../copilot-instructions.md)

## Icon libraries

Pick one consistently per use:
- **lucide-react** — UI icons (`Clock`, `Mail`, `ExternalLink`, …)
- **react-icons** — tech brand icons (`SiTypescript`, `SiReact`, …)
- **@radix-ui/react-icons** — available, currently rare
