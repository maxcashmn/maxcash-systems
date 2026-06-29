import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import { useUIStore } from '../../core/state/uiStore';
import { ROUTES } from '../../core/constants/routes';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { toggleSidebar } = useUIStore();
  
  const notificationCount = 0;

  const handleLogout = async () => {
    try {
      const { logout } = useAuth();
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get the correct dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user) return ROUTES.DASHBOARD;
    switch (user.role) {
      case 'admin':
        return ROUTES.ADMIN_DASHBOARD;
      case 'manager':
        return ROUTES.MANAGER_DASHBOARD;
      case 'auditor':
        return ROUTES.AUDITOR_DASHBOARD;
      default:
        return ROUTES.DASHBOARD;
    }
  };

  // Check if current path is a public page (not a dashboard page)
  const currentPath = location.pathname;
  const isDashboardPath = 
    currentPath.startsWith('/dashboard') ||
    currentPath.startsWith('/my-loans') ||
    currentPath.startsWith('/loan-application') ||
    currentPath.startsWith('/transactions') ||
    currentPath.startsWith('/notifications') ||
    currentPath.startsWith('/profile') ||
    currentPath.startsWith('/settings') ||
    currentPath.startsWith('/manager') ||
    currentPath.startsWith('/admin') ||
    currentPath.startsWith('/auditor');

  // If it's NOT a dashboard path, it's a public page
  const isPublicPage = !isDashboardPath && currentPath !== '/login' && currentPath !== '/register';

  // Debug log to help troubleshoot
  console.log('📍 Current path:', currentPath);
  console.log('🏠 Is public page?', isPublicPage);
  console.log('📊 Is dashboard path?', isDashboardPath);

  // Public navigation items
  const publicNavItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Services', path: '/services' },
    { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS },
    { label: 'Loan Calculator', path: '/loan-calculator' },
    { label: 'FAQ', path: ROUTES.FAQ },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];

  return (
    <nav className={`bg-[#0a1929] border-b border-[#1a3159] px-4 py-3 sticky top-0 z-50 shadow-lg flex-shrink-0 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section - Hamburger + Logo + Public Nav */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo - Always links to dashboard */}
          <Link 
            to={getDashboardRoute()} 
            className="text-xl font-bold text-white hover:text-orange-400 transition-colors duration-200"
          >
            MaxCash
          </Link>

          {/* Public Navigation Links - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-[#1a3159] pl-4">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-[#1a3159] text-orange-400'
                    : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Return to Dashboard Button - ONLY shows on public pages */}
          {isPublicPage && (
            <Link
              to={getDashboardRoute()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Dashboard
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden relative">
            <button className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Notifications */}
          <Link
            to={ROUTES.NOTIFICATIONS}
            className="relative p-2 rounded-lg hover:bg-[#1a3159] transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a3159] transition-colors">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
              <span className="hidden md:block text-sm font-medium text-white">
                {user?.firstName || user?.email || 'User'}
              </span>
              <span className="hidden md:block text-xs text-gray-400 capitalize">
                ({user?.role})
              </span>
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white hover:text-red-400"
            aria-label="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Public Navigation */}
      <div className="lg:hidden mt-2 pt-2 border-t border-[#1a3159] overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {/* Dashboard link always visible on mobile */}
          <Link
            to={getDashboardRoute()}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap font-medium ${
              !isPublicPage
                ? 'bg-orange-500 text-white'
                : 'bg-[#1a3159] text-orange-400 hover:bg-[#1a3159]/80'
            }`}
          >
            📊 Dashboard
          </Link>
          {publicNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap ${
                location.pathname === item.path
                  ? 'bg-[#1a3159] text-orange-400'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useUIStore } from '../../core/state/uiStore';
// import { ROUTES } from '../../core/constants/routes';

// interface NavbarProps {
//   className?: string;
// }

// export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const { toggleSidebar } = useUIStore();
  
//   const notificationCount = 0;

//   const handleLogout = async () => {
//     try {
//       const { logout } = useAuth();
//       await logout();
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Define all public page paths
//   const publicPaths = [
//     '/',
//     ROUTES.HOME,
//     ROUTES.ABOUT,
//     '/services',
//     ROUTES.LOAN_PRODUCTS,
//     '/loan-calculator',
//     ROUTES.FAQ,
//     ROUTES.CONTACT,
//     '/apply',
//   ];

//   // Check if current path is a public page
//   const isPublicPage = publicPaths.some(path => location.pathname === path);

//   // Get the correct dashboard route based on user role
//   const getDashboardRoute = () => {
//     if (!user) return ROUTES.DASHBOARD;
//     switch (user.role) {
//       case 'admin':
//         return ROUTES.ADMIN_DASHBOARD;
//       case 'manager':
//         return ROUTES.MANAGER_DASHBOARD;
//       case 'auditor':
//         return ROUTES.AUDITOR_DASHBOARD;
//       default:
//         return ROUTES.DASHBOARD;
//     }
//   };

//   // Public navigation items
//   const publicNavItems = [
//     { label: 'Home', path: ROUTES.HOME },
//     { label: 'About', path: ROUTES.ABOUT },
//     { label: 'Services', path: '/services' },
//     { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS },
//     { label: 'Loan Calculator', path: '/loan-calculator' },
//     { label: 'FAQ', path: ROUTES.FAQ },
//     { label: 'Contact', path: ROUTES.CONTACT },
//   ];

//   return (
//     <nav className={`bg-[#0a1929] border-b border-[#1a3159] px-4 py-3 sticky top-0 z-50 shadow-lg flex-shrink-0 ${className}`}>
//       <div className="flex items-center justify-between">
//         {/* Left Section - Hamburger + Logo */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white"
//             aria-label="Toggle sidebar"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
          
//           {/* Logo - Always links to dashboard */}
//           <Link 
//             to={getDashboardRoute()} 
//             className="text-xl font-bold text-white hover:text-orange-400 transition-colors duration-200"
//           >
//             MaxCash
//           </Link>

//           {/* Public Navigation Links - Hidden on mobile, shown on desktop */}
//           <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-[#1a3159] pl-4">
//             {publicNavItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
//                   location.pathname === item.path
//                     ? 'bg-[#1a3159] text-orange-400'
//                     : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-2">
//           {/* Return to Dashboard Button - ONLY shows on public pages */}
//           {isPublicPage && (
//             <Link
//               to={getDashboardRoute()}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               Return to Dashboard
//             </Link>
//           )}

//           {/* Mobile Menu Toggle */}
//           <div className="lg:hidden relative">
//             <button className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>

//           {/* Notifications */}
//           <Link
//             to={ROUTES.NOTIFICATIONS}
//             className="relative p-2 rounded-lg hover:bg-[#1a3159] transition-colors"
//           >
//             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 {notificationCount > 9 ? '9+' : notificationCount}
//               </span>
//             )}
//           </Link>

//           {/* User Menu */}
//           <div className="relative">
//             <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a3159] transition-colors">
//               <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
//                 {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
//               </span>
//               <span className="hidden md:block text-sm font-medium text-white">
//                 {user?.firstName || user?.email || 'User'}
//               </span>
//               <span className="hidden md:block text-xs text-gray-400 capitalize">
//                 ({user?.role})
//               </span>
//             </button>
//           </div>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white hover:text-red-400"
//             aria-label="Logout"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Public Navigation */}
//       <div className="lg:hidden mt-2 pt-2 border-t border-[#1a3159] overflow-x-auto">
//         <div className="flex gap-2 pb-1">
//           {/* Dashboard link always visible on mobile public nav */}
//           <Link
//             to={getDashboardRoute()}
//             className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap font-medium ${
//               !isPublicPage
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-[#1a3159] text-orange-400 hover:bg-[#1a3159]/80'
//             }`}
//           >
//             📊 {!isPublicPage ? 'Dashboard' : 'Return'}
//           </Link>
//           {publicNavItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap ${
//                 location.pathname === item.path
//                   ? 'bg-[#1a3159] text-orange-400'
//                   : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useUIStore } from '../../core/state/uiStore';
// import { ROUTES } from '../../core/constants/routes';

// interface NavbarProps {
//   className?: string;
// }

// export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const { toggleSidebar } = useUIStore();
  
//   const notificationCount = 0;

//   const handleLogout = async () => {
//     try {
//       const { logout } = useAuth();
//       await logout();
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Check if user is on a public page
//   const isPublicPage = !location.pathname.startsWith('/dashboard') && 
//                        !location.pathname.startsWith('/my-loans') &&
//                        !location.pathname.startsWith('/loan-application') &&
//                        !location.pathname.startsWith('/transactions') &&
//                        !location.pathname.startsWith('/notifications') &&
//                        !location.pathname.startsWith('/profile') &&
//                        !location.pathname.startsWith('/settings') &&
//                        !location.pathname.startsWith('/manager') &&
//                        !location.pathname.startsWith('/admin') &&
//                        !location.pathname.startsWith('/auditor');

//   // Get the correct dashboard route based on user role
//   const getDashboardRoute = () => {
//     if (!user) return ROUTES.DASHBOARD;
//     switch (user.role) {
//       case 'admin':
//         return ROUTES.ADMIN_DASHBOARD;
//       case 'manager':
//         return ROUTES.MANAGER_DASHBOARD;
//       case 'auditor':
//         return ROUTES.AUDITOR_DASHBOARD;
//       default:
//         return ROUTES.DASHBOARD;
//     }
//   };

//   // Public navigation items
//   const publicNavItems = [
//     { label: 'Home', path: ROUTES.HOME },
//     { label: 'About', path: ROUTES.ABOUT },
//     { label: 'Services', path: '/services' },
//     { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS },
//     { label: 'Loan Calculator', path: '/loan-calculator' },
//     { label: 'FAQ', path: ROUTES.FAQ },
//     { label: 'Contact', path: ROUTES.CONTACT },
//   ];

//   return (
//     <nav className={`bg-[#0a1929] border-b border-[#1a3159] px-4 py-3 sticky top-0 z-50 shadow-lg flex-shrink-0 ${className}`}>
//       <div className="flex items-center justify-between">
//         {/* Left Section - Hamburger + Logo */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white"
//             aria-label="Toggle sidebar"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
          
//           {/* Logo - Always links to dashboard */}
//           <Link 
//             to={getDashboardRoute()} 
//             className="text-xl font-bold text-white hover:text-orange-400 transition-colors duration-200"
//           >
//             MaxCash
//           </Link>

//           {/* Public Navigation Links - Hidden on mobile, shown on desktop */}
//           <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-[#1a3159] pl-4">
//             {publicNavItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
//                   location.pathname === item.path
//                     ? 'bg-[#1a3159] text-orange-400'
//                     : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-2">
//           {/* Return to Dashboard Button - ONLY shows on public pages */}
//           {isPublicPage && (
//             <Link
//               to={getDashboardRoute()}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               Return to Dashboard
//             </Link>
//           )}

//           {/* Mobile Menu Toggle */}
//           <div className="lg:hidden relative">
//             <button className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>

//           {/* Notifications */}
//           <Link
//             to={ROUTES.NOTIFICATIONS}
//             className="relative p-2 rounded-lg hover:bg-[#1a3159] transition-colors"
//           >
//             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 {notificationCount > 9 ? '9+' : notificationCount}
//               </span>
//             )}
//           </Link>

//           {/* User Menu */}
//           <div className="relative">
//             <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a3159] transition-colors">
//               <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
//                 {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
//               </span>
//               <span className="hidden md:block text-sm font-medium text-white">
//                 {user?.firstName || user?.email || 'User'}
//               </span>
//               <span className="hidden md:block text-xs text-gray-400 capitalize">
//                 ({user?.role})
//               </span>
//             </button>
//           </div>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white hover:text-red-400"
//             aria-label="Logout"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Public Navigation */}
//       <div className="lg:hidden mt-2 pt-2 border-t border-[#1a3159] overflow-x-auto">
//         <div className="flex gap-2 pb-1">
//           {/* Dashboard link always visible on mobile public nav */}
//           <Link
//             to={getDashboardRoute()}
//             className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap font-medium ${
//               !isPublicPage
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-[#1a3159] text-orange-400 hover:bg-[#1a3159]/80'
//             }`}
//           >
//             📊 {!isPublicPage ? 'Dashboard' : 'Return'}
//           </Link>
//           {publicNavItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap ${
//                 location.pathname === item.path
//                   ? 'bg-[#1a3159] text-orange-400'
//                   : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useUIStore } from '../../core/state/uiStore';
// import { ROUTES } from '../../core/constants/routes';

// interface NavbarProps {
//   className?: string;
// }

// export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const { toggleSidebar } = useUIStore();
  
//   const notificationCount = 0;

//   const handleLogout = async () => {
//     try {
//       const { logout } = useAuth();
//       await logout();
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Check if user is on a public page
//   const isPublicPage = !location.pathname.startsWith('/dashboard') && 
//                        !location.pathname.startsWith('/my-loans') &&
//                        !location.pathname.startsWith('/loan-application') &&
//                        !location.pathname.startsWith('/transactions') &&
//                        !location.pathname.startsWith('/notifications') &&
//                        !location.pathname.startsWith('/profile') &&
//                        !location.pathname.startsWith('/settings') &&
//                        !location.pathname.startsWith('/manager') &&
//                        !location.pathname.startsWith('/admin') &&
//                        !location.pathname.startsWith('/auditor');

//   // Get the correct dashboard route based on user role
//   const getDashboardRoute = () => {
//     if (!user) return ROUTES.DASHBOARD;
//     switch (user.role) {
//       case 'admin':
//         return ROUTES.ADMIN_DASHBOARD;
//       case 'manager':
//         return ROUTES.MANAGER_DASHBOARD;
//       case 'auditor':
//         return ROUTES.AUDITOR_DASHBOARD;
//       default:
//         return ROUTES.DASHBOARD;
//     }
//   };

//   // Public navigation items that should be accessible from dashboard
//   const publicNavItems = [
//     { label: 'Home', path: ROUTES.HOME },
//     { label: 'About', path: ROUTES.ABOUT },
//     { label: 'Services', path: '/services' },
//     { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS },
//     { label: 'Loan Calculator', path: '/loan-calculator' },
//     { label: 'FAQ', path: ROUTES.FAQ },
//     { label: 'Contact', path: ROUTES.CONTACT },
//   ];

//   return (
//     <nav className={`bg-[#0a1929] border-b border-[#1a3159] px-4 py-3 sticky top-0 z-50 shadow-lg flex-shrink-0 ${className}`}>
//       <div className="flex items-center justify-between">
//         {/* Left Section - Hamburger + Logo + Public Nav */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white"
//             aria-label="Toggle sidebar"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
          
//           {/* Dashboard Link - Always visible */}
//           <Link 
//             to={getDashboardRoute()} 
//             className="text-xl font-bold text-white hover:text-orange-400 transition-colors duration-200 flex items-center gap-2"
//           >
//             MaxCash
//             {!isPublicPage && (
//               <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
//                 Dashboard
//               </span>
//             )}
//           </Link>

//           {/* Quick Dashboard Return Button - Shows when on public pages */}
//           {isPublicPage && (
//             <Link
//               to={getDashboardRoute()}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               Return to Dashboard
//             </Link>
//           )}

//           {/* Public Navigation Links - Visible on Dashboard */}
//           <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-[#1a3159] pl-4">
//             {publicNavItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
//                   location.pathname === item.path
//                     ? 'bg-[#1a3159] text-orange-400'
//                     : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-2">
//           {/* Public Nav - Mobile Dropdown */}
//           <div className="lg:hidden relative">
//             <button className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>

//           {/* Notifications */}
//           <Link
//             to={ROUTES.NOTIFICATIONS}
//             className="relative p-2 rounded-lg hover:bg-[#1a3159] transition-colors"
//           >
//             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 {notificationCount > 9 ? '9+' : notificationCount}
//               </span>
//             )}
//           </Link>

//           {/* User Menu */}
//           <div className="relative">
//             <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a3159] transition-colors">
//               <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
//                 {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
//               </span>
//               <span className="hidden md:block text-sm font-medium text-white">
//                 {user?.firstName || user?.email || 'User'}
//               </span>
//               <span className="hidden md:block text-xs text-gray-400 capitalize">
//                 ({user?.role})
//               </span>
//             </button>
//           </div>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white hover:text-red-400"
//             aria-label="Logout"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Public Navigation Dropdown */}
//       <div className="lg:hidden mt-2 pt-2 border-t border-[#1a3159] overflow-x-auto">
//         <div className="flex gap-2 pb-1">
//           {/* Dashboard link first on mobile */}
//           <Link
//             to={getDashboardRoute()}
//             className="px-3 py-1.5 text-xs bg-orange-500 text-white rounded-lg transition-colors duration-200 whitespace-nowrap font-medium"
//           >
//             📊 Dashboard
//           </Link>
//           {publicNavItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap ${
//                 location.pathname === item.path
//                   ? 'bg-[#1a3159] text-orange-400'
//                   : 'text-gray-300 hover:text-white hover:bg-[#1a3159]'
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useUIStore } from '../../core/state/uiStore';
// import { ROUTES } from '../../core/constants/routes';

// interface NavbarProps {
//   className?: string;
// }

// export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
//   // Get user and logout from auth hook
//   const { user } = useAuth();
//   // Get toggleSidebar from UI store
//   const { toggleSidebar } = useUIStore();
  
//   // Notification count - check if it exists in your store
//   // If not, you might need to get it from a different source
//   // For now, using 0 as fallback
//   const notificationCount = 0;

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       // Get logout from useAuth inside the function
//       const { logout } = useAuth();
//       await logout();
//       // Redirect to login page after logout
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav className={`bg-[#0a1929] border-b border-[#1a3159] px-4 py-3 sticky top-0 z-50 shadow-lg ${className}`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           {/* Toggle Sidebar Button */}
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white"
//             aria-label="Toggle sidebar"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
          
//           {/* Logo */}
//           <Link 
//             to={ROUTES.DASHBOARD} 
//             className="text-xl font-bold text-white hover:text-orange-400 transition-colors duration-200"
//           >
//             MaxCash
//           </Link>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Notifications */}
//           <Link
//             to={ROUTES.NOTIFICATIONS}
//             className="relative p-2 rounded-lg hover:bg-[#1a3159] transition-colors"
//           >
//             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 {notificationCount > 9 ? '9+' : notificationCount}
//               </span>
//             )}
//           </Link>

//           {/* User Menu */}
//           <div className="relative">
//             <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a3159] transition-colors">
//               <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
//                 {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
//               </span>
//               <span className="hidden md:block text-sm font-medium text-white">
//                 {user?.firstName || user?.email || 'User'}
//               </span>
//             </button>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="p-2 rounded-lg hover:bg-[#1a3159] transition-colors text-white hover:text-red-400"
//             aria-label="Logout"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

