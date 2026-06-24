import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatRelativeTime } from '../../../core/utils/formatters';

interface Notification {
  id: string;
  subject: string;
  content: string;
  status: string;
  createdAt: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkRead?: (id: string) => void;
  loading?: boolean;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkRead,
  loading = false,
}) => {
  if (loading) return <div>Loading notifications...</div>;
  if (notifications.length === 0) return <div className="text-center py-8 text-gray-500">No notifications</div>;

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <p className="font-medium">{notification.subject}</p>
              <p className="text-sm text-gray-600">{notification.content}</p>
              <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.createdAt)}</p>
            </div>
            {notification.status !== 'read' && onMarkRead && (
              <Button size="sm" variant="secondary" onClick={() => onMarkRead(notification.id)}>
                Mark Read
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
