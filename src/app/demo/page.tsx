'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { BrandHero, FeatureHighlight, BrandCallout, StatsShowcase } from '@/components/ui/BrandElements';

export default function DemoPage() {
  const [currentDemo, setCurrentDemo] = useState<'error' | 'empty' | 'loading' | 'brand'>('brand');

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Demo Navigation */}
        <Card className="p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Phase 4: Polish & Enhancement Demo
          </h1>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={currentDemo === 'brand' ? 'primary' : 'outline'}
              onClick={() => setCurrentDemo('brand')}
            >
              Brand Elements
            </Button>
            <Button
              variant={currentDemo === 'error' ? 'primary' : 'outline'}
              onClick={() => setCurrentDemo('error')}
            >
              Error States
            </Button>
            <Button
              variant={currentDemo === 'empty' ? 'primary' : 'outline'}
              onClick={() => setCurrentDemo('empty')}
            >
              Empty States
            </Button>
            <Button
              variant={currentDemo === 'loading' ? 'primary' : 'outline'}
              onClick={() => setCurrentDemo('loading')}
            >
              Loading States
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.location.href = '/demo/dual-role'}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-none"
            >
              🔄 Dual-Role UX
            </Button>
          </div>
        </Card>

        {/* Demo Content */}
        {currentDemo === 'brand' && (
          <div className="space-y-12">
            <BrandHero
              subtitle="✨ Phase 4 Complete"
              title="Polish & Enhancement"
              description="Showcasing all the brand personality and UX polish components that make our platform shine."
              primaryAction={{
                text: "Explore Features",
                onClick: () => console.log('Primary action clicked')
              }}
              secondaryAction={{
                text: "View Documentation",
                onClick: () => console.log('Secondary action clicked')
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureHighlight
                icon="shield"
                title="Error Handling"
                description="Graceful error states with recovery options"
              />
              <FeatureHighlight
                icon="target"
                title="Empty States"
                description="Guided onboarding for new users"
                accent
              />
              <FeatureHighlight
                icon="zap"
                title="Loading States"
                description="Smooth skeleton screens and progress indicators"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BrandCallout
                type="success"
                title="Implementation Complete"
                message="All Phase 4 components have been successfully integrated with full brand personality."
              />
              <BrandCallout
                type="celebration"
                title="Ready for Launch"
                message="The platform now includes comprehensive error handling, empty states, and loading experiences."
              />
            </div>

            <StatsShowcase
              title="Phase 4 Achievements"
              stats={[
                { value: "4", label: "State Types", highlight: true },
                { value: "15+", label: "Components", trend: "+100%" },
                { value: "100%", label: "Coverage", highlight: true },
                { value: "0", label: "Broken States" }
              ]}
            />
          </div>
        )}

        {currentDemo === 'error' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Error State Showcase
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ErrorState
                type="network"
                onRetry={() => console.log('Retry network')}
                onGoHome={() => console.log('Go home')}
              />

              <ErrorState
                type="server"
                onRetry={() => console.log('Retry server')}
              />

              <ErrorState
                type="permission"
                onGoBack={() => console.log('Go back')}
              />

              <ErrorState
                type="not-found"
                onGoHome={() => console.log('Go home')}
                onGoBack={() => console.log('Go back')}
              />

              <ErrorState
                type="maintenance"
                showActions={false}
              />

              <ErrorState
                type="timeout"
                onRetry={() => console.log('Retry timeout')}
              />
            </div>
          </div>
        )}

        {currentDemo === 'empty' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Empty State Showcase
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EmptyState
                type="campaigns"
                userRole="advertiser"
                showSampleData={true}
                onAction={() => console.log('Create campaign')}
              />

              <EmptyState
                type="properties"
                userRole="publisher"
                onAction={() => console.log('Add property')}
              />

              <EmptyState
                type="disputes"
                userRole="admin"
              />

              <EmptyState
                type="search"
                onAction={() => console.log('Clear filters')}
              />

              <EmptyState
                type="marketplace"
                onAction={() => console.log('Reset filters')}
              />

              <EmptyState
                type="analytics"
                onAction={() => console.log('Getting started')}
              />
            </div>
          </div>
        )}

        {currentDemo === 'loading' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Loading State Showcase
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dashboard Loading</h3>
                <LoadingState type="dashboard" showProgress={true} progressText="Loading dashboard..." />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Card Loading</h3>
                  <LoadingState type="card" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chart Loading</h3>
                  <LoadingState type="chart" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table Loading</h3>
                  <LoadingState type="table" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">List Loading</h3>
                  <LoadingState type="list" count={3} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Form Loading</h3>
                <LoadingState type="form" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Minimal Loading</h3>
                <LoadingState type="minimal" />
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="text-lg px-8 py-3"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}