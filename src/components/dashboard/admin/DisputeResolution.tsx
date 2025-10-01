'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import {
  AlertTriangle,
  XCircle,
  MessageSquare,
  FileText,
  Calendar,
  DollarSign,
  User,
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Dispute {
  id: string;
  title: string;
  type: 'payment' | 'attribution' | 'fraud' | 'policy' | 'technical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  parties: {
    complainant: {
      id: string;
      name: string;
      type: 'advertiser' | 'publisher';
      email: string;
    };
    defendant: {
      id: string;
      name: string;
      type: 'advertiser' | 'publisher';
      email: string;
    };
  };
  amount?: {
    disputed: number;
    currency: string;
  };
  campaign?: {
    id: string;
    name: string;
  };
  description: string;
  evidence: {
    documents: string[];
    screenshots: string[];
    logs: string[];
  };
  timeline: DisputeEvent[];
  resolution?: {
    decision: string;
    reasoning: string;
    compensation?: {
      amount: number;
      recipient: 'complainant' | 'defendant' | 'split';
    };
  };
}

interface DisputeEvent {
  id: string;
  type: 'created' | 'updated' | 'message' | 'evidence' | 'escalated' | 'resolved';
  timestamp: string;
  actor: string;
  description: string;
  metadata?: Record<string, unknown>;
}

// Mock dispute data
const disputes: Dispute[] = [
  {
    id: 'disp_001',
    title: 'Attribution Mismatch - Mobile Gaming Campaign',
    type: 'attribution',
    status: 'investigating',
    priority: 'high',
    createdAt: '2024-12-28T09:00:00Z',
    updatedAt: '2024-12-29T14:30:00Z',
    parties: {
      complainant: {
        id: 'adv_123',
        name: 'GameStudio Pro',
        type: 'advertiser',
        email: 'disputes@gamestudio.com'
      },
      defendant: {
        id: 'pub_456',
        name: 'MobileTraffic Network',
        type: 'publisher',
        email: 'support@mobiletraffic.net'
      }
    },
    amount: {
      disputed: 2500,
      currency: 'USD'
    },
    campaign: {
      id: 'camp_001',
      name: 'Premium Mobile Gaming App Install Campaign'
    },
    description: 'Advertiser claims 450 conversions were not properly attributed to publisher traffic, resulting in unpaid commissions.',
    evidence: {
      documents: ['attribution_report.pdf', 'blockchain_logs.json'],
      screenshots: ['dashboard_screenshot_1.png', 'analytics_report.png'],
      logs: ['server_logs_dec28.txt', 'tracking_events.json']
    },
    timeline: [
      {
        id: 'evt_001',
        type: 'created',
        timestamp: '2024-12-28T09:00:00Z',
        actor: 'GameStudio Pro',
        description: 'Dispute created regarding attribution discrepancies'
      },
      {
        id: 'evt_002',
        type: 'evidence',
        timestamp: '2024-12-28T11:30:00Z',
        actor: 'MobileTraffic Network',
        description: 'Submitted counter-evidence with tracking logs'
      },
      {
        id: 'evt_003',
        type: 'escalated',
        timestamp: '2024-12-29T10:00:00Z',
        actor: 'Admin',
        description: 'Escalated to senior dispute resolution team'
      }
    ]
  },
  {
    id: 'disp_002',
    title: 'Fraudulent Click Activity Detected',
    type: 'fraud',
    status: 'open',
    priority: 'critical',
    createdAt: '2024-12-29T08:15:00Z',
    updatedAt: '2024-12-29T08:15:00Z',
    parties: {
      complainant: {
        id: 'adv_789',
        name: 'E-commerce Plus',
        type: 'advertiser',
        email: 'fraud@ecommerceplus.com'
      },
      defendant: {
        id: 'pub_101',
        name: 'Traffic Boost LLC',
        type: 'publisher',
        email: 'legal@trafficboost.com'
      }
    },
    amount: {
      disputed: 8750,
      currency: 'USD'
    },
    description: 'Suspicious click patterns detected with 95% bot traffic probability and unrealistic conversion rates.',
    evidence: {
      documents: ['fraud_analysis.pdf'],
      screenshots: ['traffic_patterns.png'],
      logs: ['click_analysis.json']
    },
    timeline: [
      {
        id: 'evt_004',
        type: 'created',
        timestamp: '2024-12-29T08:15:00Z',
        actor: 'E-commerce Plus',
        description: 'Fraud dispute opened with evidence of suspicious traffic patterns'
      }
    ]
  },
  {
    id: 'disp_003',
    title: 'Payment Processing Delay',
    type: 'payment',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-12-25T16:20:00Z',
    updatedAt: '2024-12-27T12:00:00Z',
    parties: {
      complainant: {
        id: 'pub_202',
        name: 'Content Creator Hub',
        type: 'publisher',
        email: 'payments@contenthub.io'
      },
      defendant: {
        id: 'adv_303',
        name: 'Fashion Forward Brands',
        type: 'advertiser',
        email: 'accounting@fashionforward.com'
      }
    },
    amount: {
      disputed: 1250,
      currency: 'USD'
    },
    description: 'Publisher payment has been delayed beyond the standard 7-day settlement period.',
    evidence: {
      documents: ['payment_schedule.pdf'],
      screenshots: [],
      logs: ['transaction_history.json']
    },
    timeline: [
      {
        id: 'evt_005',
        type: 'created',
        timestamp: '2024-12-25T16:20:00Z',
        actor: 'Content Creator Hub',
        description: 'Payment delay dispute opened'
      },
      {
        id: 'evt_006',
        type: 'resolved',
        timestamp: '2024-12-27T12:00:00Z',
        actor: 'Admin',
        description: 'Payment released after technical issue resolution'
      }
    ],
    resolution: {
      decision: 'Resolved in favor of complainant',
      reasoning: 'Technical issue in payment processing system caused delay. Payment has been processed with additional compensation for inconvenience.',
      compensation: {
        amount: 1325,
        recipient: 'complainant'
      }
    }
  }
];

function getStatusColor(status: Dispute['status']) {
  switch (status) {
    case 'open':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'investigating':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
    case 'resolved':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'closed':
      return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-graphite-900/20 dark:text-gray-300 dark:border-gray-800';
  }
}

function getPriorityColor(priority: Dispute['priority']) {
  switch (priority) {
    case 'low':
      return 'text-green-600 dark:text-green-400';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'high':
      return 'text-orange-600 dark:text-orange-400';
    case 'critical':
      return 'text-red-600 dark:text-red-400';
  }
}

function getTypeIcon(type: Dispute['type']) {
  switch (type) {
    case 'payment':
      return <DollarSign className="w-4 h-4" />;
    case 'attribution':
      return <AlertTriangle className="w-4 h-4" />;
    case 'fraud':
      return <XCircle className="w-4 h-4" />;
    case 'policy':
      return <FileText className="w-4 h-4" />;
    case 'technical':
      return <AlertTriangle className="w-4 h-4" />;
  }
}

function DisputeCard({ dispute, onViewDetails }: { dispute: Dispute; onViewDetails: (dispute: Dispute) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-graphite-800 rounded-lg flex items-center justify-center">
            {getTypeIcon(dispute.type)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-graphite-100 mb-1">
              {dispute.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-900 dark:text-graphite-300">
              <span>#{dispute.id.slice(-3)}</span>
              <span>•</span>
              <span className="capitalize">{dispute.type}</span>
              <span>•</span>
              <span className={`font-medium capitalize ${getPriorityColor(dispute.priority)}`}>
                {dispute.priority} priority
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusColor(dispute.status)}`}>
            {dispute.status}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        {dispute.amount && (
          <div className="flex items-center gap-2 text-gray-900 dark:text-graphite-300">
            <DollarSign className="w-4 h-4" />
            <span>Disputed Amount: {dispute.amount.currency} {dispute.amount.disputed.toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-900 dark:text-graphite-300">
          <Calendar className="w-4 h-4" />
          <span>Created {new Date(dispute.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-900 dark:text-graphite-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{dispute.parties.complainant.name} (Complainant)</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span>{dispute.parties.defendant.name} (Defendant)</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-graphite-700 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-graphite-100 mb-2">Description</h4>
            <p className="text-sm text-gray-900 dark:text-graphite-300">
              {dispute.description}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-graphite-100 mb-2">Evidence</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="font-medium text-gray-900 dark:text-graphite-300">Documents:</span>
                <ul className="mt-1 text-gray-900 dark:text-graphite-300">
                  {dispute.evidence.documents.map((doc, i) => (
                    <li key={i}>• {doc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-graphite-300">Screenshots:</span>
                <ul className="mt-1 text-gray-900 dark:text-graphite-300">
                  {dispute.evidence.screenshots.length > 0 ? (
                    dispute.evidence.screenshots.map((shot, i) => (
                      <li key={i}>• {shot}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-graphite-300">Logs:</span>
                <ul className="mt-1 text-gray-900 dark:text-graphite-300">
                  {dispute.evidence.logs.map((log, i) => (
                    <li key={i}>• {log}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {dispute.resolution && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Resolution</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                {dispute.resolution.decision}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {dispute.resolution.reasoning}
              </p>
              {dispute.resolution.compensation && (
                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                  Compensation: {dispute.amount?.currency} {dispute.resolution.compensation.amount.toLocaleString()} to {dispute.resolution.compensation.recipient}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="primary" onClick={() => onViewDetails(dispute)}>
              View Full Details
            </Button>
            {dispute.status !== 'resolved' && dispute.status !== 'closed' && (
              <>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
                <Button variant="outline">
                  Update Status
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export function DisputeResolution() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  const filteredDisputes = disputes.filter(dispute => {
    return (statusFilter === 'all' || dispute.status === statusFilter) &&
           (priorityFilter === 'all' || dispute.priority === priorityFilter);
  });

  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    investigating: disputes.filter(d => d.status === 'investigating').length,
    resolved: disputes.filter(d => d.status === 'resolved').length,
    critical: disputes.filter(d => d.priority === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100 mb-2">
          Dispute Resolution
        </h1>
        <p className="text-gray-900 dark:text-graphite-300">
          Manage and resolve platform disputes efficiently
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-gray-900 dark:text-graphite-100">{stats.total}</div>
          <div className="text-sm text-gray-900 dark:text-graphite-300">Total Disputes</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-blue-600">{stats.open}</div>
          <div className="text-sm text-gray-900 dark:text-graphite-300">Open</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-yellow-600">{stats.investigating}</div>
          <div className="text-sm text-gray-900 dark:text-graphite-300">Investigating</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-green-600">{stats.resolved}</div>
          <div className="text-sm text-gray-900 dark:text-graphite-300">Resolved</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-red-600">{stats.critical}</div>
          <div className="text-sm text-gray-900 dark:text-graphite-300">Critical</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm w-auto"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </Select>

          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-sm w-auto"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </div>
      </Card>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute) => (
          <DisputeCard
            key={dispute.id}
            dispute={dispute}
            onViewDetails={setSelectedDispute}
          />
        ))}
      </div>
    </div>
  );
}