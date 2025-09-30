'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MoreVertical, Play, Pause, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  conversions: number;
  cpc: number;
  endDate: string;
  performance: 'excellent' | 'good' | 'poor';
}

interface CampaignCardProps {
  campaign: Campaign;
}

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800 dark:bg-graphite-800 dark:text-gray-300' }
};

const performanceConfig = {
  excellent: { color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  good: { color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  poor: { color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' }
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const spendPercentage = (campaign.spent / campaign.budget) * 100;
  const statusStyle = statusConfig[campaign.status];
  const performanceStyle = performanceConfig[campaign.performance];

  return (
    <div className="border border-gray-200 dark:border-graphite-700 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-graphite-100 mb-1">{campaign.name}</h3>
          <div className="flex items-center gap-2">
            <Badge className={statusStyle.color}>
              {statusStyle.label}
            </Badge>
            <span className={cn("text-xs px-2 py-1 rounded-full", performanceStyle.bg, performanceStyle.color)}>
              {campaign.performance}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Budget</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">${campaign.budget.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Spent</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">${campaign.spent.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Conversions</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">{campaign.conversions.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">CPC</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">${campaign.cpc}</div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-900 dark:text-graphite-300 mb-2">
          <span>Budget Progress</span>
          <span>{spendPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-graphite-800 rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all",
              spendPercentage > 90 ? "bg-red-500" :
              spendPercentage > 75 ? "bg-yellow-500" :
              "bg-green-500"
            )}
            style={{ width: `${Math.min(spendPercentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-900 dark:text-graphite-300">
          Ends: {new Date(campaign.endDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            {campaign.status === 'active' ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}