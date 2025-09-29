'use client';

import { AdvancedAnalytics } from '@/components/dashboard/shared/AdvancedAnalytics';
import { AttributionTracker } from '@/components/dashboard/shared/AttributionTracker';

export default function PublisherAnalyticsPage() {
  return (
    <div className="space-y-8">
      <AdvancedAnalytics userRole="publisher" />

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Attribution Transparency
        </h3>
        <AttributionTracker campaignId="camp_002" conversionId="conv_456" />
      </div>
    </div>
  );
}