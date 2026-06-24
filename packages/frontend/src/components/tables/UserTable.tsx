import React from 'react';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '../ui/Table';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { formatDate } from '../../core/utils/formatters';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  loading?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onView,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (users.length === 0) {
    return <div className="text-center py-8 text-gray-500">No users found</div>;
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'text-purple-600',
      manager: 'text-blue-600',
      auditor: 'text-indigo-600',
      borrower: 'text-green-600',
    };
    return colors[role] || 'text-gray-600';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Joined</TableHeaderCell>
          <TableHeaderCell align="right">Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className={getRoleColor(user.role)}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </TableCell>
            <TableCell><StatusPill status={user.status} /></TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
            <TableCell align="right">
              <div className="flex gap-2 justify-end">
                {onView && (
                  <Button size="sm" variant="secondary" onClick={() => onView(user)}>
                    View
                  </Button>
                )}
                {onEdit && (
                  <Button size="sm" variant="primary" onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button size="sm" variant="danger" onClick={() => onDelete(user)}>
                    Delete
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
