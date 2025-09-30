'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  Globe,
  Settings,
  PlusCircle,
  BarChart3,
  Target,
  DollarSign,
  Store,
  Users,
  AlertTriangle,
  X,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Plus
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function getUserRoleFromPath(pathname: string): 'advertiser' | 'publisher' | 'admin' {
  if (pathname.includes('/advertiser')) return 'advertiser';
  if (pathname.includes('/publisher')) return 'publisher';
  if (pathname.includes('/admin')) return 'admin';
  return 'advertiser'; // default
}

const roleConfig = {
  advertiser: {
    title: 'Advertiser Dashboard',
    icon: TrendingUp,
    navigation: [
      { name: 'Campaigns', href: '/dashboard/advertiser', icon: BarChart3 },
      { name: 'Create Campaign', href: '/dashboard/advertiser/create', icon: PlusCircle },
      { name: 'Auction Bids', href: '/dashboard/advertiser/auctions', icon: Target },
      { name: 'Analytics', href: '/dashboard/advertiser/analytics', icon: BarChart3 },
    ]
  },
  publisher: {
    title: 'Publisher Dashboard',
    icon: Globe,
    navigation: [
      { name: 'Properties', href: '/dashboard/publisher', icon: Store },
      { name: 'Marketplace', href: '/dashboard/publisher/marketplace', icon: Target },
      { name: 'Revenue', href: '/dashboard/publisher/revenue', icon: DollarSign },
      { name: 'Analytics', href: '/dashboard/publisher/analytics', icon: BarChart3 },
    ]
  },
  admin: {
    title: 'Admin Dashboard',
    icon: Settings,
    navigation: [
      { name: 'Overview', href: '/dashboard/admin', icon: BarChart3 },
      { name: 'Users', href: '/dashboard/admin/users', icon: Users },
      { name: 'Disputes', href: '/dashboard/admin/disputes', icon: AlertTriangle },
      { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
    ]
  }
};

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const userRole = getUserRoleFromPath(pathname);
  const config = roleConfig[userRole];
  const RoleIcon = config.icon;

  // Role switching state
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  // Simulate user having multiple roles - in real app this would come from user data
  const userRoles: ('advertiser' | 'publisher' | 'admin')[] = ['advertiser', 'publisher'];

  const availableRoles = userRoles.filter(role => role !== userRole);

  const handleRoleSwitch = (newRole: 'advertiser' | 'publisher' | 'admin') => {
    const roleRoutes = {
      advertiser: '/dashboard/advertiser',
      publisher: '/dashboard/publisher',
      admin: '/dashboard/admin'
    };
    setIsRoleSwitcherOpen(false);
    window.location.href = roleRoutes[newRole];
  };

  const handleAddRole = () => {
    const roleToAdd = userRole === 'advertiser' ? 'publisher' : 'advertiser';
    alert(`Adding ${roleToAdd} role - this would start a guided setup process!`);
    setIsRoleSwitcherOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white dark:bg-graphite-900 border-r border-gray-200 dark:border-graphite-700 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-graphite-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
                <RoleIcon className="w-5 h-5 text-graphite-950" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-graphite-100 text-sm">UAM Platform</div>
                <div className="text-xs text-gray-500 dark:text-graphite-300 capitalize">{userRole}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-graphite-850 rounded text-gray-900 dark:text-graphite-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {config.navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-acid text-graphite-950"
                        : "text-gray-700 dark:text-graphite-300 hover:text-gray-900 dark:hover:text-graphite-100 hover:bg-gray-100 dark:hover:bg-graphite-850"
                    )}
                    onClick={() => onClose()}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer with Role Switcher */}
          <div className="p-4 border-t border-gray-200 dark:border-graphite-700">
            {/* Role Switcher Dropdown */}
            {isRoleSwitcherOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsRoleSwitcherOpen(false)}
                />

                {/* Dropdown */}
                <div className="absolute bottom-20 left-4 right-4 bg-white dark:bg-graphite-900 border border-gray-200 dark:border-graphite-700 rounded-lg shadow-lg z-50 p-3">
                  <div className="text-xs font-medium text-gray-500 dark:text-graphite-500 uppercase tracking-wide mb-3">
                    Switch Role
                  </div>

                  <div className="space-y-2">
                    {availableRoles.map((role) => {
                      const roleData = roleConfig[role];
                      const RoleIconComponent = roleData.icon;

                      return (
                        <button
                          key={role}
                          onClick={() => handleRoleSwitch(role)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-graphite-850 transition-colors text-left"
                        >
                          <div className="w-6 h-6 bg-acid/10 rounded flex items-center justify-center">
                            <RoleIconComponent className="w-4 h-4 text-acid" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-graphite-100">
                              Switch to {roleData.title}
                            </div>
                          </div>
                          <RefreshCw className="w-3 h-3 text-gray-400 dark:text-graphite-500" />
                        </button>
                      );
                    })}

                    {/* Add Role Option */}
                    {userRoles.length < 2 && (
                      <>
                        <div className="border-t border-gray-200 dark:border-graphite-700 pt-2">
                          <button
                            onClick={handleAddRole}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-graphite-850 transition-colors text-left border-2 border-dashed border-gray-300 dark:border-graphite-600"
                          >
                            <div className="w-6 h-6 border-2 border-dashed border-gray-400 dark:border-graphite-500 rounded flex items-center justify-center">
                              <Plus className="w-3 h-3 text-gray-400 dark:text-graphite-500" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-graphite-100">
                                Add {userRole === 'advertiser' ? 'Publisher' : 'Advertiser'} Role
                              </div>
                              <div className="text-xs text-gray-600 dark:text-graphite-300">
                                {userRole === 'advertiser'
                                  ? 'Monetize your traffic'
                                  : 'Create campaigns'
                                }
                              </div>
                            </div>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Cross-role tip */}
                  <div className="mt-3 p-2 bg-acid/5 border border-acid/20 rounded-lg">
                    <div className="text-xs text-acid font-medium mb-1">💡 Pro Tip</div>
                    <div className="text-xs text-gray-700 dark:text-graphite-300">
                      {userRole === 'advertiser'
                        ? 'Publishers with dual roles increase revenue by 67%'
                        : 'Advertisers using own inventory save 35% on costs'
                      }
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Current User/Role Display */}
            <button
              onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
              className="w-full flex items-center gap-3 p-3 bg-gray-100 dark:bg-graphite-850 rounded-lg hover:bg-gray-200 dark:hover:bg-graphite-800 transition-colors"
            >
              <div className="w-8 h-8 bg-acid/10 rounded-full flex items-center justify-center">
                <RoleIcon className="w-4 h-4 text-acid" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-graphite-100 truncate">
                  {config.title}
                  {userRoles.length > 1 && (
                    <span className="text-xs text-acid ml-1">+{userRoles.length - 1}</span>
                  )}
                </div>
                <div className="text-xs text-gray-600 dark:text-graphite-300 truncate">
                  {userRoles.length > 1 ? 'Multi-role • 0x1234...5678' : '0x1234...5678'}
                </div>
              </div>
              {availableRoles.length > 0 && (
                <div className="flex-shrink-0">
                  {isRoleSwitcherOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 dark:text-graphite-500" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-gray-400 dark:text-graphite-500" />
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}