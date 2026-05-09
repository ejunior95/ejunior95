---
description: "Use when writing or editing CSS. Enforces the dark retro theme: accent #09ec42, color palette, responsive breakpoints, and code-aesthetic patterns."
applyTo: "src/**/*.css"
---

# CSS & Theme Conventions

The site's aesthetic is a dark retro developer terminal. Every CSS change must respect the palette and breakpoints below.

## Color palette (do not improvise)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Page background |
| Black | `#000` | Container backgrounds |
| Dark Gray | `#1a1a1a` | Borders |
| Gray | `#a2a2a2` | Secondary text, comments |
| **Neon Green (accent)** | **`#09ec42`** | Highlights, hover, links, tags |
| White | `#fff` | Primary text |

**The accent is `#09ec42` — not `#00ff00`, not `#0f0`, not `#b4ff39`.** The README badges use a different green; ignore them.

### Hero code-block syntax colors only

Pink `#ff79c6` · Green `#09ec42` · Cyan `#8be9fd` · Yellow `#f1fa8c` · Purple `#bd93f9` · Comment `#a2a2a2`. Use only inside `Hero` syntax-highlight spans.

## Responsive breakpoints (5 levels)

```css
@media (min-width: 1400px) { /* max-width: 1600px wrapper */ }
@media (max-width: 1200px) { /* notebook/tablet */ }
@media (max-width: 1024px) { /* tablet */ }
@media (max-width: 768px)  { /* mobile large — single column */ }
@media (max-width: 480px)  { /* mobile small — compact */ }
```

Use these exact thresholds. Do not introduce new breakpoints without justification.

## Patterns

- **Font:** "Press Start 2P" (already imported globally in [src/index.css](../../src/index.css)) — do not re-import.
- **Hover affordance:** green border (`#09ec42`) + `transform: translateY(-2px)`.
- **Section reveal:** classes `scroll-visible` / `scroll-hidden` are toggled by [useScrollReveal](../../src/hooks/useScrollReveal.ts). The base CSS for them lives in [src/index.css](../../src/index.css) — do not redefine per component.
- **Component-scoped styles only.** No global selectors (`button`, `a`, …) in component CSS files; put those in [src/index.css](../../src/index.css) or [src/App.css](../../src/App.css).
- **Code aesthetic** — brackets, `//` comments, `< />`, `( )` are first-class UI elements. Style them with the gray or accent color, never with default text color.

## Anti-patterns

- ❌ Using a different green (`#00ff00`, `#b4ff39`) "because it looked the same"
- ❌ New breakpoints like `900px` or `600px`
- ❌ Hardcoded font-family overrides — keep "Press Start 2P"
- ❌ Inline styles for theme colors — always CSS classes
