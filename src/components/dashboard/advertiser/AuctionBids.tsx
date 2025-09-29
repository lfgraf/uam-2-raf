'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import {
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Eye,
  Edit3,
  Pause,
  Play,
  MoreHorizontal,
  Filter,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Bid {
  id: string;
  campaignId: string;
  campaignName: string;
  publisherName: string;
  publisherTraffic: number;
  bidAmount: number;
  bidType: 'cpc' | 'cpm' | 'cpa';
  status: 'active' | 'paused' | 'pending' | 'rejected' | 'expired';
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    ctr: number;
    conversionRate: number;
  };
  timeframe: {
    startDate: string;
    endDate: string;
    duration: string;
  };
  competition: 'low' | 'medium' | 'high';
  estimatedReach: number;
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock bid data
const mockBids: Bid[] = [
  {
    id: 'bid_001',
    campaignId: 'camp_001',
    campaignName: 'Mobile Gaming App Install',
    publisherName: 'GameTraffic Pro',
    publisherTraffic: 250000,
    bidAmount: 2.50,
    bidType: 'cpc',
    status: 'active',
    performance: {
      impressions: 45000,
      clicks: 1250,
      conversions: 89,
      spend: 3125,
      ctr: 2.78,
      conversionRate: 7.12
    },
    timeframe: {
      startDate: '2024-12-25',
      endDate: '2025-01-15',
      duration: '21 days'
    },
    competition: 'high',
    estimatedReach: 180000,
    lastUpdated: '2024-12-29T10:30:00Z',
    priority: 'high'
  },
  {
    id: 'bid_002',
    campaignId: 'camp_002',
    campaignName: 'E-commerce Holiday Sale',
    publisherName: 'ShopTraffic Network',
    publisherTraffic: 180000,
    bidAmount: 1.75,
    bidType: 'cpc',
    status: 'pending',
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      ctr: 0,
      conversionRate: 0
    },
    timeframe: {
      startDate: '2024-12-30',
      endDate: '2025-01-30',
      duration: '31 days'
    },
    competition: 'medium',
    estimatedReach: 120000,
    lastUpdated: '2024-12-29T14:15:00Z',
    priority: 'medium'
  },
  {
    id: 'bid_003',
    campaignId: 'camp_003',
    campaignName: 'Crypto Trading Platform',
    publisherName: 'FinanceHub',
    publisherTraffic: 95000,
    bidAmount: 8.50,
    bidType: 'cpc',
    status: 'paused',
    performance: {
      impressions: 12000,
      clicks: 156,
      conversions: 23,
      spend: 1326,
      ctr: 1.30,
      conversionRate: 14.74
    },
    timeframe: {
      startDate: '2024-12-20',
      endDate: '2025-01-20',
      duration: '31 days'
    },
    competition: 'high',
    estimatedReach: 75000,
    lastUpdated: '2024-12-28T09:45:00Z',
    priority: 'high'
  },
  {
    id: 'bid_004',
    campaignId: 'camp_001',
    campaignName: 'Mobile Gaming App Install',
    publisherName: 'AppDiscovery Plus',
    publisherTraffic: 320000,
    bidAmount: 2.25,
    bidType: 'cpc',
    status: 'rejected',
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      ctr: 0,
      conversionRate: 0
    },
    timeframe: {
      startDate: '2024-12-28',
      endDate: '2025-01-28',
      duration: '31 days'
    },
    competition: 'high',
    estimatedReach: 200000,
    lastUpdated: '2024-12-29T08:20:00Z',
    priority: 'low'
  }
];

function getStatusIcon(status: Bid['status']) {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'paused':
      return <Pause className="w-4 h-4 text-yellow-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-blue-500" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'expired':
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
}

function getStatusColor(status: Bid['status']) {
  switch (status) {
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'paused':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
    case 'pending':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'rejected':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    case 'expired':
      return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
  }
}

function getCompetitionColor(competition: Bid['competition']) {
  switch (competition) {
    case 'low':
      return 'text-green-600 dark:text-green-400';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'high':
      return 'text-red-600 dark:text-red-400';
  }
}

function getPriorityColor(priority: Bid['priority']) {
  switch (priority) {
    case 'high':
      return 'text-red-600 dark:text-red-400';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'low':
      return 'text-green-600 dark:text-green-400';
  }
}

function BidCard({ bid }: { bid: Bid }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {bid.publisherName}
              </h3>
              <span className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusColor(bid.status)}`}>
                {getStatusIcon(bid.status)}
                <span className="ml-1">{bid.status}</span>
              </span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white/60">
              Campaign: {bid.campaignName}
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-brand">
              ${bid.bidAmount.toFixed(2)}
            </div>
            <div className="text-xs text-gray-900 dark:text-white/60 uppercase">
              {bid.bidType}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {bid.performance.impressions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-900 dark:text-white/60">Impressions</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {bid.performance.clicks.toLocaleString()}
            </div>
            <div className="text-xs text-gray-900 dark:text-white/60">Clicks</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {bid.performance.conversions}
            </div>
            <div className="text-xs text-gray-900 dark:text-white/60">Conversions</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              ${bid.performance.spend.toLocaleString()}
            </div>
            <div className="text-xs text-gray-900 dark:text-white/60">Spent</div>
          </div>
        </div>

        {/* Performance Indicators */}
        {bid.performance.ctr > 0 && (
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-900 dark:text-white/70">
                CTR: <span className="font-medium">{bid.performance.ctr.toFixed(2)}%</span>
              </span>
              <span className="text-gray-900 dark:text-white/70">
                CVR: <span className="font-medium">{bid.performance.conversionRate.toFixed(2)}%</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium capitalize ${getCompetitionColor(bid.competition)}`}>
                {bid.competition} competition
              </span>
              <span className={`text-sm font-medium capitalize ${getPriorityColor(bid.priority)}`}>
                {bid.priority} priority
              </span>
            </div>
          </div>
        )}

        {/* Publisher Info */}
        <div className="flex justify-between items-center text-sm text-gray-900 dark:text-white/60">
          <span>
            Monthly Traffic: <span className="font-medium">{bid.publisherTraffic.toLocaleString()}</span>
          </span>
          <span>
            Est. Reach: <span className="font-medium">{bid.estimatedReach.toLocaleString()}</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {bid.status === 'active' && (
            <Button size="sm" variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}

          {bid.status === 'paused' && (
            <Button size="sm" variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          )}

          {(bid.status === 'pending' || bid.status === 'rejected') && (
            <Button size="sm" variant="outline">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Bid
            </Button>
          )}

          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>

          <Button size="sm" variant="ghost">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Timeframe</h5>
                <p className="text-gray-900 dark:text-white/70">
                  {new Date(bid.timeframe.startDate).toLocaleDateString()} - {new Date(bid.timeframe.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-900 dark:text-white/60 text-xs">Duration: {bid.timeframe.duration}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Last Updated</h5>
                <p className="text-gray-900 dark:text-white/70">
                  {new Date(bid.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      </div>
    </Card>
  );
}

export function AuctionBids() {
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const filteredBids = mockBids.filter(bid => {
    const matchesStatus = statusFilter === 'all' || bid.status === statusFilter;
    const matchesSearch = bid.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.publisherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const displayBids = showEmptyState ? [] : filteredBids;

  const stats = {
    total: mockBids.length,
    active: mockBids.filter(b => b.status === 'active').length,
    pending: mockBids.filter(b => b.status === 'pending').length,
    totalSpend: mockBids.reduce((sum, b) => sum + b.performance.spend, 0),
    totalConversions: mockBids.reduce((sum, b) => sum + b.performance.conversions, 0)
  };

  if (loading) {
    return <LoadingState type="dashboard" showProgress={true} progressText="Loading auction bids..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Auction Bids</h1>
          <p className="text-gray-900 dark:text-white/60">
            Manage your bids across publisher auctions and marketplace opportunities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setLoading(true)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Total Bids</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Pending</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-brand">${stats.totalSpend.toLocaleString()}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Total Spend</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.totalConversions}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Conversions</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns or publishers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="paused">Paused</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>

          <Button
            variant="outline"
            onClick={() => setShowEmptyState(!showEmptyState)}
            className="text-xs"
          >
            {showEmptyState ? 'Show Data' : 'Demo Empty'}
          </Button>
        </div>
      </Card>

      {/* Bids List */}
      {displayBids.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {displayBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </div>
      ) : (
        <EmptyState
          type="search"
          title={searchTerm || statusFilter !== 'all' ? 'No Matching Bids' : 'No Auction Bids Yet'}
          message={
            searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search terms or filters to find auction bids.'
              : 'Start by browsing the marketplace and submitting bids on publisher inventory that matches your campaign goals.'
          }
          onAction={() => window.location.href = '/dashboard/publisher/marketplace'}
          actionText="Browse Marketplace"
          userRole="advertiser"
        />
      )}
    </div>
  );
}