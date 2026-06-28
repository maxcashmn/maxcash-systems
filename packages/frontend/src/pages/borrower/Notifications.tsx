import React from 'react';
import { Card } from '../../components/ui/Card';

export const Notifications: React.FC = () => {
  const [notifications] = React.useState([]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      <Card>
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No notifications yet.</p>
        ) : (
          <div>Notification list</div>
        )}
      </Card>
    </div>
  );
};
