import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

// Detect format from value string
function detectFormat(value: string): 'currency' | 'percentage' | 'number' {
  if (value.startsWith('$')) return 'currency';
  if (value.includes('%')) return 'percentage';
  return 'number';
}

// Extract numeric value from string
function extractNumericValue(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
}

// Get decimal places from original value
function getDecimals(value: string): number {
  const match = value.match(/\.(\d+)/);
  return match ? match[1].length : 0;
}

export function StatsCard({ title, value, change, trend, icon: Icon }: StatsCardProps) {
  const format = detectFormat(value);
  const numericValue = extractNumericValue(value);
  const decimals = getDecimals(value);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-graphite-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-graphite-100 mt-1">
            <AnimatedCounter value={numericValue} format={format} decimals={decimals} duration={1500} />
          </p>
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
        <div className="w-12 h-12 bg-acid/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-acid" />
        </div>
      </div>
    </Card>
  );
}