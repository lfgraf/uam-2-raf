'use client';

import { Card } from './Card';
import { Button } from './Button';
import {
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Heart,
  Star,
  Rocket,
  Target
} from 'lucide-react';

interface BrandHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

interface FeatureHighlightProps {
  icon: 'shield' | 'zap' | 'trending' | 'globe' | 'users' | 'target';
  title: string;
  description: string;
  accent?: boolean;
}

interface BrandCalloutProps {
  type: 'success' | 'info' | 'warning' | 'celebration' | 'trust';
  title: string;
  message: string;
  action?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

interface StatsShowcaseProps {
  stats: Array<{
    value: string;
    label: string;
    trend?: string;
    highlight?: boolean;
  }>;
  title?: string;
  className?: string;
}

const iconMap = {
  shield: Shield,
  zap: Zap,
  trending: TrendingUp,
  globe: Globe,
  users: Users,
  target: Target
};

export function BrandHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  className = ''
}: BrandHeroProps) {
  return (
    <div className={`text-center py-16 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Sparkle decoration */}
        <div className="flex justify-center">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-brand animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          {subtitle && (
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium">
              <Rocket className="w-4 h-4" />
              {subtitle}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-medium bg-gradient-to-r from-gray-900 via-brand to-purple-600 dark:from-white dark:via-brand-200 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-900 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                size="lg"
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <span className="relative z-10">{primaryAction.text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
            )}

            {secondaryAction && (
              <Button
                variant="outline"
                onClick={secondaryAction.onClick}
                size="lg"
                className="text-lg px-8 py-4"
              >
                {secondaryAction.text}
              </Button>
            )}
          </div>
        )}

        {/* Trust indicators */}
        <div className="flex justify-center items-center gap-6 pt-8 text-gray-900 dark:text-white/60">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm">Blockchain Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Trusted by 1000+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-sm">Built with Care</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureHighlight({
  icon,
  title,
  description,
  accent = false
}: FeatureHighlightProps) {
  const Icon = iconMap[icon];

  return (
    <Card className={`p-6 text-center hover:shadow-lg transition-all duration-300 group ${
      accent ? 'ring-2 ring-brand shadow-lg scale-105' : 'hover:scale-105'
    }`}>
      <div className="space-y-4">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${
          accent
            ? 'bg-brand text-white'
            : 'bg-brand/10 text-brand'
        }`}>
          <Icon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-900 dark:text-white/70 leading-relaxed">
            {description}
          </p>
        </div>

        {accent && (
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
              <Sparkles className="w-3 h-3" />
              Most Popular
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

export function BrandCallout({
  type,
  title,
  message,
  action,
  className = ''
}: BrandCalloutProps) {
  const config = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      icon: '✅',
      titleColor: 'text-green-800 dark:text-green-200',
      textColor: 'text-green-700 dark:text-green-300'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      icon: '💡',
      titleColor: 'text-blue-800 dark:text-blue-200',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      icon: '⚠️',
      titleColor: 'text-yellow-800 dark:text-yellow-200',
      textColor: 'text-yellow-700 dark:text-yellow-300'
    },
    celebration: {
      bg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      icon: '🎉',
      titleColor: 'text-purple-800 dark:text-purple-200',
      textColor: 'text-purple-700 dark:text-purple-300'
    },
    trust: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
      icon: '🔒',
      titleColor: 'text-indigo-800 dark:text-indigo-200',
      textColor: 'text-indigo-700 dark:text-indigo-300'
    }
  };

  const style = config[type];

  return (
    <div className={`border rounded-xl p-6 ${style.bg} ${className}`}>
      <div className="flex items-start gap-4">
        <div className="text-2xl flex-shrink-0">
          {style.icon}
        </div>

        <div className="flex-1">
          <h4 className={`font-medium mb-2 ${style.titleColor}`}>
            {title}
          </h4>
          <p className={`${style.textColor} leading-relaxed`}>
            {message}
          </p>

          {action && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className={`${style.titleColor} border-current hover:bg-current hover:text-white`}
              >
                {action.text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StatsShowcase({
  stats,
  title,
  className = ''
}: StatsShowcaseProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {title && (
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className={`text-3xl md:text-4xl font-medium ${
              stat.highlight
                ? 'bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-transparent'
                : 'text-gray-900 dark:text-white'
            }`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-900 dark:text-white/60">
              {stat.label}
            </div>
            {stat.trend && (
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}