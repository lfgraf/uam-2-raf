'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import {
  TrendingUp,
  Globe,
  Settings,
  ChevronDown,
  Check,
  Plus,
  Sparkles
} from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: 'advertiser' | 'publisher' | 'admin';
  availableRoles: ('advertiser' | 'publisher' | 'admin')[];
  onRoleChange: (role: 'advertiser' | 'publisher' | 'admin') => void;
  onAddRole?: (role: 'advertiser' | 'publisher') => void;
  showAddRole?: boolean;
  className?: string;
}

const roleConfig = {
  advertiser: {
    icon: TrendingUp,
    title: 'Advertiser',
    description: 'Manage campaigns and track conversions',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  },
  publisher: {
    icon: Globe,
    title: 'Publisher',
    description: 'Monetize properties and manage inventory',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20'
  },
  admin: {
    icon: Settings,
    title: 'Admin',
    description: 'Platform oversight and dispute resolution',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20'
  }
};

export function RoleSwitcher({
  currentRole,
  availableRoles,
  onRoleChange,
  onAddRole,
  showAddRole = true,
  className = ''
}: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentConfig = roleConfig[currentRole];
  const CurrentIcon = currentConfig.icon;

  const unavailableRoles = (['advertiser', 'publisher'] as const).filter(
    role => !availableRoles.includes(role)
  );

  return (
    <div className={`relative ${className}`}>
      {/* Current Role Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 min-w-48"
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentConfig.bg}`}>
          <CurrentIcon className={`w-4 h-4 ${currentConfig.color}`} />
        </div>

        <div className="flex-1 text-left">
          <div className="font-medium text-gray-900 dark:text-white">
            {currentConfig.title}
          </div>
          <div className="text-xs text-gray-900 dark:text-white/60">
            Switch role
          </div>
        </div>

        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </Button>

      {/* Role Selection Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <Card className="absolute top-full left-0 mt-2 w-80 p-4 z-50 shadow-lg">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Switch Role
              </div>

              {/* Available Roles */}
              {availableRoles.map((role) => {
                const config = roleConfig[role];
                const Icon = config.icon;
                const isActive = role === currentRole;

                return (
                  <button
                    key={role}
                    onClick={() => {
                      onRoleChange(role);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      isActive
                        ? `${config.bg} ${config.color} ring-2 ring-current ring-opacity-20`
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white dark:bg-gray-800' : config.bg
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? config.color : config.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className={`font-medium ${
                        isActive ? 'text-current' : 'text-gray-900 dark:text-white'
                      }`}>
                        {config.title}
                      </div>
                      <div className={`text-xs ${
                        isActive ? 'text-current opacity-80' : 'text-gray-900 dark:text-white/60'
                      }`}>
                        {config.description}
                      </div>
                    </div>

                    {isActive && (
                      <Check className="w-4 h-4 text-current" />
                    )}
                  </button>
                );
              })}

              {/* Add Role Options */}
              {showAddRole && onAddRole && unavailableRoles.length > 0 && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand" />
                      Add Role
                    </div>

                    {unavailableRoles.map((role) => {
                      const config = roleConfig[role];
                      const Icon = config.icon;

                      return (
                        <button
                          key={`add-${role}`}
                          onClick={() => {
                            onAddRole(role);
                            setIsOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left border-2 border-dashed border-gray-300 dark:border-gray-600"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <Plus className="w-4 h-4 text-gray-400" />
                          </div>

                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              Become a {config.title}
                            </div>
                            <div className="text-xs text-gray-900 dark:text-white/60">
                              {role === 'publisher'
                                ? 'Monetize your websites and apps'
                                : 'Create and manage campaigns'
                              }
                            </div>
                          </div>

                          <div className="text-xs text-brand font-medium">
                            Setup
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Cross-role Insight */}
                  <div className="bg-brand/5 border border-brand/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-brand mb-1">
                      💡 Pro Tip
                    </div>
                    <div className="text-xs text-gray-900 dark:text-white/70">
                      {currentRole === 'advertiser'
                        ? 'Publishers earn up to 80% more by also running their own campaigns'
                        : 'Advertisers save 30% by using their own inventory alongside external sources'
                      }
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}