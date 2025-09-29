'use client';
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
  X
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
        "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <RoleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">UAM Platform</div>
                <div className="text-xs text-gray-900 dark:text-white/60 capitalize">{userRole}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 dark:bg-gray-800 rounded"
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
                        ? "bg-brand text-white"
                        : "text-gray-900 dark:text-white/70 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-gray-800/50"
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800/30 rounded-lg">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-brand">
                  {userRole.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)} User
                </div>
                <div className="text-xs text-gray-900 dark:text-white/60">
                  0x1234...5678
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}