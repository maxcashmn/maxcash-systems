import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Loader } from '../../components/ui/Loader';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { userApi } from '../../core/api/userApi';
import { formatDate } from '../../core/utils/formatters';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  phoneNumber?: string;
}

export const Borrowers: React.FC = () => {
  const toast = useToast();
  const [borrowers, setBorrowers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const { execute: fetchUsers, isLoading, error } = useApi(userApi.listUsers);

  useEffect(() => {
    const loadBorrowers = async () => {
      try {
        const response = await fetchUsers({ role: 'borrower' });
        console.log('Full response:', response); // Debug: see what the response looks like
        
        // Check if response exists and has data
        if (response) {
          // Try different ways to extract the data
          let userData: User[] = [];
          
          // Case 1: response is an object with a data property that's an array
          if (typeof response === 'object' && 'data' in response && Array.isArray((response as any).data)) {
            userData = (response as any).data;
          }
          // Case 2: response itself is an array
          else if (Array.isArray(response)) {
            userData = response;
          }
          // Case 3: response has data but it's nested deeper
          else if (typeof response === 'object' && response !== null) {
            // Look for any property that's an array
            const values = Object.values(response);
            const arrayValue = values.find(val => Array.isArray(val));
            if (arrayValue) {
              userData = arrayValue;
            }
          }
          
          setBorrowers(userData);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load borrowers';
        toast.error(errorMessage);
        console.error('Error loading borrowers:', err);
      }
    };
    loadBorrowers();
  }, [fetchUsers, toast]);

  // Show error if any
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-primary-600 hover:text-primary-800"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  const filteredBorrowers = borrowers.filter((borrower) => {
    const searchLower = search.toLowerCase();
    return (
      (borrower.firstName?.toLowerCase() || '').includes(searchLower) ||
      (borrower.lastName?.toLowerCase() || '').includes(searchLower) ||
      (borrower.email?.toLowerCase() || '').includes(searchLower)
    );
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Assigned Borrowers</h1>
        <span className="text-sm text-gray-500">Total: {filteredBorrowers.length}</span>
      </div>

      <Input
        placeholder="Search borrowers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBorrowers.map((borrower) => (
                <tr key={borrower.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">
                    {borrower.firstName} {borrower.lastName}
                  </td>
                  <td className="py-3 px-4 text-sm">{borrower.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      borrower.status === 'active' ? 'bg-green-100 text-green-800' :
                      borrower.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      borrower.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {borrower.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{formatDate(borrower.createdAt)}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => window.location.href = `/manager/borrowers/${borrower.id}`}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      View Loans
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBorrowers.length === 0 && (
          <p className="text-center text-gray-500 py-8">No borrowers found.</p>
        )}
      </Card>
    </div>
  );
};