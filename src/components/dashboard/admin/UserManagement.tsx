'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';

interface User {
  id: string;
  walletAddress: string;
  roles: ('advertiser' | 'publisher' | 'admin')[];
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  totalSpend?: number;
  totalEarned?: number;
  activeCampaigns?: number;
  activeProperties?: number;
  lastActive: string;
  verificationStatus: 'verified' | 'unverified' | 'pending';
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 'user_001',
    walletAddress: '0x742d35Cc6634C0532925a3b8...a4',
    roles: ['advertiser', 'publisher'],
    status: 'active',
    joinedDate: '2024-01-15',
    totalSpend: 45200,
    totalEarned: 18900,
    activeCampaigns: 8,
    activeProperties: 3,
    lastActive: '2 hours ago',
    verificationStatus: 'verified'
  },
  {
    id: 'user_002',
    walletAddress: '0x8f3Cf7ad23Cd3CaDbD9735AF...b2',
    roles: ['advertiser'],
    status: 'active',
    joinedDate: '2024-02-20',
    totalSpend: 28500,
    activeCampaigns: 5,
    lastActive: '1 day ago',
    verificationStatus: 'verified'
  },
  {
    id: 'user_003',
    walletAddress: '0x1bA0Dc0A35A8C63AeB2B5423...c7',
    roles: ['publisher'],
    status: 'active',
    joinedDate: '2024-03-10',
    totalEarned: 34200,
    activeProperties: 12,
    lastActive: '4 hours ago',
    verificationStatus: 'verified'
  },
  {
    id: 'user_004',
    walletAddress: '0x9fE46736679d2D9a65F0992F...8d',
    roles: ['advertiser'],
    status: 'pending',
    joinedDate: '2024-12-28',
    totalSpend: 0,
    activeCampaigns: 0,
    lastActive: '10 minutes ago',
    verificationStatus: 'pending'
  },
  {
    id: 'user_005',
    walletAddress: '0x5FbDB2315678afecb367f032...1f',
    roles: ['publisher'],
    status: 'suspended',
    joinedDate: '2024-08-15',
    totalEarned: 12300,
    activeProperties: 0,
    lastActive: '2 weeks ago',
    verificationStatus: 'unverified'
  },
  {
    id: 'user_006',
    walletAddress: '0xe7f1725E7734CE288F8367e1...9a',
    roles: ['advertiser', 'publisher'],
    status: 'active',
    joinedDate: '2024-05-22',
    totalSpend: 62100,
    totalEarned: 28900,
    activeCampaigns: 12,
    activeProperties: 7,
    lastActive: '30 minutes ago',
    verificationStatus: 'verified'
  }
];

function getStatusColor(status: User['status']) {
  switch (status) {
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'suspended':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
  }
}

function getStatusIcon(status: User['status']) {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4" />;
    case 'suspended':
      return <XCircle className="w-4 h-4" />;
    case 'pending':
      return <AlertCircle className="w-4 h-4" />;
  }
}

function UserDetailsModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900 dark:text-graphite-100">User Details</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-900 dark:text-graphite-300 mb-1">Wallet Address</div>
              <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                {user.walletAddress}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-900 dark:text-graphite-300 mb-1">Status</div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(user.status)} flex items-center gap-1`}>
                  {getStatusIcon(user.status)}
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div>
            <div className="text-sm text-gray-900 dark:text-graphite-300 mb-2">Roles</div>
            <div className="flex gap-2">
              {user.roles.map((role) => (
                <Badge key={role} variant="secondary" className="capitalize">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.totalSpend !== undefined && (
              <div className="p-4 bg-gray-50 dark:bg-graphite-850 rounded-lg">
                <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Total Spend</div>
                <div className="text-lg font-medium text-gray-900 dark:text-graphite-100">
                  ${user.totalSpend.toLocaleString()}
                </div>
              </div>
            )}
            {user.totalEarned !== undefined && (
              <div className="p-4 bg-gray-50 dark:bg-graphite-850 rounded-lg">
                <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Total Earned</div>
                <div className="text-lg font-medium text-gray-900 dark:text-graphite-100">
                  ${user.totalEarned.toLocaleString()}
                </div>
              </div>
            )}
            {user.activeCampaigns !== undefined && (
              <div className="p-4 bg-gray-50 dark:bg-graphite-850 rounded-lg">
                <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Campaigns</div>
                <div className="text-lg font-medium text-gray-900 dark:text-graphite-100">
                  {user.activeCampaigns}
                </div>
              </div>
            )}
            {user.activeProperties !== undefined && (
              <div className="p-4 bg-gray-50 dark:bg-graphite-850 rounded-lg">
                <div className="text-xs text-gray-900 dark:text-graphite-300 mb-1">Properties</div>
                <div className="text-lg font-medium text-gray-900 dark:text-graphite-100">
                  {user.activeProperties}
                </div>
              </div>
            )}
          </div>

          {/* Timeline Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-900 dark:text-graphite-300">
              <Calendar className="w-4 h-4" />
              Joined: {new Date(user.joinedDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-gray-900 dark:text-graphite-300">
              <User className="w-4 h-4" />
              Last active: {user.lastActive}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-graphite-700">
            {user.status === 'pending' && (
              <>
                <Button className="flex-1">Approve User</Button>
                <Button variant="secondary" className="flex-1">Reject</Button>
              </>
            )}
            {user.status === 'active' && (
              <>
                <Button variant="secondary" className="flex-1">Suspend User</Button>
                <Button variant="outline" className="flex-1">View Activity Log</Button>
              </>
            )}
            {user.status === 'suspended' && (
              <Button className="flex-1">Reactivate User</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'advertiser' | 'publisher' | 'admin'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.roles.includes(roleFilter);

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100">User Management</h1>
          <p className="text-gray-900 dark:text-graphite-300">
            Manage platform users and their permissions
          </p>
        </div>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-900 dark:text-graphite-300 mb-1">Total Users</div>
          <div className="text-2xl font-medium text-gray-900 dark:text-graphite-100">{mockUsers.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-900 dark:text-graphite-300 mb-1">Active</div>
          <div className="text-2xl font-medium text-green-600">
            {mockUsers.filter(u => u.status === 'active').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-900 dark:text-graphite-300 mb-1">Pending</div>
          <div className="text-2xl font-medium text-yellow-600">
            {mockUsers.filter(u => u.status === 'pending').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-900 dark:text-graphite-300 mb-1">Suspended</div>
          <div className="text-2xl font-medium text-red-600">
            {mockUsers.filter(u => u.status === 'suspended').length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by wallet address or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | User['status'])}
            className="text-sm w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </Select>

          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | 'advertiser' | 'publisher' | 'admin')}
            className="text-sm w-auto"
          >
            <option value="all">All Roles</option>
            <option value="advertiser">Advertiser</option>
            <option value="publisher">Publisher</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-graphite-850 border-b border-gray-200 dark:border-graphite-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-graphite-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-graphite-300 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-graphite-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-graphite-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-graphite-300 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-900 dark:text-graphite-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-graphite-850/30">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                        {user.walletAddress.slice(0, 10)}...{user.walletAddress.slice(-4)}
                      </div>
                      <div className="text-xs text-gray-900 dark:text-graphite-300">{user.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs capitalize">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(user.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-graphite-100">{user.lastActive}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-graphite-300">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-900 dark:text-graphite-300">
            No users found matching your filters
          </div>
        )}
      </Card>

      {/* Results count */}
      <div className="text-sm text-gray-900 dark:text-graphite-300">
        Showing {filteredUsers.length} of {mockUsers.length} users
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}