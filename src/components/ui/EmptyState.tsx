'use client';

import { Button } from './Button';
import { Card } from './Card';
import {
  Plus,
  Target,
  BarChart3,
  Globe,
  Users,
  Search,
  Filter,
  Upload
} from 'lucide-react';

interface EmptyStateProps {
  type: 'campaigns' | 'properties' | 'analytics' | 'disputes' | 'search' | 'marketplace' | 'revenue' | 'generic';
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  showSampleData?: boolean;
  className?: string;
  userRole?: 'advertiser' | 'publisher' | 'admin';
}

const emptyStateConfig = {
  'campaigns': {
    icon: Target,
    title: 'No Campaigns Yet',
    message: 'Create your first campaign to start reaching your target audience with blockchain-verified attribution.',
    actionText: 'Create Campaign',
    illustration: '🎯',
    tips: [
      'Start with a small budget to test performance',
      'Define clear conversion goals',
      'Target specific audience segments for better results'
    ]
  },
  'properties': {
    icon: Globe,
    title: 'No Properties Added',
    message: 'Add your first website or app to start monetizing your traffic through our marketplace.',
    actionText: 'Add Property',
    illustration: '🏢',
    tips: [
      'Verify your property ownership',
      'Add tracking code to measure performance',
      'Complete your property profile to attract advertisers'
    ]
  },
  'analytics': {
    icon: BarChart3,
    title: 'No Data Available',
    message: 'Analytics will appear here once your campaigns or properties start generating traffic.',
    actionText: 'View Getting Started',
    illustration: '📊',
    tips: [
      'Data updates in real-time as traffic flows',
      'Use filters to analyze specific time periods',
      'Export reports for deeper analysis'
    ]
  },
  'disputes': {
    icon: Users,
    title: 'No Disputes to Review',
    message: 'All good! No disputes require attention at the moment. The platform is running smoothly.',
    actionText: 'View Settings',
    illustration: '✅',
    tips: [
      'Disputes appear when there are attribution or payment issues',
      'Most issues are resolved automatically by blockchain verification',
      'Response time affects platform trust scores'
    ]
  },
  'search': {
    icon: Search,
    title: 'No Results Found',
    message: 'Try adjusting your search terms or filters to find what you\'re looking for.',
    actionText: 'Clear Filters',
    illustration: '🔍',
    tips: [
      'Use broader search terms',
      'Check spelling and try different keywords',
      'Remove some filters to expand results'
    ]
  },
  'marketplace': {
    icon: Filter,
    title: 'No Campaigns Available',
    message: 'No campaigns match your current filters. Try adjusting your criteria or check back later.',
    actionText: 'Reset Filters',
    illustration: '🏪',
    tips: [
      'New campaigns are added regularly',
      'Lower your minimum RPM requirements',
      'Expand your geo-targeting options'
    ]
  },
  'revenue': {
    icon: BarChart3,
    title: 'No Revenue Data',
    message: 'Revenue tracking will begin once your properties start serving campaigns.',
    actionText: 'Browse Marketplace',
    illustration: '💰',
    tips: [
      'Revenue is calculated in real-time',
      'Payments are processed automatically on blockchain',
      'View detailed breakdowns by property and campaign'
    ]
  },
  'generic': {
    icon: Upload,
    title: 'Nothing Here Yet',
    message: 'This section is empty. Start by adding some content or data.',
    actionText: 'Get Started',
    illustration: '📁',
    tips: []
  }
};

export function EmptyState({
  type,
  title,
  message,
  actionText,
  onAction,
  showSampleData = false,
  className = '',
  userRole
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  // Sample data for demo purposes
  const sampleData = {
    campaigns: [
      { name: 'Demo Campaign', budget: '$1,000', status: 'Active' },
      { name: 'Test Campaign', budget: '$500', status: 'Draft' }
    ],
    properties: [
      { name: 'example.com', traffic: '10K/month', category: 'Tech' },
      { name: 'demo-app.com', traffic: '5K/month', category: 'Mobile' }
    ]
  };

  return (
    <div className={`py-12 ${className}`}>
      <Card className="p-8 text-center max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Illustration */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-5xl">
              {config.illustration}
            </div>
            <div className="w-12 h-12 text-brand flex items-center justify-center">
              <Icon className="w-8 h-8" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {title || config.title}
            </h3>
            <p className="text-gray-900 dark:text-white/70 leading-relaxed max-w-md mx-auto">
              {message || config.message}
            </p>
          </div>

          {/* Action Button */}
          {onAction && (
            <div className="pt-4">
              <Button onClick={onAction} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
{actionText || ('actionText' in config ? config.actionText : 'Get Started')}
              </Button>
            </div>
          )}

          {/* Tips Section */}
          {config.tips.length > 0 && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                💡 Getting Started Tips:
              </h4>
              <ul className="text-sm text-gray-900 dark:text-white/70 space-y-2 text-left max-w-md mx-auto">
                {config.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sample Data Preview */}
          {showSampleData && (type === 'campaigns' || type === 'properties') && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                📋 Sample Data (for demo):
              </h4>
              <div className="space-y-2 text-left max-w-md mx-auto">
                {sampleData[type]?.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {'name' in item ? item.name : ''}
                      </span>
                      <span className="text-gray-900 dark:text-white/60">
                        {'budget' in item ? item.budget : 'traffic' in item ? item.traffic : ''}
                      </span>
                    </div>
                    {'status' in item && (
                      <div className="text-xs text-brand mt-1">{item.status}</div>
                    )}
                    {'category' in item && (
                      <div className="text-xs text-gray-900 dark:text-white/50 mt-1">{item.category}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role-specific guidance */}
          {userRole && (
            <div className="pt-4">
              <p className="text-xs text-gray-900 dark:text-white/50">
                {userRole === 'advertiser' && 'As an advertiser, you can create campaigns to reach your target audience.'}
                {userRole === 'publisher' && 'As a publisher, you can monetize your traffic by joining campaigns.'}
                {userRole === 'admin' && 'As an admin, you can oversee platform operations and resolve issues.'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}