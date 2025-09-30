'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatsCard } from '../shared/StatsCard';
import { Users, AlertTriangle, DollarSign, Activity } from 'lucide-react';

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

export function AdminDashboard() {
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
    </div>
  );
}