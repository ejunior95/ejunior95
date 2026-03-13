# AI Coding Agent Instructions

## Project Overview
Personal portfolio website for Edvaldo Junior (ejunior95) — A React 19 + TypeScript + Vite 7 SPA showcasing professional experience, skills, projects, and education. The site features bilingual support (EN/PT-BR), a dark-themed retro developer aesthetic with the "Press Start 2P" pixel font, and a full-screen video background.

- **Live URL**: https://ejunior95.com
- **Version**: 1.1.1
- **License**: MIT

## Architecture & Structure

### Component Organization
- All components are in `src/components/` with co-located CSS files (`Component.tsx` + `Component.css`)
- Components export a default function (e.g., `export default ComponentName`)
- Global state managed through React Context (`src/contexts/`)

**Components receiving props from App.tsx** (data-driven):
- `Header` — receives `onNavClick` handler
- `Skills` — receives `skills` array
- `Experience` — receives `experiences` array
- `Education` — receives `education` array

**Self-contained components** (use context internally, no props):
- `Hero`, `StatsInfo`, `Projects`, `Certifications`, `Contact`, `Footer`, `VideoBackground`, `AsciiDonut`

### Full Component List (12 total)
| Component | Section ID | Props | Purpose |
|-----------|-----------|-------|---------|
| Header | — | `onNavClick` | Fixed navigation, language toggle, mobile hamburger |
| VideoBackground | — | none | Full-screen looping bg-grid.mp4 backdrop |
| Hero | `#about` | none | Bio, tech stack icons, code block, AsciiDonut |
| AsciiDonut | — | none | 3D rotating ASCII torus animation (~33 FPS) |
| StatsInfo | — | none | Key metrics (experience, projects, level, location) |
| Skills | `#skills` | `skills` | 6 skill categories in 3-column grid |
| Experience | `#experience` | `experiences` | 7 jobs in vertical timeline |
| Projects | `#projects` | none | 3 project cards with CRT monitor aesthetic |
| Education | `#education` | `education` | Education cards |
| Certifications | — | none | Google Coding + EF SET certs |
| Contact | `#contact` | none | Email, phone, LinkedIn, location |
| Footer | — | none | Copyright line |

### Internationalization Pattern
- All user-facing text comes from `src/i18n/translations.ts` — never hardcode strings
- Two-language structure: `translations[language].section.key`
- Translation key groups: `header`, `hero`, `stats`, `skills`, `experience`, `projects`, `education`, `certifications`, `contact` (~60 keys per language)
- Use the `useLanguage()` hook to access current language:
  ```tsx
  const { language } = useLanguage()
  const t = translations[language]
  ```
- Language toggle managed by `LanguageContext` — defaults to English (`'en'`)
- Type: `type Language = 'en' | 'pt'`

### Data Flow Architecture
1. `main.tsx` wraps `AppContent` in `LanguageProvider` + `StrictMode`
2. `App.tsx` exports `AppContent` (not a default `App`) and acts as the data controller:
   - Constructs data arrays for experiences (7), skills (6 categories), and education (2)
   - Translates content using `translations[language]`
   - Provides `handleNavClick(e, targetId)` for smooth scroll navigation
   - Provides `calculateDuration(startMonth, startYear, endMonth?, endYear?, lang?)` for tenure calculation
   - Passes data down to presentational components
3. Some components (Projects, Certifications, Contact, StatsInfo) manage their own data internally using context

**Important**: When adding new props-driven sections, define data structure in `App.tsx`. Self-contained sections that only need translations can use context directly.

### Rendering Order in App.tsx
```
VideoBackground → Header → Hero → StatsInfo → Skills → Experience → Projects → Education → Certifications → Contact → Footer
```

## Development Workflows

### Build & Run
```bash
npm run dev      # Start Vite dev server
npm run build    # tsc -b + vite build
npm run lint     # ESLint check
npm run preview  # Preview production build (localhost:4173)
```

### Adding New Content

**New Section Component**:
1. Create `src/components/NewSection.tsx` and `NewSection.css`
2. Add translation keys to `src/i18n/translations.ts` for both `en` and `pt`
3. If data-driven: build data array in `App.tsx` and pass as props
4. If self-contained: use `useLanguage()` context directly in component
5. Import and render in `App.tsx` in the correct position
6. Add navigation link in `Header.tsx` (if navigable)
7. Add section ID for smooth scroll support

**Smooth Scroll Integration**:
All internal navigation uses `handleNavClick` from `App.tsx`:
```tsx
<a href="#section" onClick={(e) => handleNavClick(e, 'section')}>
```

## Code Conventions

### TypeScript Patterns
- Use `interface` for props, not `type` (e.g., `interface HeaderProps`)
- React 19 types: `import type { ReactNode } from 'react'`
- Strict mode enabled — `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Target: ES2022, module: ESNext, verbatimModuleSyntax enabled

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

### Icon Libraries
Three icon libraries are used — pick consistently:
- **lucide-react**: UI icons — `Clock`, `MapPin`, `Mail`, `Phone`, `Linkedin`, `ExternalLink`, `ScrollText`, `Globe`
- **react-icons**: Tech brand icons — `SiJavascript`, `SiTypescript`, `SiReact`, `SiAngular`, `SiDocker`, `SiKubernetes`
- **@radix-ui/react-icons**: Available but not heavily used currently

### CSS Styling & Theme

**Color Palette**:
| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Page background |
| Black | `#000` | Container backgrounds |
| Dark Gray | `#1a1a1a` | Borders |
| Gray | `#a2a2a2` | Secondary text, comments |
| Neon Green | `#09ec42` | Primary accent — highlights, hover, links, tags |
| White | `#fff` | Primary text |

**Code Block Syntax Colors** (Hero section):
- Comments: `#a2a2a2` | Keywords: `#ff79c6` (pink) | Variables: `#09ec42` (green)
- Properties: `#8be9fd` (cyan) | Strings: `#f1fa8c` (yellow) | Numbers: `#bd93f9` (purple)

**Responsive Breakpoints** (5 levels):
- `1400px+` — max-width 1600px
- `1200px` — Notebook/tablet (reduced padding)
- `1024px` — Tablet adjustments
- `768px` — Mobile large (single column layouts)
- `480px` — Mobile small (compact spacing)

**Design Patterns**:
- Code-aesthetic UI: brackets `{ }`, comments `//`, angle brackets `< />`, parens `( )`
- CRT monitor-styled project previews
- Retro "Press Start 2P" pixel font (Google Fonts)
- Each component styles its own elements — no global component styles
- Hover effects: green border highlights, `translateY(-2px)` lifts

## Key Files

- [src/App.tsx](src/App.tsx) — Main data orchestration, `AppContent` export, `handleNavClick`, `calculateDuration`
- [src/main.tsx](src/main.tsx) — Entry point, wraps in `LanguageProvider` + `StrictMode`
- [src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx) — Language state (`'en' | 'pt'`), `useLanguage()` hook, `toggleLanguage()`
- [src/i18n/translations.ts](src/i18n/translations.ts) — All translatable content (~120 keys total)
- [src/components/Header.tsx](src/components/Header.tsx) — Navigation pattern reference (desktop + mobile hamburger)
- [src/index.css](src/index.css) — Global styles, font import, root color scheme
- [src/App.css](src/App.css) — Main layout, responsive breakpoints
- [package.json](package.json) — React 19.2, Vite 7.2, TypeScript 5.9

## Dependencies

### Core
- `react` / `react-dom` ^19.2.0
- `lucide-react` ^0.563.0
- `react-icons` ^5.5.0
- `@radix-ui/react-icons` ^1.3.2
- `@radix-ui/themes` ^3.3.0

### Dev
- `typescript` ~5.9.3
- `vite` 7.2.4
- `@vitejs/plugin-react` 5.1.1
- `eslint` 9.39.1

## Common Pitfalls to Avoid

1. **Never hardcode user-facing strings** — always use translation keys
2. **Always provide both EN and PT translations** when adding content
3. **Use React 19 syntax** — no legacy patterns (e.g., `React.FC` is deprecated)
4. **Import order**: contexts → translations → styles
5. **Accent color is `#09ec42`** (neon green) — not any other green
6. **App exports `AppContent`** as a named function, not `export default App`
7. **Not all components receive props** — check the component table above before assuming data flow
8. **Section titles use code-aesthetic brackets** — each section has its own style (e.g., `{ skills }`, `[ experience ]`, `@ projects`, `< education />`, `/* certifications */`, `( contact )`)
