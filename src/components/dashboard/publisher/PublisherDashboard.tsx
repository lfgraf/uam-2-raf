'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PropertyCard } from './PropertyCard';
import { StatsCard } from '../shared/StatsCard';
import { BidReviewModal } from '../shared/BidReviewModal';
import { Plus, DollarSign, BarChart3, Target, Eye } from 'lucide-react';
import Link from 'next/link';

// Mock data
const stats = [
  {
    title: 'Total Revenue',
    value: '$8,240',
    change: '+22.5%',
    trend: 'up' as const,
    icon: DollarSign
  },
  {
    title: 'Active Properties',
    value: '12',
    change: '+3',
    trend: 'up' as const,
    icon: Target
  },
  {
    title: 'Page Views',
    value: '847K',
    change: '+15.3%',
    trend: 'up' as const,
    icon: Eye
  },
  {
    title: 'Avg. CPU',
    value: '$2.45',
    change: '+8.7%',
    trend: 'up' as const,
    icon: BarChart3
  }
];

const properties = [
  {
    id: '1',
    name: 'TechBlog Pro',
    url: 'techblog.com',
    category: 'Technology',
    monthlyViews: 245000,
    revenue: 2450,
    cpu: 2.89,
    status: 'active' as const,
    performance: 'excellent' as const
  },
  {
    id: '2',
    name: 'Gaming News Hub',
    url: 'gamingnews.io',
    category: 'Gaming',
    monthlyViews: 180000,
    revenue: 1890,
    cpu: 2.15,
    status: 'active' as const,
    performance: 'good' as const
  },
  {
    id: '3',
    name: 'Fitness Journey',
    url: 'fitnessjourney.net',
    category: 'Health & Fitness',
    monthlyViews: 95000,
    revenue: 1240,
    cpu: 3.45,
    status: 'active' as const,
    performance: 'excellent' as const
  },
  {
    id: '4',
    name: 'Crypto Insights',
    url: 'cryptoinsights.com',
    category: 'Finance',
    monthlyViews: 75000,
    revenue: 580,
    cpu: 1.85,
    status: 'paused' as const,
    performance: 'poor' as const
  }
];

// Mock recent activity with bid data
const recentActivity = [
  {
    id: '1',
    type: 'bid' as const,
    title: 'New Campaign Opportunity',
    description: 'Fashion retailer wants to run ads on TechBlog',
    time: '1h ago',
    bidData: {
      id: 'bid-002',
      campaignName: 'Fall Fashion Collection 2024',
      advertiser: 'FashionCo Inc.',
      bidAmount: '$3,200',
      cpu: '$6.40',
      impressions: '500K'
    }
  },
  {
    id: '2',
    type: 'payment' as const,
    title: 'Payment Received',
    description: '$1,240 for October',
    time: '2h ago'
  },
  {
    id: '3',
    type: 'alert' as const,
    title: 'Traffic Spike',
    description: 'TechBlog +45% impressions today',
    time: '5h ago'
  }
];

export function PublisherDashboard() {
  const [selectedBid, setSelectedBid] = useState<typeof recentActivity[0]['bidData'] | null>(null);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100">Publisher Dashboard</h1>
          <p className="text-gray-900 dark:text-graphite-300">Manage your properties and track revenue</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-graphite-100">My Properties</h2>
              <Link href="/dashboard/publisher/properties">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/publisher/marketplace">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Browse Campaigns
                </Button>
              </Link>
              <Link href="/dashboard/publisher/revenue">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Revenue
                </Button>
              </Link>
            </div>
          </Card>

          {/* Available Campaigns */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">Available Campaigns</h3>
            <div className="space-y-3">
              <div className="border border-gray-200 dark:border-graphite-700 rounded-lg p-3">
                <div className="font-medium text-gray-900 dark:text-graphite-100 text-sm">Mobile App Install</div>
                <div className="text-gray-900 dark:text-graphite-300 text-xs mt-1">Gaming · $1.25 CPC</div>
                <div className="text-acid text-xs mt-2">High Match Score</div>
              </div>
              <div className="border border-gray-200 dark:border-graphite-700 rounded-lg p-3">
                <div className="font-medium text-gray-900 dark:text-graphite-100 text-sm">E-commerce Sale</div>
                <div className="text-gray-900 dark:text-graphite-300 text-xs mt-1">Retail · $0.85 CPC</div>
                <div className="text-green-600 text-xs mt-2">Good Match Score</div>
              </div>
              <div className="border border-gray-200 dark:border-graphite-700 rounded-lg p-3">
                <div className="font-medium text-gray-900 dark:text-graphite-100 text-sm">Newsletter Signup</div>
                <div className="text-gray-900 dark:text-graphite-300 text-xs mt-1">Tech · $0.45 CPC</div>
                <div className="text-yellow-600 text-xs mt-2">Medium Match</div>
              </div>
            </div>
            <Link href="/dashboard/publisher/marketplace">
              <Button size="sm" className="w-full mt-4">
                View All Campaigns
              </Button>
            </Link>
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
        </div>
      </div>

      {/* Bid Review Modal */}
      {selectedBid && (
        <BidReviewModal
          isOpen={!!selectedBid}
          onClose={() => setSelectedBid(null)}
          bid={selectedBid}
        />
      )}
    </div>
  );
}