'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, DollarSign, Shield, Bell, Zap, CheckCircle } from 'lucide-react';

export function PlatformSettings() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        <p className="text-gray-900 dark:text-white/60">
          Configure platform-wide parameters and policies
        </p>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right">
          <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900 dark:text-green-300">
                Settings saved successfully!
              </span>
            </div>
          </Card>
        </div>
      )}

      {/* Fee Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Fee Structure</h2>
            <p className="text-sm text-gray-900 dark:text-white/60">Platform transaction fees</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Platform Fee (%)
            </label>
            <input
              type="number"
              defaultValue="2.5"
              step="0.1"
              min="0"
              max="10"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-900 dark:text-white/60">
              Fee taken from each transaction
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Minimum Campaign Budget ($)
            </label>
            <input
              type="number"
              defaultValue="100"
              step="10"
              min="0"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-900 dark:text-white/60">
              Minimum budget required for campaigns
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Publisher Payout Threshold ($)
            </label>
            <input
              type="number"
              defaultValue="50"
              step="10"
              min="0"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-900 dark:text-white/60">
              Minimum earnings for payout eligibility
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Attribution Window (hours)
            </label>
            <input
              type="number"
              defaultValue="24"
              step="1"
              min="1"
              max="168"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-900 dark:text-white/60">
              Time window for conversion attribution
            </p>
          </div>
        </div>
      </Card>

      {/* Security & Compliance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security & Compliance</h2>
            <p className="text-sm text-gray-900 dark:text-white/60">Platform security settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Require Wallet Verification</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Users must verify wallet ownership before platform access
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Enable Fraud Detection</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Automatically flag suspicious activity patterns
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Require 2FA for admin accounts
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Manual Review for Large Campaigns</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Require admin approval for campaigns over $10,000
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
            <p className="text-sm text-gray-900 dark:text-white/60">Configure platform notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Campaign Approval Notifications</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Notify admins when campaigns need approval
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Dispute Alerts</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Alert admins of new disputes
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">System Health Alerts</div>
              <div className="text-sm text-gray-900 dark:text-white/60">
                Notify of system performance issues
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* System Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">System Configuration</h2>
            <p className="text-sm text-gray-900 dark:text-white/60">Advanced platform settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Max Concurrent Campaigns per User
            </label>
            <input
              type="number"
              defaultValue="25"
              step="5"
              min="1"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Auction Duration (hours)
            </label>
            <input
              type="number"
              defaultValue="72"
              step="12"
              min="12"
              max="168"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Data Retention Period (days)
            </label>
            <input
              type="number"
              defaultValue="365"
              step="30"
              min="90"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              API Rate Limit (requests/min)
            </label>
            <input
              type="number"
              defaultValue="60"
              step="10"
              min="10"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </Card>

      {/* Save Actions */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1 sm:flex-initial">
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-initial">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}