'use client';

import { AdvancedAnalytics } from '@/components/dashboard/shared/AdvancedAnalytics';
import { AttributionTracker } from '@/components/dashboard/shared/AttributionTracker';

export default function AdvertiserAnalyticsPage() {
  return (
    <div className="space-y-8">
      <AdvancedAnalytics userRole="advertiser" />

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Attribution Events
        </h3>
        <AttributionTracker campaignId="camp_001" conversionId="conv_123" />
      </div>
    </div>
  );
}