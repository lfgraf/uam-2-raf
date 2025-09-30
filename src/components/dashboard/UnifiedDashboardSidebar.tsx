'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
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
  Home,
  Sparkles
} from 'lucide-react';

interface UnifiedDashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = 'advertiser' | 'publisher' | 'admin';

function getUserRoleFromPath(pathname: string): UserRole {
  if (pathname.includes('/advertiser')) return 'advertiser';
  if (pathname.includes('/publisher')) return 'publisher';
  if (pathname.includes('/admin')) return 'admin';
  return 'advertiser'; // default
}

const unifiedNavigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
];

const roleSpecificNavigation = {
  advertiser: [
    { name: 'Campaigns', href: '/dashboard/advertiser', icon: BarChart3 },
    { name: 'Create Campaign', href: '/dashboard/advertiser/create', icon: PlusCircle },
    { name: 'Auction Bids', href: '/dashboard/advertiser/auctions', icon: Target },
    { name: 'Marketplace', href: '/dashboard/publisher/marketplace', icon: Target, label: 'Find Publishers' },
  ],
  publisher: [
    { name: 'Properties', href: '/dashboard/publisher', icon: Store },
    { name: 'Marketplace', href: '/dashboard/publisher/marketplace', icon: Target },
    { name: 'Add Property', href: '/dashboard/publisher/add-property', icon: PlusCircle },
  ],
  admin: [
    { name: 'Overview', href: '/dashboard/admin', icon: BarChart3 },
    { name: 'Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Disputes', href: '/dashboard/admin/disputes', icon: AlertTriangle },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ]
};

const roleConfig = {
  advertiser: {
    title: 'Advertiser',
    icon: TrendingUp,
    color: 'text-blue-600'
  },
  publisher: {
    title: 'Publisher',
    icon: Globe,
    color: 'text-green-600'
  },
  admin: {
    title: 'Admin',
    icon: Settings,
    color: 'text-purple-600'
  }
};

export function UnifiedDashboardSidebar({ isOpen, onClose }: UnifiedDashboardSidebarProps) {
  const pathname = usePathname();
  const currentRole = getUserRoleFromPath(pathname);
  const [activeRole, setActiveRole] = useState<UserRole>(currentRole);

  // Simulate user having multiple roles - in real app this would come from user data
  const userRoles: UserRole[] = ['advertiser', 'publisher'];

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    // Navigate to the role's main page
    const rolePages = {
      advertiser: '/dashboard/advertiser',
      publisher: '/dashboard/publisher',
      admin: '/dashboard/admin'
    };
    window.location.href = rolePages[newRole];
  };

  const handleAddRole = (role: 'advertiser' | 'publisher') => {
    // In real app, this would trigger onboarding flow
    console.log(`Adding ${role} role - would trigger onboarding`);
    alert(`Adding ${role} role - this would trigger a guided setup process!`);
  };

  const config = roleConfig[activeRole];
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
        "fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">UAM Platform</div>
                <div className="text-xs text-gray-900 dark:text-white/60">Unified Dashboard</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <RoleSwitcher
              currentRole={activeRole}
              availableRoles={userRoles}
              onRoleChange={handleRoleChange}
              onAddRole={handleAddRole}
              showAddRole={true}
            />
          </div>

          {/* Unified Navigation */}
          <div className="p-4">
            <div className="text-xs font-medium text-gray-900 dark:text-white/50 uppercase tracking-wide mb-3">
              General
            </div>
            <div className="space-y-1">
              {unifiedNavigation.map((item) => {
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
                        : "text-gray-900 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    )}
                    onClick={() => onClose()}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Role-Specific Navigation */}
          <div className="flex-1 p-4">
            <div className="text-xs font-medium text-gray-900 dark:text-white/50 uppercase tracking-wide mb-3 flex items-center gap-2">
              <RoleIcon className="w-4 h-4" />
              {config.title}
            </div>
            <div className="space-y-1">
              {roleSpecificNavigation[activeRole]?.map((item) => {
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
                        : "text-gray-900 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    )}
                    onClick={() => onClose()}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {'label' in item && item.label && (
                      <span className="text-xs bg-brand/20 text-brand px-2 py-1 rounded">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Cross-Role Suggestions */}
            {activeRole === 'advertiser' && userRoles.includes('publisher') && (
              <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  💡 Publisher Opportunity
                </div>
                <div className="text-xs text-green-700 dark:text-green-300 mb-2">
                  Your campaigns could use your own traffic for 40% cost savings
                </div>
                <Link
                  href="/dashboard/publisher"
                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                >
                  View Properties →
                </Link>
              </div>
            )}

            {activeRole === 'publisher' && userRoles.includes('advertiser') && (
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                  💡 Advertiser Opportunity
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                  Fill unsold inventory with your own campaigns
                </div>
                <Link
                  href="/dashboard/advertiser"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Campaigns →
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800/30 rounded-lg">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-brand">
                  {userRoles.map(role => role.charAt(0).toUpperCase()).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Multi-Role User
                </div>
                <div className="text-xs text-gray-900 dark:text-white/60">
                  {userRoles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(' + ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}