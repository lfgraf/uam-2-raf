'use client';

import { Card } from './Card';

interface LoadingStateProps {
  type: 'page' | 'card' | 'table' | 'chart' | 'list' | 'form' | 'dashboard' | 'minimal';
  count?: number;
  className?: string;
  showProgress?: boolean;
  progressText?: string;
  animated?: boolean;
}

function Skeleton({
  className = '',
  animated = true
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded ${
        animated ? 'animate-pulse' : ''
      } ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </Card>
  );
}

function SkeletonTable() {
  return (
    <Card className="overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </Card>
  );
}

function SkeletonChart() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-64 flex items-end justify-between gap-2 p-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`w-full ${
                Math.random() > 0.5 ? 'h-32' : Math.random() > 0.5 ? 'h-48' : 'h-16'
              }`}
            />
          ))}
        </div>

        {/* Chart Legend */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="w-8 h-8 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function SkeletonForm() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <Skeleton className="h-6 w-48" />

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </Card>
  );
}

function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="w-5 h-5 rounded" />
              </div>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SkeletonChart />
          <SkeletonTable />
        </div>
        <div className="space-y-6">
          <SkeletonList count={3} />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

function MinimalLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-900 dark:text-white/60">Loading...</span>
      </div>
    </div>
  );
}

export function LoadingState({
  type,
  count = 5,
  className = '',
  showProgress = false,
  progressText = 'Loading...',
  animated = true
}: LoadingStateProps) {
  const baseClasses = `${className} ${!animated ? 'animate-none' : ''}`;

  if (type === 'minimal') {
    return (
      <div className={baseClasses}>
        <MinimalLoading />
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      {showProgress && (
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {progressText}
            </span>
          </div>
          <div className="w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-brand h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {type === 'page' && <SkeletonDashboard />}
      {type === 'card' && <SkeletonCard />}
      {type === 'table' && <SkeletonTable />}
      {type === 'chart' && <SkeletonChart />}
      {type === 'list' && <SkeletonList count={count} />}
      {type === 'form' && <SkeletonForm />}
      {type === 'dashboard' && <SkeletonDashboard />}
    </div>
  );
}