'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, CheckCircle, AlertCircle, ExternalLink, Eye } from 'lucide-react';

interface AttributionEvent {
  id: string;
  type: 'click' | 'view' | 'conversion' | 'payment';
  timestamp: string;
  status: 'confirmed' | 'pending' | 'disputed';
  blockchainTxId?: string;
  details: {
    userId?: string;
    campaignId: string;
    publisherId?: string;
    amount?: string;
    currency?: string;
  };
}

interface AttributionTrackerProps {
  campaignId: string;
  conversionId: string;
}

// Mock data for demo
const mockEvents: AttributionEvent[] = [
  {
    id: '1',
    type: 'click',
    timestamp: '2024-12-29T10:30:00Z',
    status: 'confirmed',
    blockchainTxId: '0x1234...5678',
    details: {
      userId: 'user_12345',
      campaignId: 'camp_001',
      publisherId: 'pub_123'
    }
  },
  {
    id: '2',
    type: 'view',
    timestamp: '2024-12-29T10:35:00Z',
    status: 'confirmed',
    blockchainTxId: '0x2345...6789',
    details: {
      userId: 'user_12345',
      campaignId: 'camp_001',
      publisherId: 'pub_123'
    }
  },
  {
    id: '3',
    type: 'conversion',
    timestamp: '2024-12-29T10:45:00Z',
    status: 'pending',
    details: {
      userId: 'user_12345',
      campaignId: 'camp_001',
      amount: '25.00',
      currency: 'USD'
    }
  },
  {
    id: '4',
    type: 'payment',
    timestamp: '2024-12-29T11:00:00Z',
    status: 'pending',
    details: {
      campaignId: 'camp_001',
      publisherId: 'pub_123',
      amount: '2.50',
      currency: 'USD'
    }
  }
];

function getEventIcon(type: AttributionEvent['type']) {
  switch (type) {
    case 'click':
      return '👆';
    case 'view':
      return '👁️';
    case 'conversion':
      return '🎯';
    case 'payment':
      return '💰';
  }
}

function getStatusIcon(status: AttributionEvent['status']) {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'disputed':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
  }
}

function getStatusColor(status: AttributionEvent['status']) {
  switch (status) {
    case 'confirmed':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
    case 'disputed':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
  }
}

export function AttributionTracker({ campaignId, conversionId }: AttributionTrackerProps) {
  const [showDetails, setShowDetails] = useState(false);
  const events = mockEvents.filter(e => e.details.campaignId === campaignId);

  const pendingEvents = events.filter(e => e.status === 'pending').length;
  const confirmedEvents = events.filter(e => e.status === 'confirmed').length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Attribution Trail
          </h3>
          <p className="text-sm text-gray-900 dark:text-white/60">
            Blockchain-verified conversion path for transparency
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Eye className="w-4 h-4 mr-2" />
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <div className="text-2xl font-medium text-gray-900 dark:text-white">{events.length}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Total Events</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-medium text-green-600">{confirmedEvents}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Confirmed</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-medium text-yellow-600">{pendingEvents}</div>
          <div className="text-sm text-gray-900 dark:text-white/60">Pending</div>
        </div>
      </div>

      {/* Attribution Chain */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Attribution Chain</h4>
        {events.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Connection Line */}
            {index < events.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
            )}

            <div className={`flex items-start gap-4 p-4 border rounded-lg ${getStatusColor(event.status)}`}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xl border-2 border-current">
                  {getEventIcon(event.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-medium capitalize">{event.type}</h5>
                  {getStatusIcon(event.status)}
                  <span className="text-xs px-2 py-1 rounded-full bg-current/20 capitalize">
                    {event.status}
                  </span>
                </div>

                <div className="text-sm opacity-80 mb-2">
                  {new Date(event.timestamp).toLocaleString()}
                </div>

                {showDetails && (
                  <div className="space-y-2 pt-2 border-t border-current/20">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      {event.details.userId && (
                        <div>
                          <span className="font-medium">User:</span> {event.details.userId}
                        </div>
                      )}
                      {event.details.publisherId && (
                        <div>
                          <span className="font-medium">Publisher:</span> {event.details.publisherId}
                        </div>
                      )}
                      {event.details.amount && (
                        <div>
                          <span className="font-medium">Amount:</span> {event.details.currency} {event.details.amount}
                        </div>
                      )}
                      {event.blockchainTxId && (
                        <div className="col-span-2 flex items-center gap-2">
                          <span className="font-medium">Blockchain TX:</span>
                          <code className="text-xs bg-black/10 dark:bg-white/10 px-1 rounded">
                            {event.blockchainTxId}
                          </code>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingEvents > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                Pending Verification
              </h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {pendingEvents} event(s) are awaiting blockchain confirmation.
                This typically takes 2-10 minutes depending on network congestion.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}