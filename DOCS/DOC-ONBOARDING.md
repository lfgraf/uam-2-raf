# Onboarding Implementation Plan

## Goal
Create a clean, guided onboarding experience with a set of cards that appear when users first land on their dashboard after role selection.

## User Flow

1. **Initial State**: User completes role selection in OnboardingModal
2. **Dashboard Landing**: User lands on `/dashboard/{role}` for the first time
3. **Guided Cards Appear**: A dismissible overlay or inline card sequence guides them through key features
4. **Completion**: User can dismiss or complete the tour, preference saved to localStorage

---

## Implementation Steps

### Step 1: Create Onboarding Card Component
**File**: `/src/components/dashboard/shared/OnboardingTour.tsx`

**Features**:
- Multi-step card carousel
- Role-specific content (different tours for advertiser/publisher/admin)
- Progress indicator (e.g., "1 of 4")
- "Next", "Skip Tour", and "Got it" buttons
- Smooth transitions between cards
- FREEQ Design System styling (acid accents, graphite colors)

**Card Content Structure**:
```typescript
interface OnboardingStep {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText?: string;
  ctaLink?: string;
}
```

---

### Step 2: Define Role-Specific Tour Content

**Advertiser Tour** (4 cards):
1. **Welcome** - "Create campaigns and reach your audience"
2. **Campaign Creation** - "Start your first campaign" → CTA: "Create Campaign"
3. **Marketplace** - "Browse available publisher inventory"
4. **Analytics** - "Track performance and optimize"

**Publisher Tour** (4 cards):
1. **Welcome** - "Monetize your properties with relevant ads"
2. **Add Property** - "Register your first property" → CTA: "Add Property"
3. **Marketplace** - "Discover campaigns to bid on"
4. **Revenue** - "Monitor your earnings"

**Admin Tour** (3 cards):
1. **Welcome** - "Manage platform operations"
2. **User Management** - "Oversee users and permissions"
3. **Settings** - "Configure platform parameters"

---

### Step 3: Add Onboarding State Management

**File**: `/src/components/dashboard/DashboardLayout.tsx` or individual dashboard pages

**Logic**:
- Check `localStorage.getItem('onboarding-complete-{role}')` on mount
- If `null` → show OnboardingTour
- If `'true'` → hide OnboardingTour
- Provide dismiss handler that sets localStorage

**Example**:
```typescript
const [showOnboarding, setShowOnboarding] = useState(false);

useEffect(() => {
  const completed = localStorage.getItem(`onboarding-complete-${role}`);
  if (!completed) {
    setShowOnboarding(true);
  }
}, [role]);

const handleDismiss = () => {
  localStorage.setItem(`onboarding-complete-${role}`, 'true');
  setShowOnboarding(false);
};
```

---

### Step 4: Design Onboarding Card UI

**Layout Options**:

**Option A - Overlay Modal** (Recommended):
- Semi-transparent backdrop
- Centered card (max-w-lg)
- High z-index to overlay dashboard
- Non-blocking (user can click outside to dismiss)

**Option B - Inline Banner**:
- Top of dashboard content
- Collapsible/dismissible
- Less intrusive but less prominent

**Styling**:
- Consistent with FREEQ Design System
- Acid accent for CTAs and progress indicator
- Graphite background with proper dark mode support
- Icons from Lucide React
- Smooth transitions (opacity, transform)

---

### Step 5: Integration Points

**Files to Modify**:

1. **`/src/app/dashboard/advertiser/page.tsx`**
   - Import and conditionally render OnboardingTour
   - Pass advertiser-specific tour steps

2. **`/src/app/dashboard/publisher/page.tsx`**
   - Import and conditionally render OnboardingTour
   - Pass publisher-specific tour steps

3. **`/src/app/dashboard/admin/page.tsx`**
   - Import and conditionally render OnboardingTour
   - Pass admin-specific tour steps

---

### Step 6: Optional Enhancements

- **Replay Tour**: Add "Help" menu item in DashboardHeader to restart tour
- **Interactive Highlights**: Highlight specific UI elements during tour steps
- **Animation**: Fade-in/slide-up transitions for cards
- **Keyboard Navigation**: Arrow keys to navigate, Escape to dismiss
- **Analytics**: Track tour completion/skip rates (future)

---

## Component Structure

```
OnboardingTour
├── OnboardingCard (individual step)
│   ├── Icon
│   ├── Title
│   ├── Description
│   └── Actions (Next/Skip/CTA)
└── ProgressIndicator (dots or numbers)
```

---

## Design Tokens Usage

- **Background**: `bg-white dark:bg-graphite-900`
- **Border**: `border-gray-200 dark:border-graphite-700`
- **Text**: `text-gray-900 dark:text-graphite-100`
- **Accent**: `bg-acid text-graphite-950` for CTAs
- **Progress**: `bg-acid` for active step, `bg-graphite-700` for inactive
- **Backdrop**: `bg-graphite-950/50`

---

## Success Criteria

✅ Onboarding appears on first dashboard visit per role
✅ User can navigate through all steps
✅ User can skip/dismiss tour at any time
✅ Tour preference persisted in localStorage
✅ Consistent FREEQ Design System styling
✅ Responsive on mobile and desktop
✅ Accessible (keyboard navigation, ARIA labels)

---

## Files to Create/Modify

**Create**:
- `/src/components/dashboard/shared/OnboardingTour.tsx`

**Modify**:
- `/src/app/dashboard/advertiser/page.tsx`
- `/src/app/dashboard/publisher/page.tsx`
- `/src/app/dashboard/admin/page.tsx`

---

## Next Steps

1. Confirm approach (overlay modal vs inline banner)
2. Finalize tour content per role
3. Build OnboardingTour component
4. Integrate into dashboard pages
5. Test on all roles and devices
