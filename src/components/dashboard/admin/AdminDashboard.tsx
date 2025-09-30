'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatsCard } from '../shared/StatsCard';
import { WalletSetup } from './WalletSetup';
import { Users, AlertTriangle, DollarSign, Activity, Store, Wallet } from 'lucide-react';

// Mock data
const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.3%',
    trend: 'up' as const,
    icon: Users
  },
  {
    title: 'Active Disputes',
    value: '7',
    change: '-2',
    trend: 'down' as const,
    icon: AlertTriangle
  },
  {
    title: 'Platform Revenue',
    value: '$45.2K',
    change: '+18.5%',
    trend: 'up' as const,
    icon: DollarSign
  },
  {
    title: 'System Health',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up' as const,
    icon: Activity
  }
];

// Mock properties data
const properties = [
  {
    id: '1',
    name: 'Gaming Blog',
    owner: 'publisher@example.com',
    url: 'https://gamingblog.com',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
    hasWallet: true,
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Tech News Portal',
    owner: 'tech@example.com',
    url: 'https://technews.com',
    walletAddress: '',
    hasWallet: false,
    status: 'pending' as const
  },
  {
    id: '3',
    name: 'E-commerce Magazine',
    owner: 'shop@example.com',
    url: 'https://shopmag.com',
    walletAddress: '0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c',
    hasWallet: true,
    status: 'active' as const
  }
];

export function AdminDashboard() {
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100 mb-2">Admin Dashboard</h1>
        <p className="text-gray-900 dark:text-graphite-300">Monitor platform health and manage operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Property Management Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-graphite-100">Property Management</h2>
          <Button variant="outline" size="sm">
            <Store className="w-4 h-4 mr-2" />
            View All Properties
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border border-gray-200 dark:border-graphite-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-graphite-100">{property.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-graphite-400 mt-1">{property.owner}</p>
                </div>
                {property.hasWallet ? (
                  <div className="flex items-center gap-1 text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                    <Wallet className="w-3 h-3" />
                    Configured
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full">
                    <AlertTriangle className="w-3 h-3" />
                    Pending
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-600 dark:text-graphite-500 mb-3">
                {property.url}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedProperty(property)}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {property.hasWallet ? 'Update Wallet' : 'Setup Wallet'}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-6">Recent Platform Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-graphite-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-graphite-100">New User Registration</div>
                  <div className="text-sm text-gray-900 dark:text-graphite-300">Advertiser: TechCorp Ltd.</div>
                </div>
                <div className="text-xs text-gray-900 dark:text-graphite-500">5 min ago</div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-graphite-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-graphite-100">Campaign Approved</div>
                  <div className="text-sm text-gray-900 dark:text-graphite-300">Mobile Gaming App Install - $50K budget</div>
                </div>
                <div className="text-xs text-gray-900 dark:text-graphite-500">12 min ago</div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-graphite-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-graphite-100">Dispute Resolved</div>
                  <div className="text-sm text-gray-900 dark:text-graphite-300">Payment dispute between Advertiser and Publisher</div>
                </div>
                <div className="text-xs text-gray-900 dark:text-graphite-500">1 hour ago</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/dashboard/admin/users'}>
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/dashboard/admin/disputes'}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Review Disputes
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/dashboard/admin/settings'}>
                <Activity className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-4">System Alerts</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="font-medium text-yellow-800 dark:text-yellow-200">Server Load High</div>
                <div className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">CPU usage at 85%</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="font-medium text-green-800 dark:text-green-200">Backup Completed</div>
                <div className="text-green-700 dark:text-green-300 text-xs mt-1">Daily backup successful</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Wallet Setup Modal */}
      {selectedProperty && (
        <WalletSetup
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          propertyId={selectedProperty.id}
          propertyName={selectedProperty.name}
          initialWalletAddress={selectedProperty.walletAddress}
        />
      )}
    </div>
  );
}