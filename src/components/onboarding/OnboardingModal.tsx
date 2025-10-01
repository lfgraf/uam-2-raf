'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TrendingUp, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function OnboardingModal() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'advertiser' | 'publisher' | null>(null);

  const handleGetStarted = () => {
    if (selectedRole === 'advertiser') {
      router.push('/dashboard/advertiser');
    } else if (selectedRole === 'publisher') {
      router.push('/dashboard/publisher');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950 flex items-center justify-center p-4 z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(201, 255, 0) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Card className="w-full max-w-4xl p-8 md:p-12 relative bg-white dark:bg-graphite-900 border-graphite-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-acid rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-graphite-950" />
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-graphite-100 mb-2">
            Welcome to UAM Platform
          </h1>
          <p className="text-gray-600 dark:text-graphite-300 text-lg">
            Choose your role to get started
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Advertiser */}
          <button
            onClick={() => setSelectedRole('advertiser')}
            className={`
              p-6 rounded-xl border-2 text-left transition-all
              ${selectedRole === 'advertiser'
                ? 'border-acid bg-acid/5'
                : 'border-gray-200 dark:border-graphite-700 hover:border-acid/50'
              }
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              {selectedRole === 'advertiser' && (
                <div className="w-6 h-6 bg-acid rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-graphite-950 rounded-full" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-graphite-100 mb-2">
              Advertiser
            </h3>
            <p className="text-gray-600 dark:text-graphite-300 text-sm mb-4">
              Create campaigns, manage bids, and track conversions across premium publisher inventory.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300 rounded">
                Campaign Management
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300 rounded">
                Analytics
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300 rounded">
                Bidding
              </span>
            </div>
          </button>

          {/* Publisher */}
          <button
            onClick={() => setSelectedRole('publisher')}
            className={`
              p-6 rounded-xl border-2 text-left transition-all
              ${selectedRole === 'publisher'
                ? 'border-acid bg-acid/5'
                : 'border-gray-200 dark:border-graphite-700 hover:border-acid/50'
              }
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              {selectedRole === 'publisher' && (
                <div className="w-6 h-6 bg-acid rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-graphite-950 rounded-full" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-graphite-100 mb-2">
              Publisher
            </h3>
            <p className="text-gray-600 dark:text-graphite-300 text-sm mb-4">
              Monetize your properties, browse campaigns, and maximize revenue with targeted advertising.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300 rounded">
                Property Management
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300 rounded">
                Revenue Tracking
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300 rounded">
                Marketplace
              </span>
            </div>
          </button>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleGetStarted}
            disabled={!selectedRole}
            size="lg"
            className="px-8"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 dark:text-graphite-500 mt-6">
          You can add additional roles later from your dashboard
        </p>
      </Card>
    </div>
  );
}