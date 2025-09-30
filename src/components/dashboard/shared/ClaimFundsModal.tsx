'use client';
import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ClaimFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
  claimableAmount: string;
  walletAddress: string;
}

export function ClaimFundsModal({
  isOpen,
  onClose,
  campaignName,
  claimableAmount,
  walletAddress
}: ClaimFundsModalProps) {
  const [isClaiming, setIsClaiming] = useState(false);

  if (!isOpen) return null;

  const handleClaim = async () => {
    setIsClaiming(true);
    // TODO: API call to claim funds
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsClaiming(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-graphite-300 hover:text-gray-900 dark:hover:text-graphite-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-acid/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-acid" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-graphite-100">
                Claim Unused Funds
              </h2>
              <p className="text-sm text-gray-600 dark:text-graphite-500">
                {campaignName}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-acid/5 border border-acid/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-graphite-500 mb-1">
                Available to Claim
              </div>
              <div className="text-3xl font-medium text-acid">
                {claimableAmount}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-graphite-500 mb-1">
                Funds will be sent to
              </div>
              <div className="text-sm font-mono text-gray-900 dark:text-graphite-100 bg-gray-100 dark:bg-graphite-850 p-3 rounded">
                {walletAddress}
              </div>
            </div>

            <div className="text-xs text-gray-600 dark:text-graphite-500">
              Claiming funds will transfer the unused balance from this expired campaign to your wallet. This action cannot be undone.
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isClaiming}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleClaim}
              disabled={isClaiming}
              className="flex-1"
            >
              {isClaiming ? 'Claiming...' : 'Claim Funds'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}