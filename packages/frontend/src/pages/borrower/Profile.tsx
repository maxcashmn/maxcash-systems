import React from 'react';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../core/hooks/useAuth';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize">{user?.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{user?.status}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
