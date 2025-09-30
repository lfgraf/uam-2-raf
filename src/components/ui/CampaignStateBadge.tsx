import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export type CampaignState = 'active' | 'bidding' | 'expired';

interface CampaignStateBadgeProps {
  state: CampaignState;
  className?: string;
}

const stateConfig = {
  active: {
    label: 'Active',
    className: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
  },
  bidding: {
    label: 'Bidding',
    className: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
  },
  expired: {
    label: 'Expired',
    className: 'bg-gray-100 dark:bg-graphite-800 text-gray-700 dark:text-graphite-300'
  }
};

export function CampaignStateBadge({ state, className }: CampaignStateBadgeProps) {
  const config = stateConfig[state];

  return (
    <Badge
      variant="secondary"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}