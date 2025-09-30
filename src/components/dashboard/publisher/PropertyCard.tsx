'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MoreVertical, ExternalLink, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Property {
  id: string;
  name: string;
  url: string;
  category: string;
  monthlyViews: number;
  revenue: number;
  cpu: number;
  status: 'active' | 'paused' | 'pending';
  performance: 'excellent' | 'good' | 'poor';
}

interface PropertyCardProps {
  property: Property;
}

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-800 dark:bg-graphite-800 dark:text-gray-300' }
};

const performanceConfig = {
  excellent: { color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  good: { color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  poor: { color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' }
};

export function PropertyCard({ property }: PropertyCardProps) {
  const statusStyle = statusConfig[property.status];
  const performanceStyle = performanceConfig[property.performance];

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
  };

  return (
    <div className="border border-gray-200 dark:border-graphite-700 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 dark:text-graphite-100">{property.name}</h3>
            <Button variant="ghost" size="sm" className="p-1">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
          <div className="text-sm text-gray-900 dark:text-graphite-300 mb-2">{property.url}</div>
          <div className="flex items-center gap-2">
            <Badge className={statusStyle.color}>
              {statusStyle.label}
            </Badge>
            <span className={cn("text-xs px-2 py-1 rounded-full", performanceStyle.bg, performanceStyle.color)}>
              {property.performance}
            </span>
            <span className="text-xs text-gray-900 dark:text-graphite-500 bg-gray-100 dark:bg-graphite-800 px-2 py-1 rounded-full">
              {property.category}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Monthly Views</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">{formatViews(property.monthlyViews)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Revenue</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">${property.revenue.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">CPU</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">${property.cpu}</div>
        </div>
        <div>
          <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">CTR</div>
          <div className="font-medium text-gray-900 dark:text-graphite-100">
            {(Math.random() * 3 + 1).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-900 dark:text-graphite-300">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}