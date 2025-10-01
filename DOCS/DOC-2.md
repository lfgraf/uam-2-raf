# UAM 2.0 — Implementation Notes (DOC-2)

_Last updated: Sept 30, 2025_

This document continues the UAM 2.0 prototypes and defines what must be added or improved next. Keep scope clear, use dark mode design tokens, and focus on making flows complete.

---

## 1. Notifications

**Why**: Core to trust and usability. Advertisers and Publishers both need timely alerts.

**Events to cover**:

- Advertiser: new bid, bid withdrawn, bid accepted, budget running low, campaign ended
- Publisher: bid accepted/rejected, invited to campaign, campaign paused/resumed, payout released

**UI**:

- Bell icon in top bar
- Panel with unread dot, “Mark all as read”
- Toasts for high-priority alerts
- Empty state: “No alerts. Good silence.”

---

## 2. Log Out

- Add a visible log out action in the user menu
- Clears session and returns to login page
- Shows a small confirmation toast after logging out

---

## 3. Design System & Dark Mode

- Dark mode is default
- Use `tokens.json` for colors, typography, spacing, radii, shadows
- Fonts: CoFoSans (or fallback stack)
- Ensure no hardcoded hex values in UI — everything through tokens

---

## 4. Empty States (Demo Ready)

Add proper empty states for all major views, with short copy and clear CTAs:

- Notifications: “No alerts. Good silence.”
- Advertiser Campaigns: “No campaigns yet.” → CTA “Create campaign”
- Advertiser Bids: “No bids yet.” → Hint “Publishers will appear here when they submit.”
- Publisher Properties: “No properties yet.” → CTA “Add property”
- Publisher Campaigns: “Nothing to bid on.” → Hint “When an advertiser opens access, you’ll see it here.”

---

## 5. Publisher — Add Property

**Goal**: Publishers can register inventory sources.

**Fields**:

- Name (required)
- Type (website, app, newsletter, other)
- URL (optional)
- Audience notes (optional)

**Flow**:

- “Add property” button → opens modal
- Submit → optimistic add to list, toast confirmation
- Properties should later be attachable when bidding

---

## 6. Publisher — Campaign Views

- Provide option to switch between Grid view and List view
- List should show key campaign details: Campaign name, Advertiser, Status, Deadline, Budget, My bid, Actions
- Allow sorting and filtering (status, deadline, has my bid)
- Add density toggle (Comfortable / Compact)
- Persist user preference for view mode

---

## Cross-feature details

- Role-based views: Advertiser vs Publisher vs Admin
- Empty states and demo mode should always show something clear
- Notifications, Add Property, and Campaign Views must work smoothly on both desktop and mobile
- Use tokens and consistent components (Notification Panel, EmptyState, View Switcher, Property Form)

---

## Acceptance Criteria

- Notifications show up correctly for both roles and can be marked read
- Log out always clears state and brings user back to login
- Dark mode consistent across all screens
- Empty states implemented everywhere listed
- Publishers can add and manage properties
- Campaign views have working list/grid switch with persistence

---

## Open Questions

- Budget alerts: one threshold or multiple (25%, 10%, 0%)?
- Do all bidders get notified when a campaign ends?
- Should properties require domain verification pre-MVP?

---

## Next for Claude

- Build the components outlined here (notifications, empty states, add property, view switcher)
- Hook up to demo data for testing
- Ensure dark mode tokens are applied everywhere

---

--- New request

- The dark mode should be
  the default.
  - As now the toggle doesn't work.
  - You also have
    @tokens-2.json for styling to be used and @CoFoSans-Medium.ttf and @CoFoSans-Regular.ttf as fonts (no bold).
    ────────────────────────────────────────────────
