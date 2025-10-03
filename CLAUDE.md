# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**UAM Platform** - A Universal Advertising Marketplace prototype built with Next.js 15.5.4, featuring role-based dashboards for Advertisers, Publishers, and Admins. The platform uses the FREEQ Design System with Graphite/Acid color palette.

## Development Commands

```bash
# Development server with Turbopack (runs on http://localhost:3000)
npm run dev

# Production build with Turbopack
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

### Role-Based Multi-Dashboard System

The application has three distinct user roles, each with their own dashboard:

1. **Advertiser** (`/dashboard/advertiser/*`)
   - Create and manage advertising campaigns
   - Track campaign states: Active, Bidding, Expired
   - Place bids, view analytics, claim unused funds from expired campaigns

2. **Publisher** (`/dashboard/publisher/*`)
   - Manage properties (properties are admin-managed, not manually added by publishers)
   - Browse campaign marketplace
   - View creative assets uploaded by advertisers
   - Track revenue and claim unused funds

3. **Admin** (`/dashboard/admin/*`)
   - User management and dispute resolution
   - Property management with wallet setup (required before properties go live)
   - Platform settings and system health monitoring

**Role Switching**: Users can have multiple roles and switch between them via the sidebar footer. Each role has a different mock wallet address:
- Advertiser: `0x742d...bEb0`
- Publisher: `0x5A0b...9c4c`
- Admin: `0x89Ab...45CD`

### Component Architecture

**Reusable UI Components** (`/src/components/ui/`)
- All form inputs use `Input` component for consistent dark mode support
- All dropdowns use `Select` component for consistent styling
- `Button`, `Card`, `Badge` components follow FREEQ Design System
- Components are built with dark mode as the primary design (light mode is secondary)

**Dashboard Components** (`/src/components/dashboard/`)
- Organized by role: `advertiser/`, `publisher/`, `admin/`, `shared/`
- Each role has its own layout with `DashboardSidebar` and `DashboardHeader`
- Shared components include modals (BidReviewModal, ClaimFundsModal), stats cards, and creative asset viewer

**Key Integrations**:
- `CampaignStateBadge` - Shows Active/Bidding/Expired states on campaigns
- `WalletSetup` - Admin modal for configuring property payment wallets
- `CreativeAssetViewer` - Displays advertiser creative assets (images/videos/text) in publisher views

### FREEQ Design System

**Design Token Source of Truth**: `/src/lib/tokens.ts`
- All colors, spacing, typography, and semantic tokens are defined here
- Never edit `tokens-2.json.backup` (archived reference only)
- Token flow: `tokens.ts` → `tailwind.config.ts` → `globals.css` → Components

#### Color System

**Primitive Colors** (use sparingly, prefer semantic tokens):
- **Graphite Neutrals** (#0F1116 → #E7ECF2): Dark mode color scale
  - `950`: Global backdrop, full-bleed canvas
  - `900`: Primary page background
  - `850`: Elevated rows, navigation rails
  - `800`: Input fills, subdued panels
  - `700`: Borders, separators
  - `500`: Secondary text, icon strokes
  - `300`: Supporting copy, helper text
  - `100`: Primary text, high-emphasis icons

- **Acid Accent** (#C9FF00): Primary interaction color for dark mode
  - Used sparingly (<5% of screen) for CTAs, focus states, key interactions
  - `500`: Primary (default)
  - `400`: Hover/focus halo
  - `600`: Active states

- **Heat** (#FF5E86): Secondary emphasis for warnings/alerts
- **Gray Scale** (#f7fafc → #1a202c): Light mode color scale
- **Indigo** (#7f9cf5, #5a67d8): Light mode accent

**Semantic Tokens** (PREFERRED - theme-aware, auto-switch light/dark):
```tsx
// Text colors
text-fg-default    // Primary text (graphite-100 dark, gray-900 light)
text-fg-muted      // Supporting copy (graphite-300 dark, gray-600 light)
text-fg-subtle     // Secondary text (graphite-500 dark, gray-500 light)

// Backgrounds
bg-bg-default      // Primary background (graphite-900 dark, white light)
bg-bg-muted        // Subdued backgrounds (graphite-800 dark, gray-100 light)
bg-bg-subtle       // Very subtle backgrounds (graphite-700 dark, gray-200 light)

// Accents
bg-accent          // Primary CTA (acid-500 dark, indigo-600 light)
text-accent-on     // Text on accent bg (graphite-950 dark, white light)
bg-accent-bg       // Accent variant (acid-400 dark, indigo-400 light)

// Borders - use raw graphite for now
border-graphite-700  // Primary borders (dark mode)
border-gray-200      // Primary borders (light mode)
```

**Token Usage Rules**:
1. ✅ ALWAYS use semantic tokens (`text-fg-default`, `bg-bg-default`) when possible
2. ✅ Use raw graphite/acid for edge cases (gradients, specific shades)
3. ❌ NEVER use `text-gray-900 dark:text-graphite-100` patterns
4. ❌ NEVER use `text-white` or `bg-white` (use semantic tokens instead)
5. ✅ Contrast rule: Always use `text-accent-on` on `bg-accent` backgrounds

**Typography**:
- Font: CoFo Sans (loaded via @font-face in globals.css)
- Weights: Regular (400) and Medium (500) only - no bold/semibold
- Font sizes: xs (10px), sm (14px), body (16px), h6-h1 (16px-49px)
- Letter spacing: -0.05em for headings (FREEQ refined density)

**Spacing**: 4px base unit, scaling in powers of two (8px, 16px, 32px, 64px)

**Border Radius**: sm (4px), lg (8px), xl (16px)

## Key Implementation Patterns

### Campaign State Management

Campaigns have two properties:
- `state`: 'active' | 'bidding' | 'expired' (lifecycle state visible to users)
- `status`: 'active' | 'paused' (internal play/pause control)

Expired campaigns show "Claim Funds" buttons when they have unspent budget.

### Modal Patterns

All modals follow this structure:
```tsx
{isOpen && (
  <>
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg p-6 relative">
        {/* Content */}
      </Card>
    </div>
  </>
)}
```

### Form Input Consistency

**Always use component-level form elements:**
- `<Input />` for text/number/date/url inputs
- `<Select />` for dropdowns
- `<Textarea />` for multi-line text (needs to be created following Input pattern)

Never use inline `<input>` or `<select>` tags with hardcoded dark mode classes.

### Metrics Terminology

Use **CPU (Cost Per Unit)** instead of RPM throughout the application for performance metrics.

## Important Constraints

1. **No Manual Property Addition**: Publishers do NOT add properties themselves - this is admin-managed
2. **Wallet Required**: Properties cannot go live without wallet setup (enforced by admin)
3. **Creative Assets**: Advertisers upload creative assets that publishers must be able to view
4. **Claim Funds**: Both advertisers and publishers can claim unused funds from expired campaigns
5. **Bid Flow**: Activity feed items for bids are clickable and open BidReviewModal with Accept/Reject actions

## Onboarding Flow

Landing page (`/`) shows `OnboardingModal` with role selection that redirects directly to:
- `/dashboard/advertiser` for Advertisers
- `/dashboard/publisher` for Publishers

No traditional marketing landing page - immediate role selection and dashboard access.

## File Organization

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Onboarding modal
│   ├── dashboard/           # Role-based dashboard routes
│   └── globals.css          # Tailwind + token utilities
├── components/
│   ├── ui/                  # Reusable components (Input, Select, Button, Card, Badge)
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── advertiser/
│   │   ├── publisher/
│   │   ├── admin/
│   │   └── shared/
│   └── onboarding/
└── lib/
    ├── tokens.ts            # Design system tokens (source of truth)
    └── utils.ts             # Utility functions (cn, etc.)
```

## State Management Notes

- All data is currently **mock data** with TODO comments for API integration
- Modal state is managed locally with `useState` in parent components
- No global state management library - keep local state for now
- Future: Replace TODO comments with actual API calls when backend is ready
