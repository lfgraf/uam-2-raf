We have been doing good work. Right now, we need to focus on the design because we're kind of opinionated, and I want to make sure that you change things globally but we adapt and we iterate. I was thinking about a toggle team to evaluate different theme modes because the ways tokens are prepared right now, I don't think they're accurate. We need to improve there, and also run a general check in to the old experience as a UX, okay?

---

## Design System Checklist

### 🎨 Theme System

- [ ] Review and improve theme toggle implementation
- [ ] Evaluate different theme modes (light/dark and potential variants)
- [ ] Ensure theme consistency across all pages and components
- [ ] Test dark mode with all UI states (hover, active, disabled, etc.)

### 🎯 Tokens Review & Accuracy

- [ ] Audit `tokens.ts` for accuracy
  - [ ] Color system (grays, brand colors, semantic colors)
  - [ ] Font sizes and responsive scaling
  - [ ] Spacing system (xs, sm, md, lg, xl)
  - [ ] Border radius values
  - [ ] Line heights
- [ ] Ensure tokens align with design vision
- [ ] Check if any tokens are unused or redundant
- [ ] Verify tokens are being applied consistently

### ✍️ Typography System

- [x] Replace Inter/Roboto with CoFoSans
- [x] Load fonts properly via @font-face
- [x] Remove bold/semibold, use only regular (400) and medium (500)
- [ ] Review font sizes across all breakpoints
- [ ] Check line heights for readability
- [ ] Verify letter spacing is appropriate

### 🧩 UX Review

- [ ] Navigation flow audit
  - [ ] Landing page → Dashboard transitions
  - [ ] Between dashboard sections (Advertiser/Publisher/Admin)
  - [ ] Role switching experience
- [ ] Component consistency check
  - [ ] Button states and variants
  - [ ] Card styles and interactions
  - [ ] Form inputs and validation
  - [ ] Modal/dialog patterns
- [ ] Interaction patterns
  - [ ] Hover effects
  - [ ] Loading states
  - [ ] Empty states
  - [ ] Error handling
- [ ] Spacing and layout
  - [ ] Consistent padding/margins
  - [ ] Responsive behavior
  - [ ] Visual hierarchy

### 🔄 Global Changes & Iterations

- [ ] Document all global design decisions
- [ ] Create pattern library/component showcase
- [ ] Ensure changes propagate across all pages
- [ ] Test on different screen sizes
- [ ] Test with real content (not just mocks)

---

# FREEQ Design System Fundamentals

## Principles

- **Subtle by default**: Surfaces stay quiet—open grids, translucent layers, and hairline accents replace heavy cards or thick outlines.
- **Token-native**: Every color, dimension, and radius comes from `tokens.json` and is surfaced through `app/globals.css`; design updates begin with tokens, not ad-hoc values.
- **Measured contrast**: Deep graphite neutrals carry content, supported by carefully rationed acid accents for focus and feedback.
- **Structured space**: A consistent 4px-derived scale anchors both the spatial grid and typographic rhythm, keeping dense data legible without bold treatments.

## Token Architecture Overview

- Core dimensional tokens (`dimension.*`) cascade into spacing (`spacing.*`) and border radius definitions exposed as utilities such as `space-token-md` and `rounded-token-lg`.
- Semantic tokens (`fg.*`, `bg.*`, `accent.*`) are resolved per theme; the dark profile is the primary reference and should be treated as the canonical palette.
- Utility classes in `app/globals.css` map token names to Tailwind aliases (`bg-graphite-900`, `text-acid-400`, etc.), enabling consistent usage across frameworks.

## Color System

Tokens are grouped into graphite neutrals, acid highlights, and auxiliary accents. Values live in the `@theme inline` block of `app/globals.css`.

### Graphite Neutrals

| Token        | Hex       | Primary Role                         |
| ------------ | --------- | ------------------------------------ |
| Graphite 950 | `#0F1116` | Global backdrop, full-bleed canvas   |
| Graphite 900 | `#151820` | Primary page background              |
| Graphite 850 | `#1A1E26` | Elevated rows, navigation rails      |
| Graphite 800 | `#202530` | Input fills, subdued panels          |
| Graphite 700 | `#2A303A` | Borders, separators, inactive states |
| Graphite 650 | `#313844` | Chips, muted text containers         |
| Graphite 500 | `#515B6B` | Secondary text, icon strokes         |
| Graphite 300 | `#A4AEBB` | Supporting copy, helper text         |
| Graphite 100 | `#E7ECF2` | Primary text, high-emphasis icons    |

Usage guidance:

- Maintain graphite-on-graphite layering by employing opacity tints (e.g. `bg-graphite-900/70`) before introducing new hues.
- Hairline dividers should use `border-graphite-800` or `border-graphite-700` at 1px to preserve the delicate visual hierarchy.

### Acid Accent Band

| Token    | Hex       | Guidance                                                   |
| -------- | --------- | ---------------------------------------------------------- |
| Acid 400 | `#B2F200` | Hover or focus halo—keep to slim highlights or data trails |
| Acid 500 | `#C9FF00` | Primary interaction cues (focus ring, key CTA indicator)   |
| Acid 600 | `#D7FF3A` | Use sparingly for live motion or peak data points          |

Keep acid usage below 5% of any screen real estate; treat it as an electric thread rather than a block fill.

### Heat & Auxiliary Accents

| Token        | Hex                   | Application                                             |
| ------------ | --------------------- | ------------------------------------------------------- |
| Heat 500     | `#FF5E86`             | Secondary emphasis (warnings, pending status chips)     |
| Heat 700     | `#FF4778`             | Gradient anchor for momentary attention (launch events) |
| Blue 500     | `#4299E1`             | Cool glow for backgrounds or secondary data lines       |
| Indigo 400   | `#7F9CF5`             | Alternate highlight in lighter contexts                 |
| Indigo 600   | `#5A67D8`             | Light theme accent default                              |
| Gray 100–900 | `#F7FAFC` → `#1A202C` | Light theme scaffold                                    |

### Approved Pairings

- `Graphite 950` background with `Graphite 100` text for primary content (AA compliant).
- `Graphite 850` surface, `Graphite 300` copy, and `Graphite 700` outline for secondary information blocks.
- `Graphite 800` base, `Acid 400` line accent, and `Graphite 100` text for subtle callouts.
- `Graphite 900` background, `Heat 500/20` overlay, and `Heat 500` label for alerts without overwhelming the layout.

### Layering & Glows

- Prefer translucent overlays (`bg-graphite-900/60`) or soft radial glows (`bg-acid-500/15 blur-3xl`) anchored to token colors to draw focus without adding solid boxes.
- Shadows follow `theme.boxShadow.default`: a 5px spread drop shadow with a gentle inner glow—reserve for rare floating elements.

## Typography Tone

- CoFoSans drives all type; weights hover around 400–600 to keep the interface understated.
- Display scale (from `tokens.typography`) maps to `--font-size-h1` (49px) down to `--font-size-body` (16px). Use decreased letter spacing (`-0.05em`) on headings for refined density.
- For quiet hierarchy, combine weight shifts (500 → 600) with color steps (`Graphite 100` → `Graphite 300`) instead of dramatic size jumps.
- Microcopy (labels, table headers) stays uppercase with tracking between `0.18em` and `0.28em`, reinforcing structure without bold styling.

## Spacing Principles

- Base unit is `4px` (`spacing.xs`); multiples scale via powers of two: 8, 16, 32, 64.
- Recommended stack gaps:
  - Dense content: `space-token-sm` (8px)
  - Standard rhythm: `space-token-md` (16px)
  - Section breathing: `space-token-lg` (32px)
- Inline padding tokens:
  - Form elements: vertical `spacing.sm` (8px), horizontal `spacing.md` (16px)
  - Primary navigation: horizontal `spacing.md`, vertical `spacing.sm`
- Maintain vertical rhythm by aligning headings, body copy, and controls to the 4px baseline; avoid odd values or asymmetric spacing that disrupts the calm grid.

## Grid & Layout System

### Breakpoints & Columns

| Viewport   | Columns             | Margin | Gutter |
| ---------- | ------------------- | ------ | ------ |
| ≤640px     | Fluid single column | 24px   | 16px   |
| 641–1024px | 8-column            | 32px   | 20px   |
| ≥1025px    | 12-column           | 48px   | 24px   |

- Containers typically cap at `max-w-6xl` (1152px). Maintain outer margins using existing utilities (`px-6`, `lg:px-12`).
- For dashboards, use 12 columns with `span-3` (25%) modules to create balanced data groupings without card shells; rely on spacing and dividers for separation.

### Row Structure

- Begin sections with a `space-y-10` (40px) separation on large screens, scaling down to `space-y-6` (24px) on compact layouts.
- Align headlines to column edges; supporting content should snap to same grid lines to avoid visual drift.
- When grouping metrics, use `grid gap-4` (16px) internally and `gap-8` (32px) between primary clusters.

### Non-card Surface Treatment

- Replace boxed cards with open grids delineated by:
  - Hairline separators (`border-b border-graphite-800`)
  - Background tints (`bg-graphite-900/60`) confined to content areas
  - Subtle inset shadows (`shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]`) for depth without weight
- CTAs can sit directly on the canvas; use focus and hover states to signal interactivity instead of enclosing frames.

## Interaction Subtleties

- Focus states borrow the acid ring: `focus:ring-2 focus:ring-acid-500 focus:ring-offset-graphite-850`. Ensure offset remains at 2px to avoid chunky halos.
- Hover treatments lighten the graphite substrate (`hover:bg-graphite-850`) or elevate text to `Graphite 100`; avoid scaling or bolding.
- Disabled controls lower opacity to 50% but keep layout space intact, preserving the overall calm rhythm.
- Segmented controls and dropdowns already implement arrow-key navigation—treat keyboard affordances as first-class to maintain smooth, unobtrusive interaction.

## Implementation Notes

1. Start with token updates (`tokens.json`) before modifying component styles so downstream projects inherit changes automatically.
2. Mirror token names in any external project by porting the variable set from `app/globals.css` (`@theme inline` section) to guarantee consistent Tailwind utility resolution.
3. When migrating to another framework, bundle the utility helpers (`space-token-*`, `rounded-token-*`, focus ring classes) to preserve spacing and interaction subtleties.
4. Reserve the Heat gradient (`btn-heat`) for rare narrative highlights; for most actions, lean on the acid ring and graphite text shift.
5. Audit each screen for color balance—if more than two non-graphite hues appear simultaneously, re-evaluate for overemphasis.

By grounding layouts in this token-driven palette, disciplined spacing, and airy grid structure, the FREEQ interface remains calm, data-centric, and instantly recognisable—even without pronounced card shells or bold flourishes.
