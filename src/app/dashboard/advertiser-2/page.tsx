'use client';

import { Plus, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { SharpCard } from '@/components/advertiser-2/SharpCard';
import { SharpButton } from '@/components/advertiser-2/SharpButton';
import { SharpBadge } from '@/components/advertiser-2/SharpBadge';

const stats = [
  { value: '192', label: 'Total Campaigns' },
  { value: '32', label: 'Total Campaigns' },
  { value: '$3.2', label: 'Total Campaigns' },
  { value: '6', label: 'Total Campaigns' }
];

const campaigns = [
  {
    id: 1,
    name: 'Luckyman',
    cpu: '$2.5',
    audience: 'Sportware',
    status: 'pending',
    icon: '⚡'
  },
  {
    id: 2,
    name: 'DeFi Protocol Launch',
    cpu: '$3.5',
    audience: 'Crypto',
    status: 'live',
    icon: '⚡'
  },
  {
    id: 3,
    name: 'NFT Marketplace Promotion',
    cpu: '$4',
    audience: 'Technology',
    status: 'pending',
    icon: '⚡'
  },
  {
    id: 4,
    name: 'Tech Startup Ecosystem',
    cpu: '$2.5',
    audience: 'Fashion',
    status: 'live',
    icon: '⚡'
  },
  {
    id: 5,
    name: 'Sustainable Fashion Initiative',
    cpu: '$2.5',
    audience: 'Gaming',
    status: 'live',
    icon: '⚡'
  }
];

const tabs = [
  { label: 'All Campaigns', count: 8, active: true },
  { label: 'Active Bids', count: 3, active: false },
  { label: 'Live Only', count: 3, active: false }
];

export default function Advertiser2Page() {
  return (
    <div className="min-h-screen bg-[#1A202C] text-graphite-100">
      {/* Header */}
      <div className="border-b border-[#2D3748] px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-medium text-white mb-2">
              Campaign Management
            </h1>
            <p className="text-graphite-400">Portfolio Overview</p>
          </div>
          <SharpButton variant="primary" size="lg">
            <Plus className="w-4 h-4" />
            New Campaign
          </SharpButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <SharpCard key={index} className="p-6">
              <div className="text-5xl font-medium text-white mb-4">
                {stat.value}
              </div>
              <div className="text-sm text-graphite-400">
                {stat.label}
              </div>
            </SharpCard>
          ))}
        </div>

        {/* Campaigns Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-white">Campaigns</h2>
            <SharpButton variant="secondary" size="sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </SharpButton>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors
                  ${tab.active
                    ? 'bg-[#2D3748] text-white'
                    : 'bg-transparent text-graphite-400 hover:text-graphite-200'
                  }
                `}
              >
                {tab.label}
                <span className="ml-2 text-graphite-500">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Table */}
          <SharpCard>
            {/* Table Header */}
            <div className="grid grid-cols-[1fr,120px,180px,140px,120px] gap-4 px-6 py-4 border-b border-[#374151]">
              <div className="text-xs font-medium text-graphite-500 uppercase tracking-wider">
                Campaign
              </div>
              <div className="text-xs font-medium text-graphite-500 uppercase tracking-wider">
                CPU
              </div>
              <div className="text-xs font-medium text-graphite-500 uppercase tracking-wider">
                Audience
              </div>
              <div className="text-xs font-medium text-graphite-500 uppercase tracking-wider">
                Status
              </div>
              <div className="text-xs font-medium text-graphite-500 uppercase tracking-wider">
                Action
              </div>
            </div>

            {/* Table Rows */}
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="grid grid-cols-[1fr,120px,180px,140px,120px] gap-4 px-6 py-5 border-b border-[#374151] last:border-0 hover:bg-[#2D3748] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-acid flex items-center justify-center text-graphite-950 text-lg">
                    {campaign.icon}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {campaign.name}
                  </span>
                </div>
                <div className="flex items-center text-sm text-graphite-300">
                  {campaign.cpu}
                </div>
                <div className="flex items-center">
                  <SharpBadge variant="audience">
                    ⭐ {campaign.audience}
                  </SharpBadge>
                </div>
                <div className="flex items-center">
                  <SharpBadge variant={campaign.status as 'live' | 'pending'}>
                    {campaign.status}
                  </SharpBadge>
                </div>
                <div className="flex items-center">
                  <SharpButton variant="secondary" size="sm">
                    Bid
                  </SharpButton>
                </div>
              </div>
            ))}
          </SharpCard>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <SharpButton variant="secondary" size="sm">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </SharpButton>
            <span className="text-sm text-graphite-400">
              1-7 <span className="text-graphite-600">of</span> 120
            </span>
            <SharpButton variant="secondary" size="sm">
              Next
              <ChevronRight className="w-4 h-4" />
            </SharpButton>
          </div>
        </div>
      </div>
    </div>
  );
}
