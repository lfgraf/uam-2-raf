'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Eye,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface RevenueEntry {
  id: string;
  propertyName: string;
  campaignName: string;
  advertiserName: string;
  date: string;
  impressions: number;
  clicks: number;
  revenue: number;
  rpm: number;
  ctr: number;
  status: 'confirmed' | 'pending' | 'disputed';
  paymentStatus: 'paid' | 'pending' | 'processing';
  transactionId?: string;
}

interface PropertyRevenue {
  propertyName: string;
  totalRevenue: number;
  growth: number;
  rpm: number;
  impressions: number;
  clicks: number;
}

// Mock revenue data
const revenueEntries: RevenueEntry[] = [
  {
    id: 'rev_001',
    propertyName: 'TechBlog.com',
    campaignName: 'Mobile Gaming App Install',
    advertiserName: 'GameStudio Pro',
    date: '2024-12-29',
    impressions: 15000,
    clicks: 420,
    revenue: 1050.00,
    rpm: 0.07,
    ctr: 2.8,
    status: 'confirmed',
    paymentStatus: 'paid',
    transactionId: '0x1234...5678'
  },
  {
    id: 'rev_002',
    propertyName: 'NewsPortal.net',
    campaignName: 'E-commerce Holiday Sale',
    advertiserName: 'StyleHub Inc.',
    date: '2024-12-29',
    impressions: 28000,
    clicks: 532,
    revenue: 798.00,
    rpm: 0.029,
    ctr: 1.9,
    status: 'confirmed',
    paymentStatus: 'processing',
  },
  {
    id: 'rev_003',
    propertyName: 'FinanceTracker App',
    campaignName: 'Crypto Trading Platform',
    advertiserName: 'CryptoTrade Labs',
    date: '2024-12-28',
    impressions: 8500,
    clicks: 272,
    revenue: 2312.00,
    rpm: 0.272,
    ctr: 3.2,
    status: 'pending',
    paymentStatus: 'pending',
  }
];

const propertyRevenueData: PropertyRevenue[] = [
  {
    propertyName: 'TechBlog.com',
    totalRevenue: 4250.00,
    growth: 18.5,
    rpm: 0.082,
    impressions: 125000,
    clicks: 3200
  },
  {
    propertyName: 'NewsPortal.net',
    totalRevenue: 2890.00,
    growth: -5.2,
    rpm: 0.031,
    impressions: 187000,
    clicks: 4100
  },
  {
    propertyName: 'FinanceTracker App',
    totalRevenue: 8920.00,
    growth: 45.8,
    rpm: 0.285,
    impressions: 89000,
    clicks: 2850
  }
];

function getStatusIcon(status: RevenueEntry['status']) {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'disputed':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
  }
}

function getPaymentStatusColor(status: RevenueEntry['paymentStatus']) {
  switch (status) {
    case 'paid':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'processing':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
  }
}

export function PublisherRevenue() {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const totalRevenue = revenueEntries.reduce((sum, entry) => sum + entry.revenue, 0);
  const totalImpressions = revenueEntries.reduce((sum, entry) => sum + entry.impressions, 0);
  const totalClicks = revenueEntries.reduce((sum, entry) => sum + entry.clicks, 0);
  const averageRpm = totalRevenue / totalImpressions;
  const averageCtr = (totalClicks / totalImpressions) * 100;

  const pendingRevenue = revenueEntries
    .filter(entry => entry.paymentStatus === 'pending')
    .reduce((sum, entry) => sum + entry.revenue, 0);

  if (loading) {
    return <LoadingState type="dashboard" showProgress={true} progressText="Loading revenue data..." />;
  }

  if (showEmptyState) {
    return (
      <EmptyState
        type="revenue"
        userRole="publisher"
        onAction={() => window.location.href = '/dashboard/publisher/marketplace'}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Dashboard</h1>
          <p className="text-gray-900 dark:text-white/60">
            Track your earnings across all properties and campaigns
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEmptyState(!showEmptyState)}
          >
            {showEmptyState ? 'Show Data' : 'Demo Empty'}
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white/60">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% from last period
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white/60">Pending Revenue</h3>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${pendingRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-900 dark:text-white/60 mt-1">
            Awaiting confirmation
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white/60">Average RPM</h3>
            <TrendingUp className="w-5 h-5 text-brand" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${averageRpm.toFixed(3)}
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
            <TrendingUp className="w-3 h-3" />
            +8.2% improvement
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white/60">Average CTR</h3>
            <Eye className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {averageCtr.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-900 dark:text-white/60 mt-1">
            {totalClicks.toLocaleString()} clicks
          </div>
        </Card>
      </div>

      {/* Property Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Property Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {propertyRevenueData.map((property, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">{property.propertyName}</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-white/60">Revenue</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${property.totalRevenue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-white/60">Growth</span>
                  <div className={`flex items-center gap-1 text-sm ${
                    property.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {property.growth > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(property.growth).toFixed(1)}%
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-white/60">RPM</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${property.rpm.toFixed(3)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-white/60">Impressions</span>
                  <span className="text-sm text-gray-900 dark:text-white/80">
                    {property.impressions.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Revenue Entries */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Revenue Entries</h2>
        <div className="space-y-4">
          {revenueEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{entry.propertyName}</h4>
                  {getStatusIcon(entry.status)}
                  <span className={`px-2 py-1 text-xs rounded-full border capitalize ${getPaymentStatusColor(entry.paymentStatus)}`}>
                    {entry.paymentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-900 dark:text-white/60">
                  <div>
                    <span className="block">Campaign</span>
                    <span className="font-medium text-gray-900 dark:text-white">{entry.campaignName}</span>
                  </div>
                  <div>
                    <span className="block">Advertiser</span>
                    <span className="font-medium text-gray-900 dark:text-white">{entry.advertiserName}</span>
                  </div>
                  <div>
                    <span className="block">Impressions</span>
                    <span className="font-medium text-gray-900 dark:text-white">{entry.impressions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block">CTR</span>
                    <span className="font-medium text-gray-900 dark:text-white">{entry.ctr.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="text-right ml-6">
                <div className="text-xl font-bold text-green-600 mb-1">
                  ${entry.revenue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-900 dark:text-white/60">
                  ${entry.rpm.toFixed(3)} RPM
                </div>
                {entry.transactionId && (
                  <div className="flex items-center gap-1 text-xs text-gray-900 dark:text-white/50 mt-1">
                    <span>TX: {entry.transactionId}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                Automated Blockchain Payments
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                Revenue is automatically calculated and paid out daily through smart contracts.
                All transactions are verified on-chain for complete transparency.
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                • Minimum payout: $10 • Payment frequency: Daily • Settlement time: ~2-10 minutes
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}