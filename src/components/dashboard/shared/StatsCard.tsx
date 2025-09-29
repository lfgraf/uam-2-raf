import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, trend, icon: Icon }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-900 dark:text-white/60 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
            )}
            <span className={cn(
              "text-sm font-medium",
              trend === 'up' ? "text-green-600" : "text-red-600"
            )}>
              {change}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand" />
        </div>
      </div>
    </Card>
  );
}