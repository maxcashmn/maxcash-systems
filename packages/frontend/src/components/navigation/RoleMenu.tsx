import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import { ROUTES } from '../../core/constants/routes';

interface RoleMenuProps {
  onItemClick?: () => void;
}

export const RoleMenu: React.FC<RoleMenuProps> = ({ onItemClick }) => {
  const { user } = useAuth();

  if (!user) return null;

  const roleRoutes: Record<string, Array<{ path: string; label: string }>> = {
    admin: [
      { path: ROUTES.ADMIN_DASHBOARD, label: 'Admin Dashboard' },
      { path: ROUTES.ADMIN_USERS, label: 'Users' },
      { path: ROUTES.ADMIN_LOANS, label: 'Loans' },
      { path: ROUTES.ADMIN_AUDIT_LOGS, label: 'Audit Logs' },
    ],
    manager: [
      { path: ROUTES.MANAGER_DASHBOARD, label: 'Manager Dashboard' },
      { path: ROUTES.REVIEW_APPLICATIONS, label: 'Review Applications' },
      { path: ROUTES.ASSIGNED_BORROWERS, label: 'Assigned Borrowers' },
    ],
    auditor: [
      { path: ROUTES.AUDITOR_DASHBOARD, label: 'Auditor Dashboard' },
      { path: ROUTES.AUDIT_TRAIL, label: 'Audit Trail' },
    ],
    borrower: [
      { path: ROUTES.DASHBOARD, label: 'Dashboard' },
      { path: ROUTES.MY_LOANS, label: 'My Loans' },
      { path: ROUTES.LOAN_APPLICATION, label: 'Apply for Loan' },
      { path: ROUTES.TRANSACTIONS, label: 'Transactions' },
    ],
  };

  const routes = roleRoutes[user.role] || [];

  if (routes.length === 0) return null;

  return (
    <div className="space-y-1">
      <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {user.role} Menu
      </p>
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={onItemClick}
        >
          {route.label}
        </NavLink>
      ))}
    </div>
  );
};
