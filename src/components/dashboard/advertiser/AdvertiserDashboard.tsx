'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { CampaignCard } from './CampaignCard';
import { StatsCard } from '../shared/StatsCard';
import { BidReviewModal } from '../shared/BidReviewModal';
import { ClaimFundsModal } from '../shared/ClaimFundsModal';
import { PlusCircle, TrendingUp, Target, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';

// Mock data
const stats = [
  {
    title: 'Total Spend',
    value: '$12,450',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign
  },
  {
    title: 'Active Campaigns',
    value: '8',
    change: '+2',
    trend: 'up' as const,
    icon: Target
  },
  {
    title: 'Conversions',
    value: '2,345',
    change: '+18.2%',
    trend: 'up' as const,
    icon: TrendingUp
  },
  {
    title: 'Avg. CPC',
    value: '$0.65',
    change: '-5.3%',
    trend: 'down' as const,
    icon: Users
  }
];

const campaigns = [
  {
    id: '1',
    name: 'Q4 Mobile App Install',
    state: 'active' as const,
    status: 'active' as const,
    budget: 5000,
    spent: 3240,
    conversions: 1250,
    cpc: 0.72,
    endDate: '2024-12-31',
    performance: 'good' as const
  },
  {
    id: '2',
    name: 'Black Friday Sale',
    state: 'active' as const,
    status: 'active' as const,
    budget: 8000,
    spent: 7650,
    conversions: 2100,
    cpc: 0.58,
    endDate: '2024-11-30',
    performance: 'excellent' as const
  },
  {
    id: '3',
    name: 'Brand Awareness - Gaming',
    state: 'bidding' as const,
    status: 'paused' as const,
    budget: 3000,
    spent: 890,
    conversions: 145,
    cpc: 0.95,
    endDate: '2024-12-15',
    performance: 'poor' as const
  },
  {
    id: '4',
    name: 'Holiday Email Signups',
    state: 'expired' as const,
    status: 'paused' as const,
    budget: 2500,
    spent: 1200,
    conversions: 680,
    cpc: 0.45,
    endDate: '2024-12-20',
    performance: 'good' as const
  }
];

// Mock recent activity with bid data
const recentActivity = [
  {
    id: '1',
    type: 'bid' as const,
    title: 'New Bid Received',
    description: 'Premium Publisher wants to feature your campaign',
    time: '2h ago',
    bidData: {
      id: 'bid-001',
      campaignName: 'Q4 Mobile App Install',
      advertiser: 'Premium Publisher Network',
      bidAmount: '$2,500',
      cpu: '$5.25',
      impressions: '500K'
    }
  },
  {
    id: '2',
    type: 'alert' as const,
    title: 'Budget Alert',
    description: 'Black Friday Sale 95% spent',
    time: '4h ago'
  },
  {
    id: '3',
    type: 'milestone' as const,
    title: 'Conversion Goal Met',
    description: 'Holiday Email Signups',
    time: '1d ago'
  }
];

export function AdvertiserDashboard() {
  // Toggle this to show empty state demo
  const showEmptyState = false; // Set to true to see empty state
  const displayCampaigns = showEmptyState ? [] : campaigns;

  const [selectedBid, setSelectedBid] = useState<typeof recentActivity[0]['bidData'] | null>(null);
  const [claimFundsCampaign, setClaimFundsCampaign] = useState<{ id: string; name: string; amount: number } | null>(null);

  const handleClaimFunds = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      const unspentAmount = campaign.budget - campaign.spent;
      setClaimFundsCampaign({
        id: campaign.id,
        name: campaign.name,
        amount: unspentAmount
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100">Campaign Dashboard</h1>
          <p className="text-gray-900 dark:text-graphite-300">Monitor and manage your advertising campaigns</p>
        </div>
        <Link href="/dashboard/advertiser/create">
          <Button className="inline-flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-graphite-100">Active Campaigns</h2>
              <Link href="/dashboard/advertiser/campaigns">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {displayCampaigns.length > 0 ? (
                displayCampaigns.slice(0, 3).map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onClaimFunds={handleClaimFunds}
                  />
                ))
              ) : (
                <EmptyState
                  type="campaigns"
                  userRole="advertiser"
                  showSampleData={true}
                  onAction={() => window.location.href = '/dashboard/advertiser/create'}
                />
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/advertiser/create">
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create New Campaign
                </Button>
              </Link>
              <Link href="/dashboard/advertiser/auctions">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Manage Bids
                </Button>
              </Link>
              <Link href="/dashboard/advertiser/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={activity.type === 'bid' ? 'flex justify-between items-start p-2 -m-2 rounded-lg hover:bg-gray-50 dark:hover:bg-graphite-850 cursor-pointer transition-colors' : 'flex justify-between items-start'}
                  onClick={() => {
                    if (activity.type === 'bid' && activity.bidData) {
                      setSelectedBid(activity.bidData);
                    }
                  }}
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-graphite-100">
                      {activity.title}
                      {activity.type === 'bid' && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-acid/10 text-acid rounded-full">
                          Action Required
                        </span>
                      )}
                    </div>
                    <div className="text-gray-900 dark:text-graphite-300">{activity.description}</div>
                  </div>
                  <div className="text-xs text-gray-900 dark:text-graphite-500 flex-shrink-0 ml-2">{activity.time}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bid Review Modal */}
          {selectedBid && (
            <BidReviewModal
              isOpen={!!selectedBid}
              onClose={() => setSelectedBid(null)}
              bid={selectedBid}
            />
          )}
        </div>
      </div>

      {/* Claim Funds Modal */}
      {claimFundsCampaign && (
        <ClaimFundsModal
          isOpen={!!claimFundsCampaign}
          onClose={() => setClaimFundsCampaign(null)}
          campaignName={claimFundsCampaign.name}
          claimableAmount={`$${claimFundsCampaign.amount.toLocaleString()}`}
          walletAddress="0x1234...5678"
        />
      )}
    </div>
  );
}