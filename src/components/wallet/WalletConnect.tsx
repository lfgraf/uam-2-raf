'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/Button";
import { X, Wallet, ExternalLink } from 'lucide-react';

const walletProviders = [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Connect using your MetaMask wallet',
    icon: '🦊',
    installed: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    description: 'Connect using WalletConnect',
    icon: '📱',
    installed: true
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: 'Connect using Coinbase Wallet',
    icon: '🔵',
    installed: false
  }
];

interface WalletConnectProps {
  onConnect?: (walletId: string) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId);

    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    setConnecting(null);
    setIsOpen(false);
    onConnect?.(walletId);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="primary" size="lg" className="inline-flex items-center gap-2 text-lg px-8 py-4">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl border p-6 z-50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-medium text-gray-900 dark:text-white">
              Connect Wallet
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <X className="w-4 h-4" />
              </Button>
            </Dialog.Close>
          </div>

          <p className="text-gray-900 dark:text-white/70 mb-6 text-sm">
            Choose your preferred wallet to connect to the UAM platform.
            Your wallet will be used for authentication and transactions.
          </p>

          <div className="space-y-3">
            {walletProviders.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                disabled={connecting === wallet.id || !wallet.installed}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{wallet.name}</div>
                      <div className="text-sm text-gray-900 dark:text-white/60">{wallet.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!wallet.installed && (
                      <div className="flex items-center gap-1 text-xs text-gray-900 dark:text-white/50">
                        <ExternalLink className="w-3 h-3" />
                        Install
                      </div>
                    )}
                    {connecting === wallet.id && (
                      <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-lg">🔒</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">Secure Connection</div>
                <div className="text-xs text-gray-900 dark:text-white/60 mt-1">
                  We never store your private keys. All transactions are processed securely through your wallet.
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}