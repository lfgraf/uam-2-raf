'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Target,
  DollarSign,
  Eye,
  ChevronRight,
  Star,
  MapPin,
  Users,
  Calendar,
  Zap
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  advertiser: string;
  category: string;
  bidRange: {
    min: number;
    max: number;
  };
  estimatedRpm: number;
  requirements: {
    minTraffic: number;
    geoTargets: string[];
    categories: string[];
    quality: number;
  };
  timeline: {
    start: string;
    end: string;
    duration: string;
  };
  status: 'active' | 'ending-soon' | 'new';
  metrics: {
    fillRate: number;
    avgCtr: number;
    competition: 'low' | 'medium' | 'high';
  };
  budget: {
    total: number;
    remaining: number;
  };
}

interface BidSubmission {
  campaignId: string;
  proposedRpm: number;
  trafficAllocation: number; // percentage
  message?: string;
}

// Mock marketplace data
const campaigns: Campaign[] = [
  {
    id: 'camp_001',
    title: 'Premium Mobile Gaming App Install Campaign',
    advertiser: 'GameStudio Pro',
    category: 'Mobile Apps',
    bidRange: { min: 2.50, max: 8.00 },
    estimatedRpm: 5.25,
    requirements: {
      minTraffic: 50000,
      geoTargets: ['US', 'CA', 'UK', 'AU'],
      categories: ['Gaming', 'Tech', 'Entertainment'],
      quality: 85
    },
    timeline: {
      start: '2024-12-30',
      end: '2025-01-15',
      duration: '16 days'
    },
    status: 'new',
    metrics: {
      fillRate: 92,
      avgCtr: 2.8,
      competition: 'high'
    },
    budget: {
      total: 50000,
      remaining: 48500
    }
  },
  {
    id: 'camp_002',
    title: 'E-commerce Fashion Brand Awareness',
    advertiser: 'StyleHub Inc.',
    category: 'Fashion',
    bidRange: { min: 1.20, max: 4.50 },
    estimatedRpm: 2.80,
    requirements: {
      minTraffic: 25000,
      geoTargets: ['US', 'CA'],
      categories: ['Fashion', 'Lifestyle', 'Shopping'],
      quality: 75
    },
    timeline: {
      start: '2024-12-28',
      end: '2025-01-28',
      duration: '31 days'
    },
    status: 'active',
    metrics: {
      fillRate: 87,
      avgCtr: 1.9,
      competition: 'medium'
    },
    budget: {
      total: 25000,
      remaining: 18750
    }
  },
  {
    id: 'camp_003',
    title: 'Cryptocurrency Trading Platform',
    advertiser: 'CryptoTrade Labs',
    category: 'Finance',
    bidRange: { min: 5.00, max: 15.00 },
    estimatedRpm: 8.50,
    requirements: {
      minTraffic: 100000,
      geoTargets: ['US', 'UK', 'DE', 'SG'],
      categories: ['Finance', 'Tech', 'Investment'],
      quality: 90
    },
    timeline: {
      start: '2024-12-25',
      end: '2025-01-05',
      duration: '3 days left'
    },
    status: 'ending-soon',
    metrics: {
      fillRate: 95,
      avgCtr: 3.2,
      competition: 'high'
    },
    budget: {
      total: 100000,
      remaining: 15000
    }
  }
];

function getStatusColor(status: Campaign['status']) {
  switch (status) {
    case 'new':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'ending-soon':
      return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
  }
}

function getCompetitionColor(competition: Campaign['metrics']['competition']) {
  switch (competition) {
    case 'low':
      return 'text-green-600 dark:text-green-400';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'high':
      return 'text-red-600 dark:text-red-400';
  }
}

function BiddingModal({ campaign, onClose, onSubmit }: {
  campaign: Campaign;
  onClose: () => void;
  onSubmit: (bid: BidSubmission) => void;
}) {
  const [proposedRpm, setProposedRpm] = useState(campaign.estimatedRpm);
  const [trafficAllocation, setTrafficAllocation] = useState(50);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit({
      campaignId: campaign.id,
      proposedRpm,
      trafficAllocation,
      message
    });
    onClose();
  };

  const estimatedRevenue = (proposedRpm * trafficAllocation * 1000) / 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Submit Bid: {campaign.title}
          </h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="text-sm text-gray-900 dark:text-white/60">Bid Range</div>
              <div className="font-medium text-gray-900 dark:text-white">
                ${campaign.bidRange.min.toFixed(2)} - ${campaign.bidRange.max.toFixed(2)} RPM
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-900 dark:text-white/60">Competition</div>
              <div className={`font-medium capitalize ${getCompetitionColor(campaign.metrics.competition)}`}>
                {campaign.metrics.competition}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Proposed RPM: ${proposedRpm.toFixed(2)}
            </label>
            <input
              type="range"
              min={campaign.bidRange.min}
              max={campaign.bidRange.max}
              step={0.25}
              value={proposedRpm}
              onChange={(e) => setProposedRpm(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-900 dark:text-white/60 mt-1">
              <span>${campaign.bidRange.min.toFixed(2)}</span>
              <span>${campaign.bidRange.max.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Traffic Allocation: {trafficAllocation}%
            </label>
            <input
              type="range"
              min={10}
              max={100}
              step={10}
              value={trafficAllocation}
              onChange={(e) => setTrafficAllocation(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-900 dark:text-white/60 mt-1">
              Allocate {trafficAllocation}% of your traffic to this campaign
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Message to Advertiser (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the advertiser about your traffic quality, audience, or any questions..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </div>

          <div className="p-4 bg-brand/5 rounded-lg border border-brand/20">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Estimated Monthly Revenue</h4>
            <div className="text-2xl font-medium text-brand">
              ${estimatedRevenue.toFixed(0)}
            </div>
            <div className="text-sm text-gray-900 dark:text-white/60">
              Based on ${proposedRpm.toFixed(2)} RPM and {trafficAllocation}% traffic allocation
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Bid
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AdvancedMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rpm');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = campaigns
    .filter(campaign =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'all' || campaign.category.toLowerCase() === categoryFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rpm':
          return b.estimatedRpm - a.estimatedRpm;
        case 'budget':
          return b.budget.remaining - a.budget.remaining;
        case 'competition':
          return a.metrics.competition.localeCompare(b.metrics.competition);
        default:
          return 0;
      }
    });

  const handleBidSubmit = (bid: BidSubmission) => {
    console.log('Bid submitted:', bid);
    // Handle bid submission logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
          Campaign Marketplace
        </h1>
        <p className="text-gray-900 dark:text-white/60">
          Browse and bid on premium advertising campaigns
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
          >
            <option value="all">All Categories</option>
            <option value="mobile apps">Mobile Apps</option>
            <option value="fashion">Fashion</option>
            <option value="finance">Finance</option>
            <option value="tech">Tech</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
          >
            <option value="rpm">Sort by RPM</option>
            <option value="budget">Sort by Budget</option>
            <option value="competition">Sort by Competition</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || categoryFilter !== 'all' || sortBy !== 'rpm') && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-900 dark:text-white/60">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-full">
                Search: &ldquo;{searchTerm}&rdquo;
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-full capitalize">
                {categoryFilter}
              </span>
            )}
            {sortBy !== 'rpm' && (
              <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-full">
                Sorted by {sortBy}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setSortBy('rpm');
              }}
              className="text-xs text-gray-900 dark:text-white/60 hover:text-brand ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-900 dark:text-white/60">
          Showing {filteredCampaigns.length} of {campaigns.length} campaigns
        </p>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {campaign.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(campaign.status)}`}>
                    {campaign.status === 'ending-soon' ? 'Ending Soon' :
                     campaign.status === 'new' ? 'New' : 'Active'}
                  </span>
                </div>
                <p className="text-sm text-gray-900 dark:text-white/60">
                  by {campaign.advertiser}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-medium text-brand">
                  ${campaign.estimatedRpm.toFixed(2)}
                </div>
                <div className="text-xs text-gray-900 dark:text-white/60">Est. RPM</div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {campaign.metrics.fillRate}%
                  </div>
                  <div className="text-xs text-gray-900 dark:text-white/60">Fill Rate</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {campaign.metrics.avgCtr.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-900 dark:text-white/60">Avg CTR</div>
                </div>
                <div>
                  <div className={`text-sm font-medium capitalize ${getCompetitionColor(campaign.metrics.competition)}`}>
                    {campaign.metrics.competition}
                  </div>
                  <div className="text-xs text-gray-900 dark:text-white/60">Competition</div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white/70">
                  <Users className="w-4 h-4" />
                  Min. {campaign.requirements.minTraffic.toLocaleString()} monthly visitors
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white/70">
                  <MapPin className="w-4 h-4" />
                  {campaign.requirements.geoTargets.join(', ')}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white/70">
                  <Star className="w-4 h-4" />
                  {campaign.requirements.quality}+ quality score required
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white/70">
                  <Calendar className="w-4 h-4" />
                  {campaign.timeline.duration}
                </div>
              </div>

              {/* Budget Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-900 dark:text-white/60">Budget Remaining</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${campaign.budget.remaining.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-brand h-2 rounded-full"
                    style={{
                      width: `${(campaign.budget.remaining / campaign.budget.total) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Submit Bid
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bidding Modal */}
      {selectedCampaign && (
        <BiddingModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSubmit={handleBidSubmit}
        />
      )}
    </div>
  );
}