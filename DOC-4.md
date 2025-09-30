UAM Prototype Feedback (from PM)

This section outlines clarifications and adjustments based on the latest product review. These are functional expectations and UX states that need to be supported.

---

## Implementation Checklist

### 1. Recent Activity Feed (High Priority)

- [ ] **Make feed items clickable** - Add click handlers to activity feed items
- [ ] **Create Bid Review Modal** - Modal component with bid details
- [ ] **Add Accept/Reject Actions** - Action buttons in modal with confirmation flows
- [ ] **Update Activity Feed Component** - Wire up modal triggers
- [ ] **Add bid status tracking** - Track accepted/rejected/pending bid states

**Files to Update:**

- Create: `src/components/dashboard/shared/BidReviewModal.tsx`
- Update: Recent activity feed component (needs to be located)
- Update: Data models for bid acceptance/rejection

---

### 2. Publisher Property Management (High Priority)

- [ ] **Remove "Add Property" functionality** - Publishers should NOT manually add properties
- [ ] **Update Publisher Dashboard** - Remove add property buttons/forms
- [ ] **Show Creative Assets** - Display advertiser's uploaded creative in campaign view
- [ ] **Create Creative Viewer Component** - Component to preview images/videos/assets

**Files to Update:**

- Update: `src/components/dashboard/publisher/PublisherDashboard.tsx`
- Update: `src/components/dashboard/publisher/PropertyCard.tsx`
- Create: `src/components/dashboard/shared/CreativeAssetViewer.tsx`
- Update: Campaign detail views to show creatives

---

### 3. Metrics Terminology Change (Medium Priority)

- [ ] **Replace "RPM" with "CPU"** - Global find & replace
- [ ] **Update all UI labels** - Change RPM → CPU (Cost Per Unit)
- [ ] **Update data models** - Rename fields if needed
- [ ] **Update tooltips/help text** - Explain CPU metric
- [ ] **Update analytics charts** - Y-axis labels, legends

**Files to Search/Update:**

- All dashboard components (advertiser, publisher, admin)
- Analytics components
- Campaign marketplace
- StatsCard components
- Any API/data layer references

---

### 4. Campaign States - Advertiser (High Priority)

- [ ] **Implement "Active" state** - Campaign currently running
- [ ] **Implement "Bidding" state** - Open for bids, not yet running
- [ ] **Implement "Expired" state** - Campaign ended
- [ ] **Add "Claim Funds" action** - Allow advertisers to claim unused funds from expired campaigns
- [ ] **Create state badge component** - Visual indicators for each state
- [ ] **Add state transitions** - Handle state changes (Bidding → Active → Expired)

**Files to Update:**

- Update: `src/components/dashboard/advertiser/CampaignCard.tsx`
- Update: `src/components/dashboard/advertiser/AdvertiserDashboard.tsx`
- Create: Campaign state management logic
- Add: Claim funds button/modal for expired campaigns

---

### 5. Campaign States - Publisher (High Priority)

- [ ] **Add "Claim Unused Funds" action** - For expired/ended campaigns
- [ ] **Create funds claim modal** - Show claimable amount, confirm action
- [ ] **Update campaign list filters** - Filter by state (active, claimable, expired)
- [ ] **Add visual indicators** - Show which campaigns have claimable funds

**Files to Update:**

- Update: `src/components/dashboard/publisher/CampaignMarketplace.tsx`
- Create: `src/components/dashboard/publisher/ClaimFundsModal.tsx`
- Update: Publisher revenue tracking

---

### 6. Admin Wallet Setup (High Priority)

- [ ] **Create Wallet Setup Interface** - Form for configuring property wallets
- [ ] **Add wallet status indicator** - Show if property has wallet configured
- [ ] **Implement wallet validation** - Check wallet is properly set up
- [ ] **Block property activation** - Properties can't go live without wallet setup
- [ ] **Add wallet management section** - In admin property details

**Files to Update:**

- Update: `src/components/dashboard/admin/AdminDashboard.tsx`
- Create: `src/components/dashboard/admin/WalletSetup.tsx`
- Update: Property management components
- Add: Wallet status to property cards/lists

---

## Summary of Changes by Role

### Advertiser Dashboard

- Campaign states: Active, Bidding, Expired
- Claim funds action for expired campaigns
- CPU instead of RPM

### Publisher Dashboard

- Remove manual property addition
- View creative assets in campaigns
- Claim unused funds from expired campaigns
- CPU instead of RPM

### Admin Dashboard

- Wallet setup for each property
- Ensure properties have payment infrastructure before going live

### Shared/Cross-cutting

- Recent activity feed with bid review modal
- RPM → CPU terminology change across all surfaces
- Campaign state management system

---

## Original Feedback

Recent Activity (Feed)
• The "Recent Activity" feed is not just informational.
• Clicking an item in the feed should open a modal.
• The modal shows new bids and allows the user to either accept or reject the bid.

Publisher Role
• Publisher does not add properties manually.
• Instead, properties are managed/administered differently (see Admin section).
• Publishers should be able to see the creative asset uploaded by the advertiser within the campaign view.

Metrics
• Replace RPM with CPU (Cost Per Unit) across all relevant surfaces.
• CPU is the standardized performance metric.

Campaign States

We need to handle campaign lifecycle states differently for Advertisers and Publishers.

Advertiser States
• Active → Campaign currently running.
• Bidding → Campaign is open for bids but not yet running.
• Expired → Campaign has ended. Once expired, advertiser can claim remaining funds.

Publisher States
• Claim Unused Funds → When a campaign expires or ends, publishers should be able to claim their share of unused funds.

Admin Role
• For each property, Admin must handle wallet setup.
• Admin ensures that properties have the correct payment/wallet infrastructure configured before they can go live.
