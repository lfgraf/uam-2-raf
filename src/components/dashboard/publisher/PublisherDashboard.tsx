'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PropertyCard } from './PropertyCard';
import { StatsCard } from '../shared/StatsCard';
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
    title: 'Avg. RPM',
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
    rpm: 2.89,
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
    rpm: 2.15,
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
    rpm: 3.45,
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
    rpm: 1.85,
    status: 'paused' as const,
    performance: 'poor' as const
  }
];

export function PublisherDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100">Publisher Dashboard</h1>
          <p className="text-gray-900 dark:text-graphite-300">Manage your properties and track revenue</p>
        </div>
        <Button className="inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
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
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
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
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900 dark:text-graphite-100">Payment Received</div>
                  <div className="text-gray-900 dark:text-graphite-300">$1,240 for October</div>
                </div>
                <div className="text-xs text-gray-900 dark:text-graphite-500">2h ago</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900 dark:text-graphite-100">New Campaign Match</div>
                  <div className="text-gray-900 dark:text-graphite-300">Mobile App Install campaign</div>
                </div>
                <div className="text-xs text-gray-900 dark:text-graphite-500">5h ago</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900 dark:text-graphite-100">Property Verified</div>
                  <div className="text-gray-900 dark:text-graphite-300">TechBlog Pro approved</div>
                </div>
                <div className="text-xs text-gray-900 dark:text-graphite-500">1d ago</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}