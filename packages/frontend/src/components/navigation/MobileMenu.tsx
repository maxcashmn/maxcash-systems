import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import { useUIStore } from '../../core/state/uiStore';
import { ROUTES } from '../../core/constants/routes';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { notificationCount } = useUIStore();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <span className="text-xl font-bold text-primary-600">MaxCash</span>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink to={ROUTES.DASHBOARD} className="block px-3 py-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.MY_LOANS} className="block px-3 py-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            My Loans
          </NavLink>
          <NavLink to={ROUTES.TRANSACTIONS} className="block px-3 py-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            Transactions
          </NavLink>
          <NavLink to={ROUTES.NOTIFICATIONS} className="block px-3 py-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            Notifications
            {notificationCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {notificationCount}
              </span>
            )}
          </NavLink>
          <NavLink to={ROUTES.PROFILE} className="block px-3 py-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            Profile
          </NavLink>
          <NavLink to={ROUTES.SETTINGS} className="block px-3 py-2 rounded-lg hover:bg-gray-100" onClick={onClose}>
            Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};
