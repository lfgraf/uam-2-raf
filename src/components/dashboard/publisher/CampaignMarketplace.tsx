'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Target, Calendar } from 'lucide-react';

// Mock campaign data
const campaigns = [
  {
    id: '1',
    name: 'Mobile Gaming App Install',
    advertiser: 'GameStudio Inc.',
    category: 'Gaming',
    objective: 'App Installs',
    cpc: 1.25,
    budget: 50000,
    endDate: '2024-12-31',
    requirements: ['Gaming content', 'Mobile traffic', '10K+ monthly views'],
    matchScore: 95,
    status: 'open'
  },
  {
    id: '2',
    name: 'E-commerce Holiday Sale',
    advertiser: 'ShopMart',
    category: 'Retail',
    objective: 'Conversions',
    cpc: 0.85,
    budget: 25000,
    endDate: '2024-11-30',
    requirements: ['Shopping content', 'US traffic', '5K+ monthly views'],
    matchScore: 88,
    status: 'open'
  },
  {
    id: '3',
    name: 'Fitness App Subscription',
    advertiser: 'FitLife',
    category: 'Health & Fitness',
    objective: 'Subscriptions',
    cpc: 2.10,
    budget: 75000,
    endDate: '2025-01-15',
    requirements: ['Health/Fitness content', 'Global traffic'],
    matchScore: 92,
    status: 'open'
  },
  {
    id: '4',
    name: 'Crypto Trading Platform',
    advertiser: 'CryptoTrade Pro',
    category: 'Finance',
    objective: 'Sign-ups',
    cpc: 3.50,
    budget: 100000,
    endDate: '2024-12-20',
    requirements: ['Finance content', '18+ audience', 'High-value traffic'],
    matchScore: 76,
    status: 'open'
  },
  {
    id: '5',
    name: 'Tech Newsletter Signup',
    advertiser: 'TechDaily',
    category: 'Technology',
    objective: 'Leads',
    cpc: 0.45,
    budget: 15000,
    endDate: '2024-11-25',
    requirements: ['Technology content', 'Professional audience'],
    matchScore: 85,
    status: 'open'
  }
];

const categories = ['All', 'Gaming', 'Retail', 'Health & Fitness', 'Finance', 'Technology'];

export function CampaignMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('match');

  const filteredCampaigns = campaigns
    .filter(campaign =>
      (selectedCategory === 'All' || campaign.category === selectedCategory) &&
      (searchTerm === '' ||
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.advertiser.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'cpc':
          return b.cpc - a.cpc;
        case 'budget':
          return b.budget - a.budget;
        default:
          return 0;
      }
    });

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    if (score >= 80) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Campaign Marketplace</h1>
        <p className="text-gray-900 dark:text-white/60">Discover and bid on campaigns that match your properties</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900 dark:text-white/50" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            <option value="match">Sort by Match Score</option>
            <option value="cpc">Sort by CPC</option>
            <option value="budget">Sort by Budget</option>
          </select>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{campaign.name}</h3>
                <p className="text-sm text-gray-900 dark:text-white/60">by {campaign.advertiser}</p>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full font-medium ${getMatchScoreColor(campaign.matchScore)}`}>
                {campaign.matchScore}% Match
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-900 dark:text-white/60 mb-1">CPC</div>
                <div className="font-medium text-gray-900 dark:text-white">${campaign.cpc}</div>
              </div>
              <div>
                <div className="text-xs text-gray-900 dark:text-white/60 mb-1">Budget</div>
                <div className="font-medium text-gray-900 dark:text-white">${campaign.budget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-900 dark:text-white/60 mb-1">Category</div>
                <div className="text-sm text-gray-900 dark:text-white">{campaign.category}</div>
              </div>
              <div>
                <div className="text-xs text-gray-900 dark:text-white/60 mb-1">Objective</div>
                <div className="text-sm text-gray-900 dark:text-white">{campaign.objective}</div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <div className="text-xs text-gray-900 dark:text-white/60 mb-2">Requirements</div>
              <div className="flex flex-wrap gap-1">
                {campaign.requirements.map((req, index) => (
                  <Badge key={index} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 text-xs text-gray-900 dark:text-white/60">
                <Calendar className="w-3 h-3" />
                Ends {new Date(campaign.endDate).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm" className="bg-brand text-white hover:bg-brand/90">
                  Place Bid
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-900 dark:text-white/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No campaigns found</h3>
          <p className="text-gray-900 dark:text-white/60">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or filters'
              : 'No campaigns are currently available for bidding'
            }
          </p>
        </div>
      )}
    </div>
  );
}