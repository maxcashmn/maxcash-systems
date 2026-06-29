import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Loader } from '../../components/ui/Loader';
import { useToast } from '../../core/hooks/useToast';
import { formatDate } from '../../core/utils/formatters';

interface AuditLog {
  id: string | number;
  user: string;
  action: string;
  details: string;
  timestamp: Date | string;
}

export const AuditLogs: React.FC = () => {
  const toast = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      try {
        // Mock data for now - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockLogs: AuditLog[] = [
          { 
            id: 1, 
            user: 'admin@maxcash.com', 
            action: 'User Login', 
            details: 'Admin logged in from IP 192.168.1.1', 
            timestamp: new Date() 
          },
          { 
            id: 2, 
            user: 'manager@maxcash.com', 
            action: 'Loan Approved', 
            details: 'Loan #123 approved for $5,000', 
            timestamp: new Date(Date.now() - 3600000) 
          },
          { 
            id: 3, 
            user: 'borrower@maxcash.com', 
            action: 'Loan Application', 
            details: 'New loan application submitted for $2,500', 
            timestamp: new Date(Date.now() - 7200000) 
          },
          { 
            id: 4, 
            user: 'admin@maxcash.com', 
            action: 'User Created', 
            details: 'New manager user created: john.doe@maxcash.com', 
            timestamp: new Date(Date.now() - 86400000) 
          },
        ];
        setLogs(mockLogs);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load audit logs';
        toast.error(errorMessage);
        console.error('Error loading audit logs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadLogs();
  }, [toast]);

  const filteredLogs = logs.filter((log) => {
    const searchLower = search.toLowerCase();
    return (
      log.user.toLowerCase().includes(searchLower) ||
      log.action.toLowerCase().includes(searchLower) ||
      log.details.toLowerCase().includes(searchLower)
    );
  });

  // Get status color based on action type
  const getActionColor = (action: string) => {
    if (action.includes('Login')) return 'bg-blue-100 text-blue-800';
    if (action.includes('Approved') || action.includes('Created')) return 'bg-green-100 text-green-800';
    if (action.includes('Application') || action.includes('Pending')) return 'bg-yellow-100 text-yellow-800';
    if (action.includes('Rejected') || action.includes('Deleted')) return 'bg-red-100 text-red-800';
    if (action.includes('Updated') || action.includes('Modified')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <span className="text-sm text-gray-500">Total: {filteredLogs.length}</span>
      </div>

      <Input
        placeholder="Search logs by user, action, or details..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Details</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{log.details}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {formatDate(log.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <p className="text-center text-gray-500 py-8">No audit logs found matching your search.</p>
        )}
      </Card>
    </div>
  );
};