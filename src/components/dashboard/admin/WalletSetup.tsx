'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react';

interface WalletSetupProps {
  propertyId: string;
  propertyName: string;
  currentWallet?: string;
  isConfigured: boolean;
}

export function WalletSetup({
  propertyId,
  propertyName,
  currentWallet,
  isConfigured
}: WalletSetupProps) {
  const [walletAddress, setWalletAddress] = useState(currentWallet || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: API call to save wallet
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <Card className="p-6">
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
  );
}