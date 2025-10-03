import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SharpBadgeProps {
  children: ReactNode;
  variant?: 'live' | 'pending' | 'default' | 'audience';
  className?: string;
}

export function SharpBadge({
  children,
  variant = 'default',
  className
}: SharpBadgeProps) {
  const variants = {
    live: 'bg-acid text-graphite-950',
    pending: 'bg-heat text-white',
    default: 'bg-[#374151] text-graphite-300',
    audience: 'bg-[#1F2937] border border-[#374151] text-graphite-300'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
