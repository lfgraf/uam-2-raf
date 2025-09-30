'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'flat';
  format: 'currency' | 'percentage' | 'number';
}

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface AdvancedAnalyticsProps {
  userRole: 'advertiser' | 'publisher' | 'admin';
}

// Mock analytics data
const advertiserMetrics: MetricData[] = [
  { name: 'Total Spend', value: 12450, change: 8.2, trend: 'up', format: 'currency' },
  { name: 'ROAS', value: 3.4, change: 12.1, trend: 'up', format: 'number' },
  { name: 'CTR', value: 2.8, change: -0.3, trend: 'down', format: 'percentage' },
  { name: 'Conversions', value: 847, change: 15.7, trend: 'up', format: 'number' },
  { name: 'CPC', value: 1.25, change: -5.2, trend: 'up', format: 'currency' },
  { name: 'Conversion Rate', value: 4.2, change: 2.1, trend: 'up', format: 'percentage' }
];

const publisherMetrics: MetricData[] = [
  { name: 'Revenue', value: 2890, change: 18.5, trend: 'up', format: 'currency' },
  { name: 'CPU', value: 4.50, change: 12.3, trend: 'up', format: 'currency' },
  { name: 'Fill Rate', value: 87.5, change: 3.2, trend: 'up', format: 'percentage' },
  { name: 'Page Views', value: 145000, change: 22.1, trend: 'up', format: 'number' },
  { name: 'CTR', value: 1.9, change: 0.8, trend: 'up', format: 'percentage' },
  { name: 'Bounce Rate', value: 32.1, change: -4.5, trend: 'up', format: 'percentage' }
];

const adminMetrics: MetricData[] = [
  { name: 'Platform Revenue', value: 45200, change: 28.3, trend: 'up', format: 'currency' },
  { name: 'Active Users', value: 2847, change: 12.5, trend: 'up', format: 'number' },
  { name: 'Transaction Volume', value: 890000, change: 34.2, trend: 'up', format: 'currency' },
  { name: 'Dispute Rate', value: 0.8, change: -15.3, trend: 'up', format: 'percentage' },
  { name: 'System Uptime', value: 99.9, change: 0.1, trend: 'up', format: 'percentage' },
  { name: 'Avg Settlement', value: 4.2, change: -8.1, trend: 'down', format: 'number' }
];

// Mock chart data
const chartData: ChartDataPoint[] = [
  { date: '2024-12-22', value: 1200 },
  { date: '2024-12-23', value: 1450 },
  { date: '2024-12-24', value: 980 },
  { date: '2024-12-25', value: 1100 },
  { date: '2024-12-26', value: 1680 },
  { date: '2024-12-27', value: 1920 },
  { date: '2024-12-28', value: 2100 },
  { date: '2024-12-29', value: 2350 }
];

function formatValue(value: number, format: MetricData['format']): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: value < 10 ? 2 : 0
      }).format(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
  }
}

function MetricCard({ metric }: { metric: MetricData }) {
  const isPositive = metric.trend === 'up' && metric.change > 0;
  const isNegative = metric.trend === 'down' || (metric.trend === 'up' && metric.change < 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-graphite-300">{metric.name}</h3>
        <div className={`flex items-center gap-1 text-xs ${
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : isNegative ? (
            <TrendingDown className="w-3 h-3" />
          ) : null}
          {Math.abs(metric.change).toFixed(1)}%
        </div>
      </div>
      <div className="text-2xl font-medium text-gray-900 dark:text-graphite-100">
        {formatValue(metric.value, metric.format)}
      </div>
    </Card>
  );
}

function SimpleBarChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="h-64 flex items-end justify-between gap-2 p-4">
      {data.map((point, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full bg-acid rounded-t-sm min-h-2 transition-all duration-300 hover:opacity-100"
            style={{
              height: `${(point.value / maxValue) * 200}px`,
              opacity: 0.8
            }}
          />
          <div className="text-xs text-gray-900 dark:text-graphite-300 rotate-45 origin-left">
            {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      ))}
    </div>
  );
}

function SimpleLineChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  const padding = 30;
  const height = 200;
  const width = 800;
  const stepX = width / (data.length - 1);

  // Create SVG path for the line
  const linePath = data.map((point, index) => {
    const x = index * stepX;
    const y = height - ((point.value - minValue) / range) * height + padding;
    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  // Create area path (filled area under line)
  const areaPath = `${linePath} L ${width},${height + padding} L 0,${height + padding} Z`;

  return (
    <div className="h-64 p-4">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + padding * 2}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1="0"
            y1={height * ratio + padding}
            x2={width}
            y2={height * ratio + padding}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
            className="text-gray-900 dark:text-graphite-100"
          />
        ))}

        {/* Area under line */}
        <path
          d={areaPath}
          fill="url(#gradient)"
          opacity="0.2"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-acid"
        />

        {/* Data points */}
        {data.map((point, index) => {
          const x = index * stepX;
          const y = height - ((point.value - minValue) / range) * height + padding;
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="white"
                stroke="currentColor"
                strokeWidth="3"
                className="text-acid"
              />
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="transparent"
                className="cursor-pointer hover:fill-acid/10 transition-colors"
              >
                <title>{`${new Date(point.date).toLocaleDateString()}: ${point.value}`}</title>
              </circle>
            </g>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" className="text-acid" />
            <stop offset="100%" stopColor="currentColor" className="text-acid" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {data.map((point, index) => (
          <div key={index} className="text-xs text-gray-900 dark:text-graphite-300">
            {index % 2 === 0 ? new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdvancedAnalytics({ userRole }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const metrics = userRole === 'advertiser' ? advertiserMetrics :
                 userRole === 'publisher' ? publisherMetrics : adminMetrics;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-graphite-100">Advanced Analytics</h2>
          <p className="text-gray-900 dark:text-graphite-300">
            Deep insights into your {userRole} performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-graphite-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-acid/50"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100">
              Performance Trend
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant={chartType === 'bar' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === 'line' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
              >
                <Activity className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === 'pie' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setChartType('pie')}
              >
                <PieChart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {chartType === 'bar' && <SimpleBarChart data={chartData} />}
          {chartType === 'line' && <SimpleLineChart data={chartData} />}
          {chartType === 'pie' && (
            <div className="h-64 flex items-center justify-center text-gray-900 dark:text-graphite-300">
              Pie chart view coming soon
            </div>
          )}
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">
          AI-Powered Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-graphite-100">📈 Opportunities</h4>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-graphite-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                Your {userRole === 'advertiser' ? 'ROAS' : 'CPU'} has improved 12% this week
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                Peak performance hours: 2-4 PM EST
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Mobile traffic shows 28% higher conversion rates
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-graphite-100">⚠️ Action Items</h4>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-graphite-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                Consider increasing budget for high-performing campaigns
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                Review underperforming ad creatives
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                Attribution delays detected on 3 campaigns
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}