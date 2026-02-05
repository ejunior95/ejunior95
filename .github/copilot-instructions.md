# AI Coding Agent Instructions

## Project Overview
Personal portfolio website for Edvaldo Junior (ejunior95) - A React 19 + TypeScript + Vite SPA showcasing professional experience, skills, projects, and education. The site features bilingual support (EN/PT-BR) and a dark-themed developer aesthetic.

## Architecture & Structure

### Component Organization
- All components are in `src/components/` with co-located CSS files (`Component.tsx` + `Component.css`)
- Each component is self-contained and receives props from `App.tsx`
- Components export a default function, never named exports
- Global state managed through React Context (`src/contexts/`)

### Internationalization Pattern
- All user-facing text comes from `src/i18n/translations.ts` - never hardcode strings
- Two-language structure: `translations[language].section.key`
- Use the `useLanguage()` hook to access current language and translations:
  ```tsx
  const { language } = useLanguage()
  const t = translations[language]
  ```
- Language toggle managed by `LanguageContext` - defaults to English

### Data Flow Architecture
1. `main.tsx` wraps app in `LanguageProvider`
2. `App.tsx` acts as the data controller - it:
   - Constructs all data arrays (experiences, projects, certifications, etc.)
   - Translates content using `translations[language]`
   - Passes data down to presentational components
3. Components are purely presentational - they receive fully translated props

**Important**: When adding new sections, define data structure in `App.tsx`, not in components.

## Development Workflows

### Build & Run
```bash
npm run dev      # Start dev server (Vite)
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

### Adding New Content

**New Section Component**:
1. Create `src/components/NewSection.tsx` and `NewSection.css`
2. Add translation keys to `src/i18n/translations.ts` for both `en` and `pt`
3. Build data array in `App.tsx` using translated strings
4. Import and render in `App.tsx` with smooth scroll support
5. Add navigation link in `Header.tsx`

**Smooth Scroll Integration**:
All internal navigation uses `handleNavClick` from `App.tsx`:
```tsx
<a href="#section" onClick={(e) => handleNavClick(e, 'section')}>
```

## Code Conventions

### TypeScript Patterns
- Use `interface` for props, not `type` (e.g., `interface HeaderProps`)
- React 19 types: `import type { ReactNode } from 'react'`
- Strict mode enabled - no implicit `any`

### Component Structure
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'
import './ComponentName.css'

interface ComponentProps {
  data: DataType[]
}

function ComponentName({ data }: ComponentProps) {
  const { language } = useLanguage()
  const t = translations[language].section
  
  return (
    <section id="section-id" className="section">
      {/* Component content */}
    </section>
  )
}

export default ComponentName
```

### CSS Styling
- Dark theme with neon green accent (`#B4FF39`)
- Consistent section padding and spacing
- Code-aesthetic with brackets, comments, and terminal-style elements
- Responsive design with mobile breakpoints
- Each component styles its own elements - no global component styles

## Key Files

- [src/App.tsx](src/App.tsx) - Main data orchestration and routing
- [src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx) - Language state management
- [src/i18n/translations.ts](src/i18n/translations.ts) - All translatable content
- [src/components/Header.tsx](src/components/Header.tsx) - Navigation pattern reference
- [package.json](package.json) - React 19, Vite 7, TypeScript 5.9

## Common Pitfalls to Avoid

1. **Never hardcode user-facing strings** - always use translation keys
2. **Don't manage data in components** - components receive props from `App.tsx`
3. **Always provide both EN and PT translations** when adding content
4. **Use React 19 syntax** - no legacy patterns (e.g., `React.FC` is deprecated)
5. **Import order**: contexts → translations → styles
