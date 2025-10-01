# User Acquisition Management Platform - Design Prototype Scope

This document outlines the complete scope and requirements for building a comprehensive UAM platform redesign prototype. The platform serves three core user types: **Advertisers**, **Publishers**, and **Admins** in a blockchain-based advertising ecosystem.

## Executive Summary

The current platform has functional core features but lacks intuitive UX, clear user journeys, and transparency around blockchain attribution delays. This redesign focuses on role-specific experiences, mobile-first approach, and addressing the "click-to-conversion gap" that causes user confusion.

---

# MVP Development Phases

## Phase 1: Foundation (Week 1-2)
- Landing page with clear value propositions
- Wallet connection and role selection
- Basic navigation structure
- Design system setup

## Phase 2: Core User Journeys (Week 3-5)
- Advertiser campaign creation flow
- Publisher property management
- Basic dashboard views for each role

## Phase 3: Advanced Features (Week 6-7)
- Admin oversight tools
- Attribution transparency features
- Mobile optimization

## Phase 4: Polish & Enhancement (Week 8)
- Error states and empty states
- Brand personality integration
- Final UX refinements

---

# Detailed Feature Requirements

## **1. First Impressions & Onboarding**

**Current:** Wallet connect + role selection is functional but flat. Limited guidance.

**Redesign Focus:**

- **Landing page**: clear value props (what the platform _is_ and _why_ you should care).
- **Guided onboarding**:
  - Role-specific tours (“I’m an advertiser” vs “I’m a publisher”).
  - Contextual hints → show what matters first, hide complexity until needed.
- **Profiles**: make role and permissions visible in UI; clear settings.

---

## **2. Advertiser Journey**

**Current:** Multi-step wizard for campaign creation exists but feels heavy; dashboard is stats-first, not insight-first.

**Redesign Focus:**

- **Campaign creation flow**:
  - Stepper UI with progress indicator.
  - Inline validation + tooltips (e.g., budget allocation, audience size).
  - Smart defaults (auto-fill timing, spend pacing).
- **Dashboard redesign**:
  - Campaign cards with at-a-glance health: budget left, pacing, conversions.
  - Alerts for anomalies or pacing risks.
  - Drill-down analytics: CPC, cost per conversion, funnel drop-off.
- **Auction view**: sortable bid table → intuitive filters (price, volume, publisher rating).

---

## **3. Publisher Journey**

**Current:** Property management exists but lacks visibility; campaign participation is list-based.

**Redesign Focus:**

- **Property management**:
  - Visual tiles for properties, quick health indicators.
  - Inline revenue tracking → $ earned today, CTR, conversion lift.
- **Campaign discovery**:
  - Marketplace-style feed → campaigns tagged by vertical, payout, requirements.
  - One-click bid participation, with preview of potential ROI.
- **Bid feedback loop**:
  - Status indicators (pending, won, lost).
  - Future-proof slot for “why rejected” insights.

---

## **4. Admin Experience**

**Current:** Oversight tools exist but are scattered; limited UX for dispute/compliance.

**Redesign Focus:**

- **Oversight dashboard**:
  - Live view of auctions + active campaigns.
  - Alerts for anomalies (suspicious clicks, velocity spikes).
  - Filters by advertiser/publisher → quick triage.
- **Dispute workflows**: structured flows (accept, escalate, resolve).
- **Platform configuration**: clean system settings, role management, and audit logs.

---

## **5. Transparency Moments**

Across all roles, the biggest pain is the **“click-to-conversion gap.”**

**Redesign Focus:**

- **Pending → Confirmed states** in dashboards.
- Countdown or status bar for “pending attribution.”
- Educate in-context → “Why is this pending? Blockchain confirmation in progress.”

---

## **6. Mobile & Accessibility**

**Current:** Desktop-only mindset.

**Redesign Focus:**

- **Mobile-first dashboards** → slimmed KPIs, swipeable campaign cards.
- Quick actions (approve bid, check spend, check revenue) in ≤2 taps.
- **Accessibility** baked in: clear color states, semantic indicators, screen reader flow.

---

## **7. Strategic UX Enhancements**

- **Decision support**: anomaly alerts, pacing insights, suggested optimizations.
- **Community/Help**: in-dashboard docs, peer-to-peer guides, or chat support.
- **Brand personality**: inject Frequency’s rebellious identity into non-critical spaces (empty states, transitions, onboarding copy) without cluttering core flows.

---

# **Prototype Screen Map**

## Core Screens by Priority

### **Phase 1: Foundation Screens**
| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| Landing Page | First impression + value prop | Hero section, role selection CTAs, wallet connect |
| Wallet Connection | Authentication entry point | MetaMask/wallet integrations, loading states |
| Role Selection | User type identification | Clear role cards with descriptions |
| Dashboard Shell | Navigation structure | Sidebar/topnav, role-based menu items |

### **Phase 2: Role-Specific Core Screens**

#### **Advertiser Screens**
| Screen | Purpose | Key Elements | Dependencies |
|--------|---------|--------------|--------------|
| Campaign Dashboard | Campaign overview & management | Campaign cards, health indicators, quick actions | Dashboard Shell |
| Campaign Creation Wizard | Multi-step campaign setup | Stepper UI, form validation, smart defaults | Dashboard |
| Campaign Detail | Deep analytics & optimization | Charts, metrics, pacing alerts | Campaign Dashboard |
| Auction Bid Table | Bid management & optimization | Sortable table, filters, bulk actions | Campaign Detail |

#### **Publisher Screens**
| Screen | Purpose | Key Elements | Dependencies |
|--------|---------|--------------|--------------|
| Property Dashboard | Property portfolio management | Property tiles, revenue metrics | Dashboard Shell |
| Campaign Marketplace | Discover & bid on campaigns | Feed layout, filtering, one-click bidding | Property Dashboard |
| Revenue Tracker | Earnings & performance analytics | Charts, breakdowns, payout status | Property Dashboard |

#### **Admin Screens**
| Screen | Purpose | Key Elements | Dependencies |
|--------|---------|--------------|--------------|
| Oversight Dashboard | Platform health & monitoring | Live auction view, alerts, filters | Dashboard Shell |
| Dispute Resolution | Handle conflicts & issues | Workflow steps, case management | Oversight Dashboard |
| Platform Settings | System configuration | User management, role config, audit logs | Oversight Dashboard |

### **Phase 3: Advanced Features**
| Screen | Purpose | Key Elements | Dependencies |
|--------|---------|--------------|--------------|
| Attribution States | Transparency for pending conversions | Progress indicators, explanations | All dashboards |
| Mobile Dashboards | Touch-optimized experiences | Swipeable cards, simplified metrics | Desktop versions |
| Notification Center | Centralized alerts & updates | Feed layout, action buttons | All screens |

### **Phase 4: Polish Screens**
| Screen | Purpose | Key Elements | Dependencies |
|--------|---------|--------------|--------------|
| Error States | Handle failures gracefully | Branded illustrations, recovery actions | All screens |
| Empty States | Guide new users | Onboarding hints, sample data | All dashboards |
| Loading States | Manage waiting periods | Skeleton screens, progress indicators | All screens |

---

# **Technical Implementation Notes**

## Design System Requirements
- **Colors**: Primary (brand), secondary, success, warning, error states
- **Typography**: Hierarchy for dashboard density vs readability
- **Components**: Reusable cards, buttons, forms, tables, modals
- **Icons**: Campaign status, property types, action buttons
- **Layout**: Responsive grid system, mobile breakpoints

## Key User Flows to Prototype
1. **First-time advertiser**: Landing → Wallet → Role → Onboarding → Campaign Creation
2. **Returning publisher**: Login → Dashboard → New Campaign Discovery → Bidding
3. **Admin monitoring**: Dashboard → Alert Investigation → Issue Resolution
4. **Attribution transparency**: Any dashboard → Pending Conversion → Status Explanation

## Critical UX Decisions to Validate
- Campaign card layout and information hierarchy
- Multi-step form vs single page for campaign creation
- Mobile navigation pattern (bottom tabs vs hamburger)
- Attribution pending state design and messaging
