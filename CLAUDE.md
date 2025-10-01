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

**Token-Driven Design**: All colors, spacing, and typography come from `/src/lib/tokens.ts` and are exposed through Tailwind config.

**Color System**:
- **Graphite Neutrals** (#0F1116 → #E7ECF2): Primary color scale for dark mode
- **Acid Accent** (#C9FF00): Used sparingly (<5% of screen) for focus states, CTAs, and key interactions
- **Heat** (#FF5E86): Secondary emphasis for warnings and alerts
- **Contrast Rule**: Always use `text-graphite-950` on `acid` backgrounds for accessibility

**Typography**:
- Font: CoFo Sans (loaded via @font-face in globals.css)
- Weights: Regular (400) and Medium (500) only - no bold/semibold
- Font sizes mapped from tokens: xs, sm, base (body), lg-5xl (h6-h1)

**Spacing**: 4px base unit, scaling in powers of two (8px, 16px, 32px, 64px)

**Dark Mode First**: Components are designed for dark mode primarily. Use `dark:` variants for all color/background utilities.

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
