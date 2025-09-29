'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { UnifiedDashboardSidebar } from '@/components/dashboard/UnifiedDashboardSidebar';
import { BrandCallout } from '@/components/ui/BrandElements';
import {
  ArrowRight,
  TrendingUp,
  Globe,
  DollarSign,
  Target,
  Users,
  Zap
} from 'lucide-react';

export default function DualRoleDemoPage() {
  const [currentRole, setCurrentRole] = useState<'advertiser' | 'publisher' | 'admin'>('advertiser');
  const [showSidebar, setShowSidebar] = useState(false);

  const userRoles: ('advertiser' | 'publisher')[] = ['advertiser', 'publisher'];

  const handleAddRole = (role: 'advertiser' | 'publisher') => {
    console.log(`Adding ${role} role`);
    alert(`This would start the onboarding process for ${role} role!`);
  };

  const crossRoleInsights = {
    advertiser: {
      opportunity: "Publisher Revenue Potential",
      description: "Your ad campaigns generate valuable traffic patterns. By becoming a publisher, you could:",
      benefits: [
        "Monetize 40% of your traffic that doesn't convert",
        "Reduce advertising costs by 30% using your own inventory",
        "Generate $2,500+ additional monthly revenue",
        "Better understand publisher perspectives for campaign optimization"
      ],
      cta: "Add Publisher Role",
      icon: Globe,
      color: "green"
    },
    publisher: {
      opportunity: "Advertiser Growth Potential",
      description: "You understand traffic quality better than anyone. By becoming an advertiser, you could:",
      benefits: [
        "Fill 60% of unsold inventory with your own campaigns",
        "Increase overall revenue per visitor by 45%",
        "Control your monetization strategy end-to-end",
        "Test and optimize campaigns before external promotion"
      ],
      cta: "Add Advertiser Role",
      icon: TrendingUp,
      color: "blue"
    }
  };

  const currentInsight = crossRoleInsights[currentRole as keyof typeof crossRoleInsights] || crossRoleInsights.advertiser;
  const InsightIcon = currentInsight.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800">
      {/* Demo Sidebar */}
      <UnifiedDashboardSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 Dual-Role UX Demo
          </h1>
          <p className="text-lg text-gray-900 dark:text-white/70 max-w-2xl mx-auto">
            Experience seamless role switching and cross-role insights for users who are both advertisers and publishers
          </p>
        </div>

        {/* Demo Controls */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Interactive Role Switcher
              </h3>
              <p className="text-sm text-gray-900 dark:text-white/70 mb-4">
                Try switching between roles to see how the interface adapts
              </p>

              <RoleSwitcher
                currentRole={currentRole}
                availableRoles={userRoles}
                onRoleChange={setCurrentRole}
                onAddRole={handleAddRole}
                showAddRole={true}
              />
            </div>

            <div className="lg:border-l lg:border-gray-200 lg:dark:border-gray-700 lg:pl-6">
              <Button
                variant="outline"
                onClick={() => setShowSidebar(true)}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                View Unified Sidebar
              </Button>
            </div>
          </div>
        </Card>

        {/* Current Role Context */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Current Role</h3>
            <p className="text-2xl font-bold text-brand capitalize">{currentRole}</p>
            <p className="text-sm text-gray-900 dark:text-white/60 mt-2">
              {currentRole === 'advertiser' ? 'Managing campaigns and tracking ROI' : 'Monetizing properties and inventory'}
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Revenue Impact</h3>
            <p className="text-2xl font-bold text-green-600">+67%</p>
            <p className="text-sm text-gray-900 dark:text-white/60 mt-2">
              Average increase for dual-role users
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Efficiency Gain</h3>
            <p className="text-2xl font-bold text-purple-600">-35%</p>
            <p className="text-sm text-gray-900 dark:text-white/60 mt-2">
              Reduction in acquisition costs
            </p>
          </Card>
        </div>

        {/* Cross-Role Opportunity */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 bg-${currentInsight.color}-100 dark:bg-${currentInsight.color}-900/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <InsightIcon className={`w-8 h-8 text-${currentInsight.color}-600`} />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {currentInsight.opportunity}
              </h3>
              <p className="text-gray-900 dark:text-white/70 mb-6">
                {currentInsight.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentInsight.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 bg-${currentInsight.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-sm text-gray-900 dark:text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                className="flex items-center gap-2"
                onClick={() => handleAddRole(currentRole === 'advertiser' ? 'publisher' : 'advertiser')}
              >
                <Zap className="w-4 h-4" />
                {currentInsight.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* UX Design Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <BrandCallout
            type="info"
            title="Seamless Context Switching"
            message="Users can switch between roles without losing context. Navigation adapts intelligently to show relevant options for each role while maintaining unified analytics."
          />

          <BrandCallout
            type="celebration"
            title="Cross-Role Intelligence"
            message="The platform identifies opportunities where one role can benefit the other, like using your own inventory to reduce advertising costs."
          />
        </div>

        {/* Implementation Benefits */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Dual-Role UX Matters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-brand" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">User Retention</h4>
              <p className="text-sm text-gray-900 dark:text-white/70">
                85% higher retention when users engage with multiple roles
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-brand" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Revenue Growth</h4>
              <p className="text-sm text-gray-900 dark:text-white/70">
                Average 67% increase in platform revenue per user
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-brand" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Efficiency</h4>
              <p className="text-sm text-gray-900 dark:text-white/70">
                35% reduction in customer acquisition costs
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/demo'}
            className="text-lg px-8 py-3"
          >
            ← Back to Main Demo
          </Button>
        </div>
      </div>
    </div>
  );
}