'use client';
import { useState } from 'react';
import { X, Check, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface BidReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bid: {
    id: string;
    campaignName: string;
    advertiser: string;
    bidAmount: string;
    cpu: string;
    impressions: string;
  };
}

export function BidReviewModal({ isOpen, onClose, bid }: BidReviewModalProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  if (!isOpen) return null;

  const handleAccept = async () => {
    setIsAccepting(true);
    // TODO: API call to accept bid
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAccepting(false);
    onClose();
  };

  const handleReject = async () => {
    setIsRejecting(true);
    // TODO: API call to reject bid
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRejecting(false);
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

          <h2 className="text-xl font-medium text-gray-900 dark:text-graphite-100 mb-4">
            Review Bid
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-graphite-500">Campaign</div>
              <div className="text-base font-medium text-gray-900 dark:text-graphite-100">
                {bid.campaignName}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-graphite-500">Advertiser</div>
              <div className="text-base font-medium text-gray-900 dark:text-graphite-100">
                {bid.advertiser}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-graphite-500">Bid Amount</div>
                <div className="text-base font-medium text-gray-900 dark:text-graphite-100">
                  {bid.bidAmount}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-graphite-500">CPU</div>
                <div className="text-base font-medium text-gray-900 dark:text-graphite-100">
                  {bid.cpu}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-graphite-500">Impressions</div>
                <div className="text-base font-medium text-gray-900 dark:text-graphite-100">
                  {bid.impressions}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={isAccepting || isRejecting}
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              {isRejecting ? 'Rejecting...' : 'Reject'}
            </Button>
            <Button
              onClick={handleAccept}
              disabled={isAccepting || isRejecting}
              className="flex-1"
            >
              <Check className="w-4 h-4 mr-2" />
              {isAccepting ? 'Accepting...' : 'Accept Bid'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}