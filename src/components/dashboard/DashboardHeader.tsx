'use client';

import { Button } from '@/components/ui/Button';
import { Bell, Menu, Search, Sun, Moon, CheckCircle, AlertCircle, TrendingUp, DollarSign, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    type: 'success' as const,
    title: 'Campaign Approved',
    message: 'Your Q4 Mobile App Install campaign is now live',
    time: '2 hours ago',
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'warning' as const,
    title: 'Budget Alert',
    message: 'Black Friday Sale campaign has spent 95% of budget',
    time: '4 hours ago',
    icon: AlertCircle
  },
  {
    id: 3,
    type: 'info' as const,
    title: 'Conversion Milestone',
    message: 'Holiday Email Signups reached 1,000 conversions',
    time: '1 day ago',
    icon: TrendingUp
  },
  {
    id: 4,
    type: 'success' as const,
    title: 'Payout Processed',
    message: '$1,250 has been transferred to your wallet',
    time: '2 days ago',
    icon: DollarSign
  }
];

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900 dark:text-white/50" />
          <input
            type="text"
            placeholder="Search campaigns, properties..."
            className="w-80 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-medium">
              {mockNotifications.length}
            </span>
          </Button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setNotificationsOpen(false)}
              />

              {/* Dropdown */}
              <div className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-40 max-h-[500px] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-gray-900 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto">
                  {mockNotifications.map((notification) => {
                    const Icon = notification.icon;
                    const typeColors = {
                      success: 'bg-green-100 dark:bg-green-900/20 text-green-600',
                      warning: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600',
                      info: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                    };

                    return (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[notification.type]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-900 dark:text-white/70 mb-2">
                              {notification.message}
                            </div>
                            <div className="text-xs text-gray-900 dark:text-white/50">
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-center text-sm text-brand hover:text-brand-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User menu */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">A</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900 dark:text-white">Advertiser</div>
            <div className="text-xs text-gray-900 dark:text-white/60">0x1234...5678</div>
          </div>
        </div>
      </div>
    </header>
  );
}