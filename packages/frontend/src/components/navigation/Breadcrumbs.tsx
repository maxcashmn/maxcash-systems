import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/login': 'Login',
  '/register': 'Register',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/unauthorized': 'Unauthorized',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/notifications': 'Notifications',
  '/loan-application': 'Loan Application',
  '/my-loans': 'My Loans',
  '/transactions': 'Transactions',
  '/repayment-schedule': 'Repayment Schedule',
  '/manager/dashboard': 'Manager Dashboard',
  '/manager/review': 'Review Applications',
  '/manager/borrowers': 'Assigned Borrowers',
  '/auditor/dashboard': 'Auditor Dashboard',
  '/auditor/audit-trail': 'Audit Trail',
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/users': 'Users',
  '/admin/loans': 'Loans',
  '/admin/audit-logs': 'Audit Logs',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    for (const segment of paths) {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      items.push({ label, path: currentPath });
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 py-2">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <React.Fragment key={item.path}>
            {index > 0 && <span className="text-gray-300">/</span>}
            {isLast ? (
              <span className="font-medium text-gray-900">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-primary-600 transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
