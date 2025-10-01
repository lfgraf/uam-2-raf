# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

User Acquisition Management (UAM) Platform - A blockchain-based advertising ecosystem prototype with three distinct user roles: **Advertisers**, **Publishers**, and **Admins**. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Dev server runs on `http://localhost:3000`

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **React**: v19.1.0
- **TypeScript**: v5
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives + custom components
- **Icons**: Lucide React

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── dashboard/                # Dashboard routes (role-specific)
│   │   ├── advertiser/           # Advertiser pages (campaigns, analytics, auctions)
│   │   ├── publisher/            # Publisher pages (properties, marketplace, revenue)
│   │   └── admin/                # Admin pages (oversight, disputes)
│   ├── demo/                     # Demo pages
│   ├── layout.tsx                # Root layout with Geist fonts
│   └── page.tsx                  # Landing page
├── components/
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── advertiser/           # Advertiser components (CampaignCard, CampaignWizard, etc.)
│   │   ├── publisher/            # Publisher components (PropertyCard, Marketplace, etc.)
│   │   ├── admin/                # Admin components (AdminDashboard, DisputeResolution, etc.)
│   │   ├── shared/               # Shared dashboard components (StatsCard, AttributionTracker, etc.)
│   │   ├── DashboardSidebar.tsx  # Main role-based navigation sidebar
│   │   └── DashboardHeader.tsx   # Dashboard header with mobile menu
│   ├── landing/                  # Landing page components
│   ├── wallet/                   # Wallet connection components
│   └── ui/                       # Reusable UI primitives (Button, Card, Badge, etc.)
└── lib/
    ├── tokens.ts                 # Design system tokens (colors, spacing, typography)
    └── utils.ts                  # Utility functions (cn for classNames)
```

### Role-Based Architecture

The platform uses URL-based role detection: `/dashboard/{role}/*` where role is `advertiser`, `publisher`, or `admin`.

**DashboardSidebar** (`src/components/dashboard/DashboardSidebar.tsx`):
- Dynamically renders navigation based on current role (parsed from pathname)
- Supports role switching for users with multiple roles
- Configuration in `roleConfig` object maps roles to navigation items

**Key Pattern**: Each role has:
1. A base dashboard page: `/dashboard/{role}/page.tsx`
2. Role-specific component: `src/components/dashboard/{role}/{Role}Dashboard.tsx`
3. Dedicated navigation items defined in `DashboardSidebar.tsx`

### Design System

Custom design tokens in `src/lib/tokens.ts` define:
- Color scales (indigo brand colors, gray scale, semantic colors)
- Spacing system (xs, sm, md, lg, xl)
- Typography scale (font sizes, families, line heights)
- Border radius values

Tokens are consumed in `tailwind.config.ts` to generate Tailwind utilities. Use token-based classes throughout (e.g., `bg-brand`, `text-brand-600`, `spacing-md`).

**Dark mode**: Supported via Tailwind's `dark:` prefix. Dark mode toggle not yet implemented.

### Component Patterns

**UI Components** (`src/components/ui/`):
- Low-level primitives built on Radix UI
- Variants managed via `cva` patterns (see Button, Card, Badge)
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes

**Dashboard Components**:
- Role-specific logic isolated to role subdirectories
- Shared components in `dashboard/shared/`
- Components use "use client" directive when needed for interactivity

### Key Features Implemented

**Phase 1 (Foundation)**: ✅
- Landing page with hero, role selection, feature cards
- Wallet connection UI (blockchain integration pending)
- Dashboard navigation structure with role switching
- Design system setup

**Phase 2 (Core Journeys)**: ✅
- Advertiser: Campaign dashboard, creation wizard, analytics, auction bids
- Publisher: Property dashboard, campaign marketplace, revenue tracking
- Admin: Oversight dashboard, dispute resolution

**Phase 3 (Advanced)**: ✅
- Attribution transparency components (AttributionTracker)
- Advanced analytics views
- Enhanced marketplace filtering

**Phase 4 (Polish)**: ✅
- Error states, empty states, loading states
- Brand personality elements

### Important Implementation Notes

1. **Client Components**: Dashboard layout and sidebar require "use client" due to state management
2. **Routing**: All dashboard routes under `/dashboard/{role}/` pattern
3. **Mock Data**: Currently using hardcoded mock data; blockchain integration pending
4. **Responsive**: Mobile-first design with sidebar collapse on mobile
5. **Font Loading**: Uses Next.js `next/font` with Geist Sans and Geist Mono

### Design Document

Comprehensive requirements and design rationale in `DOC.md` at project root. Refer to this for:
- Feature specifications by role
- User journey details
- Screen map and dependencies
- UX enhancement strategies

### Common Gotchas

- Don't modify `tokens-2.json` (source design tokens) - use `src/lib/tokens.ts` instead
- Dashboard layout already handles sidebar state - child pages don't need their own
- Role switching uses full page reload (`window.location.href`) to reset state
- Radix UI components require proper prop spreading and `asChild` patterns