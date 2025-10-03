# UX Decisions & Design Rationale

This document outlines key UX decisions made for the UAM platform and why they matter.

---

## Core UX Principles

### 1. Role-Based Separation
**Decision**: Three distinct dashboard experiences (Advertiser, Publisher, Admin) with role switching capability.

**Why**: Each user type has fundamentally different goals. Advertisers need campaign management, publishers need revenue tracking, admins need oversight. Forcing a unified experience would clutter each role's workflow.

**Implementation**: URL-based routing (`/dashboard/{role}/*`) with role detection in DashboardSidebar. Users with multiple roles can switch via sidebar footer, triggering full page reload to reset state cleanly.

---

## Advertiser Experience

### Campaign State Visibility
**Decision**: Show campaign lifecycle explicitly (Active, Bidding, Expired) with distinct visual states.

**Why**: The original brief highlighted confusion around "click-to-conversion gap." Users need to see campaign health at a glance without digging into tables.

**Implementation**: `CampaignStateBadge` component with color-coded states. Expired campaigns show "Claim Funds" CTA when unspent budget exists.

### Campaign Creation Wizard
**Decision**: Multi-step wizard with progress indicator instead of single long form.

**Why**: Campaign setup involves multiple complex decisions (budget, targeting, creative). Breaking into steps reduces cognitive load and allows inline validation per section.

**Implementation**: Stepper UI in `CampaignWizard` with smart defaults and contextual tooltips.

---

## Publisher Experience

### Admin-Managed Properties
**Decision**: Publishers cannot manually add properties. Admins create them and publishers claim ownership via wallet.

**Why**: Prevents spam properties and ensures quality control. Property verification requires admin oversight in a blockchain-based attribution system.

**Implementation**: Admin creates property ’ assigns wallet ’ publisher sees it appear in their dashboard. `WalletSetup` modal enforces wallet configuration before properties go live.

### Campaign Marketplace Feed
**Decision**: Marketplace-style discovery UI instead of filterable table.

**Why**: Publishers need to browse opportunities quickly, not analyze data. Visual cards with key metrics (payout, vertical, requirements) enable faster scanning than table rows.

**Implementation**: Grid layout with one-click bidding. Filters by vertical, payout range, and audience.

---

## Admin Experience

### Oversight Dashboard
**Decision**: Real-time monitoring view with alerts, not just static reports.

**Why**: Admins need to catch anomalies (suspicious clicks, pacing issues) proactively, not discover them in post-mortem reports.

**Implementation**: Live auction feed, velocity alerts, filterable by advertiser/publisher for quick triage.

### Dispute Resolution Workflow
**Decision**: Structured workflow with Accept/Escalate/Resolve actions instead of free-form notes.

**Why**: Disputes need clear resolution paths. Unstructured systems lead to inconsistent outcomes and frustrated users.

**Implementation**: Dedicated dispute modal with status progression and action history.

---

## Cross-Role Features

### Attribution Transparency
**Decision**: Show "Pending ’ Confirmed" states for conversions with countdown/status bar.

**Why**: The brief's #1 pain point: users don't understand why conversions aren't instant. Blockchain requires confirmation time, but this was invisible.

**Implementation**: `AttributionTracker` component shows pending conversions with contextual education ("Why is this pending? Blockchain confirmation in progress").

### Mobile-First Dashboards
**Decision**: Simplified mobile layouts with swipeable cards and d2 taps for quick actions.

**Why**: Users check campaign/revenue status on-the-go. Desktop-only design forces users to wait until they're at a computer.

**Implementation**: Responsive breakpoints with collapsed sidebar, bottom sheet modals, and simplified metric cards on mobile.

---

## Design System Choices

### FREEQ Design System (Graphite + Acid)
**Decision**: Dark mode first with Graphite neutrals (#0F1116 ’ #E7ECF2) and Acid accent (#C9FF00).

**Why**: Brand identity ("rebellious, anti-ad-tech") and reduced eye strain for dashboard-heavy workflows. Acid used sparingly (<5% of screen) for focus states only.

**Implementation**: All colors from `/src/lib/tokens.ts`. Dark mode is default, light mode is secondary with `dark:` variants.

### Token-Driven Design
**Decision**: All design values (colors, spacing, typography) come from design tokens, not hardcoded values.

**Why**: Ensures consistency across components and makes global design changes instant (update token, all components reflect it).

**Implementation**: `tokens.ts` exports TypeScript objects consumed by Tailwind config. Use token-based classes (`text-graphite-100`, `spacing-md`) instead of raw values.

### Typography Constraint
**Decision**: Only Regular (400) and Medium (500) weights, no bold/semibold.

**Why**: Cleaner visual hierarchy and faster load times. Hierarchy is achieved through size and color, not weight.

**Implementation**: CoFo Sans font loaded via @font-face. Font sizes mapped from tokens (xs ’ 5xl for h6 ’ h1).

---

## Component Architecture

### Form Input Consistency
**Decision**: Always use `<Input>` and `<Select>` components, never inline `<input>`/`<select>` with hardcoded classes.

**Why**: Dark mode support and accessibility must be consistent. Inline elements lead to fragmented styling and a11y issues.

**Implementation**: All form fields use `/src/components/ui/Input.tsx` and `/src/components/ui/Select.tsx`.

### Modal Pattern Standardization
**Decision**: Fixed modal structure with backdrop overlay and centered card.

**Why**: Predictable interaction model reduces cognitive load. Users learn the pattern once and apply it everywhere.

**Implementation**: All modals follow this structure:
```tsx
<div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
<div className="fixed inset-0 flex items-center justify-center z-50 p-4">
  <Card className="w-full max-w-lg p-6">
    {/* Content */}
  </Card>
</div>
```

---

## Onboarding Decisions

### Immediate Role Selection
**Decision**: No traditional marketing landing page. Users see role selection modal immediately on `/`.

**Why**: The platform has no self-serve signup. Users arrive because they're already part of the ecosystem. Get them to their dashboard fast.

**Implementation**: `OnboardingModal` on root page redirects directly to `/dashboard/{role}` based on selection.

### Guided Role Tours
**Decision**: Contextual hints on first login, not a full tutorial overlay.

**Why**: Users hate forced tutorials. Show what matters first (e.g., "Create your first campaign"), hide complexity until needed.

**Implementation**: TODO - Empty states with CTAs serve as implicit guidance for now.

---

## Performance & Metrics

### CPU Over RPM
**Decision**: Use "Cost Per Unit" (CPU) terminology instead of RPM throughout.

**Why**: More intuitive for users unfamiliar with ad tech jargon. CPU directly maps to "what I paid per result."

**Implementation**: All analytics components display CPU, not RPM.

---

## Key UX Gaps (Future Work)

1. **Empty States**: Need branded illustrations and onboarding CTAs for first-time users.
2. **Error Recovery**: Need actionable error messages ("Try again" vs generic "Something went wrong").
3. **Notification Center**: Centralized alerts/updates are mentioned in brief but not yet implemented.
4. **Real-Time Updates**: Mock data is static; need WebSocket/polling for live campaign/bid updates.

---

## References

- Original brief: `/DOCS/DOC.md`
- Design tokens: `/src/lib/tokens.ts`
- Component patterns: `/CLAUDE.md`
