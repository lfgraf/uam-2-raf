'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Wallet, CheckCircle, AlertCircle, X } from 'lucide-react';

interface WalletSetupProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyName: string;
  initialWalletAddress?: string;
}

export function WalletSetup({
  isOpen,
  onClose,
  propertyId,
  propertyName,
  initialWalletAddress
}: WalletSetupProps) {
  const [walletAddress, setWalletAddress] = useState(initialWalletAddress || '');
  const [isSaving, setIsSaving] = useState(false);
  const isConfigured = !!initialWalletAddress;

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: API call to save wallet
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={(e) => e.stopPropagation()}>
        <Card className="w-full max-w-lg p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-graphite-850 rounded text-gray-900 dark:text-graphite-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-acid/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-acid" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-graphite-100">
                Wallet Configuration
              </h3>
              <p className="text-sm text-gray-600 dark:text-graphite-500">
                {propertyName}
              </p>
            </div>
            {isConfigured && (
              <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
            )}
          </div>

          {!isConfigured && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                This property cannot go live until a wallet is configured for payments.
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 bg-gray-100 dark:bg-graphite-800 border border-gray-200 dark:border-graphite-700 rounded-lg text-gray-900 dark:text-graphite-100 placeholder:text-gray-500 dark:placeholder:text-graphite-500 focus:outline-none focus:ring-2 focus:ring-acid/30 focus:border-acid"
              />
              <p className="text-xs text-gray-600 dark:text-graphite-500 mt-1">
                Enter the Ethereum wallet address for this property&apos;s revenue payments
              </p>
            </div>

            <Button
              onClick={handleSave}
              disabled={!walletAddress || isSaving}
              className="w-full"
            >
              {isSaving ? 'Saving...' : isConfigured ? 'Update Wallet' : 'Configure Wallet'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}