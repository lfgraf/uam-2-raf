'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  History,
  Star,
  Settings,
  Target,
  Wallet,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    children: [
      { label: 'History', href: '/dashboard/advertiser-2/history' },
      { label: 'Starred', href: '/dashboard/advertiser-2/starred' },
      { label: 'Settings', href: '/dashboard/advertiser-2/settings' },
    ]
  },
  {
    label: 'Campaigns',
    icon: Target,
    href: '/dashboard/advertiser-2'
  },
  {
    label: 'Wallet',
    icon: Wallet,
    href: '/dashboard/advertiser-2/wallet'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/advertiser-2/settings'
  }
];

export function SharpSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Dashboard']);

  const toggleSection = (label: string) => {
    setExpandedSections(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="w-[230px] h-screen bg-[#2D3748] border-r border-[#1F2937] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1F2937]">
        <div className="w-10 h-10 bg-acid rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-graphite-950 rounded-sm" />
        </div>
      </div>

      {/* Platform Label */}
      <div className="px-6 py-4">
        <span className="text-xs text-graphite-500 uppercase tracking-wider font-medium">
          Platform
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedSections.includes(item.label);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.label} className="mb-1">
              <button
                onClick={() => hasChildren ? toggleSection(item.label) : null}
                className="w-full flex items-center justify-between px-3 py-2 text-graphite-100 hover:bg-[#374151] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {hasChildren && (
                  isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-graphite-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-graphite-400" />
                  )
                )}
              </button>

              {/* Children */}
              {hasChildren && isExpanded && (
                <div className="ml-7 mt-1 space-y-1">
                  {item.children?.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-3 py-2 text-sm text-graphite-300 hover:text-graphite-100 hover:bg-[#374151] transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#1F2937]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-graphite-700 flex items-center justify-center text-graphite-100 text-sm font-medium">
            R
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-graphite-100 truncate">
              Raf
            </div>
            <div className="text-xs text-graphite-400 truncate">
              raf@raf.works
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-graphite-400" />
        </div>
      </div>
    </div>
  );
}
