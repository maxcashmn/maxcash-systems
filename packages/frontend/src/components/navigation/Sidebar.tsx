import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import { useUIStore } from '../../core/state/uiStore';
import { ROUTES } from '../../core/constants/routes';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  roles?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: '📊' },
  { path: ROUTES.MY_LOANS, label: 'My Loans', icon: '💰', roles: ['borrower'] },
  { path: ROUTES.LOAN_APPLICATION, label: 'Apply for Loan', icon: '📝', roles: ['borrower'] },
  { path: ROUTES.TRANSACTIONS, label: 'Transactions', icon: '💳' },
  { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: '🔔' },
  { path: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: '⚙️' },
  // Admin routes
  { path: ROUTES.ADMIN_DASHBOARD, label: 'Admin Dashboard', icon: '🛡️', roles: ['admin'] },
  { path: ROUTES.ADMIN_USERS, label: 'Users', icon: '👥', roles: ['admin'] },
  { path: ROUTES.ADMIN_LOANS, label: 'Loans', icon: '📋', roles: ['admin'] },
  { path: ROUTES.ADMIN_AUDIT_LOGS, label: 'Audit Logs', icon: '📜', roles: ['admin'] },
  // Manager routes
  { path: ROUTES.MANAGER_DASHBOARD, label: 'Manager Dashboard', icon: '📊', roles: ['manager'] },
  { path: ROUTES.REVIEW_APPLICATIONS, label: 'Review Applications', icon: '📝', roles: ['manager'] },
  { path: ROUTES.ASSIGNED_BORROWERS, label: 'Assigned Borrowers', icon: '👥', roles: ['manager'] },
  // Auditor routes
  { path: ROUTES.AUDITOR_DASHBOARD, label: 'Auditor Dashboard', icon: '📊', roles: ['auditor'] },
  { path: ROUTES.AUDIT_TRAIL, label: 'Audit Trail', icon: '🔍', roles: ['auditor'] },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { sidebarOpen } = useUIStore();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (!item.roles) return true;
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  return (
    <aside
      className={`bg-[#0a1929] border-r border-[#1a3159] transition-all duration-300 flex flex-col flex-shrink-0 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Section */}
      <div className="p-4 border-b border-[#1a3159]">
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold text-white ${sidebarOpen ? '' : 'mx-auto'}`}>
            {sidebarOpen ? 'MaxCash' : 'MC'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#1a3159] text-orange-400 font-medium'
                  : 'text-gray-300 hover:bg-[#1a3159] hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {sidebarOpen && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-[#1a3159]">
        <div className={`flex items-center gap-3 px-3 py-2 ${sidebarOpen ? '' : 'justify-center'}`}>
          <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {user?.firstName?.[0] || 'U'}
          </span>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useUIStore } from '../../core/state/uiStore';
// import { ROUTES } from '../../core/constants/routes';

// interface NavItem {
//   path: string;
//   label: string;
//   icon: string;
//   roles?: string[];
// }

// const NAV_ITEMS: NavItem[] = [
//   { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: '📊' },
//   { path: ROUTES.MY_LOANS, label: 'My Loans', icon: '💰', roles: ['borrower'] },
//   { path: ROUTES.LOAN_APPLICATION, label: 'Apply for Loan', icon: '📝', roles: ['borrower'] },
//   { path: ROUTES.TRANSACTIONS, label: 'Transactions', icon: '💳' },
//   { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: '🔔' },
//   { path: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
//   { path: ROUTES.SETTINGS, label: 'Settings', icon: '⚙️' },
//   // Admin routes
//   { path: ROUTES.ADMIN_DASHBOARD, label: 'Admin Dashboard', icon: '🛡️', roles: ['admin'] },
//   { path: ROUTES.ADMIN_USERS, label: 'Users', icon: '👥', roles: ['admin'] },
//   { path: ROUTES.ADMIN_LOANS, label: 'Loans', icon: '📋', roles: ['admin'] },
//   { path: ROUTES.ADMIN_AUDIT_LOGS, label: 'Audit Logs', icon: '📜', roles: ['admin'] },
//   // Manager routes
//   { path: ROUTES.MANAGER_DASHBOARD, label: 'Manager Dashboard', icon: '📊', roles: ['manager'] },
//   { path: ROUTES.REVIEW_APPLICATIONS, label: 'Review Applications', icon: '📝', roles: ['manager'] },
//   { path: ROUTES.ASSIGNED_BORROWERS, label: 'Assigned Borrowers', icon: '👥', roles: ['manager'] },
//   // Auditor routes
//   { path: ROUTES.AUDITOR_DASHBOARD, label: 'Auditor Dashboard', icon: '📊', roles: ['auditor'] },
//   { path: ROUTES.AUDIT_TRAIL, label: 'Audit Trail', icon: '🔍', roles: ['auditor'] },
// ];

// export const Sidebar: React.FC = () => {
//   const { user } = useAuth();
//   const { sidebarOpen } = useUIStore();

//   const visibleItems = NAV_ITEMS.filter((item) => {
//     if (!item.roles) return true;
//     if (!user) return false;
//     return item.roles.includes(user.role);
//   });

//   return (
//     <aside
//       className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
//         sidebarOpen ? 'w-64' : 'w-20'
//       }`}
//     >
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center gap-2">
//           <span className="text-xl font-bold text-primary-600">
//             {sidebarOpen ? 'MaxCash' : 'MC'}
//           </span>
//         </div>
//       </div>

//       <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
//         {visibleItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
//                 isActive
//                   ? 'bg-primary-50 text-primary-700 font-medium'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`
//             }
//           >
//             <span className="text-lg">{item.icon}</span>
//             {sidebarOpen && <span className="text-sm">{item.label}</span>}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="p-3 border-t border-gray-200">
//         <div className={`flex items-center gap-3 px-3 py-2 ${sidebarOpen ? '' : 'justify-center'}`}>
//           <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm">
//             {user?.firstName?.[0] || 'U'}
//           </span>
//           {sidebarOpen && (
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };
