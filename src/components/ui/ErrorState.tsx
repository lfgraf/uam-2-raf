'use client';

import { Button } from './Button';
import { Card } from './Card';
import {
  AlertTriangle,
  Wifi,
  RefreshCw,
  Home,
  ArrowLeft,
  ShieldAlert,
  Clock,
  Zap
} from 'lucide-react';

interface ErrorStateProps {
  type: 'network' | 'server' | 'permission' | 'timeout' | 'generic' | 'maintenance' | 'not-found';
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  showActions?: boolean;
  className?: string;
}

const errorConfig = {
  'network': {
    icon: Wifi,
    title: 'Connection Problem',
    message: 'Unable to connect to our servers. Please check your internet connection and try again.',
    illustration: '🌐',
    color: 'text-blue-600 dark:text-blue-400'
  },
  'server': {
    icon: AlertTriangle,
    title: 'Server Error',
    message: 'Something went wrong on our end. Our team has been notified and is working on a fix.',
    illustration: '⚙️',
    color: 'text-red-600 dark:text-red-400'
  },
  'permission': {
    icon: ShieldAlert,
    title: 'Access Denied',
    message: 'You don\'t have permission to access this resource. Contact your administrator if this seems incorrect.',
    illustration: '🔒',
    color: 'text-orange-600 dark:text-orange-400'
  },
  'timeout': {
    icon: Clock,
    title: 'Request Timed Out',
    message: 'The request is taking longer than expected. This might be due to network congestion or server load.',
    illustration: '⏱️',
    color: 'text-yellow-600 dark:text-yellow-400'
  },
  'maintenance': {
    icon: Zap,
    title: 'Under Maintenance',
    message: 'We\'re currently performing scheduled maintenance to improve your experience. Please try again shortly.',
    illustration: '🔧',
    color: 'text-purple-600 dark:text-purple-400'
  },
  'not-found': {
    icon: AlertTriangle,
    title: 'Page Not Found',
    message: 'The page you\'re looking for doesn\'t exist or has been moved to a different location.',
    illustration: '🔍',
    color: 'text-gray-600 dark:text-gray-400'
  },
  'generic': {
    icon: AlertTriangle,
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred. Please try again, and contact support if the problem persists.',
    illustration: '❌',
    color: 'text-red-600 dark:text-red-400'
  }
};

export function ErrorState({
  type,
  title,
  message,
  onRetry,
  onGoBack,
  onGoHome,
  showActions = true,
  className = ''
}: ErrorStateProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <Card className={`p-8 text-center max-w-lg mx-auto ${className}`}>
      <div className="space-y-6">
        {/* Illustration */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl">
            {config.illustration}
          </div>
          <div className={`w-12 h-12 ${config.color} flex items-center justify-center`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title || config.title}
          </h2>
          <p className="text-gray-900 dark:text-white/70 leading-relaxed">
            {message || config.message}
          </p>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            {onRetry && (
              <Button
                onClick={onRetry}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}

            {onGoBack && (
              <Button
                variant="outline"
                onClick={onGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            )}

            {onGoHome && (
              <Button
                variant="outline"
                onClick={onGoHome}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            )}
          </div>
        )}

        {/* Additional Info */}
        {type === 'server' && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-900 dark:text-white/60">
              Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        )}

        {type === 'maintenance' && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-900 dark:text-white/60">
              Estimated completion: 30 minutes
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}