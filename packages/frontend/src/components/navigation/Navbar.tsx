import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../core/hooks/useAuth';
import { useUIStore } from '../../core/state/uiStore';
import { ROUTES } from '../../core/constants/routes';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toggleSidebar } = useUIStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const notificationCount = 0;

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getDashboardRoute = () => {
    if (!user) return ROUTES.DASHBOARD;
    switch (user.role) {
      case 'admin': return ROUTES.ADMIN_DASHBOARD;
      case 'manager': return ROUTES.MANAGER_DASHBOARD;
      case 'auditor': return ROUTES.AUDITOR_DASHBOARD;
      default: return ROUTES.DASHBOARD;
    }
  };

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

  const isPublicPage = !isDashboardPath && currentPath !== '/login' && currentPath !== '/register';

  const publicNavItems = [
    { label: 'Home', path: ROUTES.HOME, icon: '🏠' },
    { label: 'About', path: ROUTES.ABOUT, icon: 'ℹ️' },
    { label: 'Services', path: '/services', icon: '⚡' },
    { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS, icon: '💰' },
    { label: 'Calculator', path: '/loan-calculator', icon: '🧮' },
    { label: 'FAQ', path: ROUTES.FAQ, icon: '❓' },
    { label: 'Contact', path: ROUTES.CONTACT, icon: '📧' },
  ];

  return (
    <nav className={`sticky top-0 z-50 flex-shrink-0 border-b border-[#1a3159]/50 bg-gradient-to-r from-[#0a1929] via-[#0d2137] to-[#0a1929] shadow-2xl backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between px-6 py-3">

        {/* ============================
            Left Section
        ============================ */}
        <div className="flex items-center gap-5">

          {/* Sidebar Toggle with Animation */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="rounded-xl bg-slate-800/50 p-2.5 text-white transition-colors hover:bg-orange-500/20"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>

          {/* Logo with Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to={getDashboardRoute()} className="group flex flex-col">
              <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                💰 MaxCash
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-blue-200/70">
                Loan Management System
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="ml-4 hidden items-center gap-2 border-l border-[#1a3159]/50 pl-6 lg:flex">
            {publicNavItems.map((item, index) => {
              const active = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`group relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 overflow-hidden ${
                      active
                        ? 'text-orange-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      active
                        ? 'bg-orange-500/20'
                        : 'bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-orange-500/10'
                    }`}></span>
                    
                    <span className="relative flex items-center gap-1.5">
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </span>
                    
                    {active && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-400 rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ============================
            Right Section
        ============================ */}
        <div className="flex items-center gap-3">

          {/* Return to Dashboard */}
          {isPublicPage && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={getDashboardRoute()}
                className="group relative hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-semibold text-white rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <svg className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="relative z-10">Dashboard</span>
              </Link>
            </motion.div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-800/50 text-white transition-colors hover:bg-orange-500/20"
          >
            <svg className={`h-5 w-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>

          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              to={ROUTES.NOTIFICATIONS}
              className="relative rounded-xl bg-slate-800/50 p-2.5 text-white transition-colors hover:bg-orange-500/20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notificationCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-xs font-bold text-white"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* User Menu */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-3 py-2 transition-colors hover:bg-orange-500/20"
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white shadow-lg shadow-orange-500/20"
            >
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </motion.span>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-white">
                {user?.firstName || 'User'}
              </p>
              <p className="text-xs capitalize text-blue-200/70">
                {user?.role}
              </p>
            </div>
          </motion.button>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="rounded-xl bg-red-600/80 p-2.5 text-white transition-colors hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30"
            aria-label="Logout"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </motion.button>

        </div>
      </div>

      {/* Mobile Navigation with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-[#1a3159]/50 bg-[#0a1929]/80 px-4 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 py-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={getDashboardRoute()}
                  className={`group relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${
                    !isPublicPage
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-slate-800/50 text-slate-200 hover:bg-orange-500/20 hover:text-white'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    📊 Dashboard
                  </span>
                </Link>
              </motion.div>
              
              {publicNavItems.map((item, index) => {
                const active = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`group relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${
                        active
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-slate-800/50 text-slate-200 hover:bg-orange-500/20 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};



// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useUIStore } from '../../core/state/uiStore';
// import { ROUTES } from '../../core/constants/routes';

// interface NavbarProps {
//   className?: string;
// }

// export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
//   const location = useLocation();
//   const { user, logout } = useAuth();
//   const { toggleSidebar } = useUIStore();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const notificationCount = 0;

//   const handleLogout = async () => {
//     try {
//       await logout();
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const getDashboardRoute = () => {
//     if (!user) return ROUTES.DASHBOARD;
//     switch (user.role) {
//       case 'admin': return ROUTES.ADMIN_DASHBOARD;
//       case 'manager': return ROUTES.MANAGER_DASHBOARD;
//       case 'auditor': return ROUTES.AUDITOR_DASHBOARD;
//       default: return ROUTES.DASHBOARD;
//     }
//   };

//   const currentPath = location.pathname;
//   const isDashboardPath =
//     currentPath.startsWith('/dashboard') ||
//     currentPath.startsWith('/my-loans') ||
//     currentPath.startsWith('/loan-application') ||
//     currentPath.startsWith('/transactions') ||
//     currentPath.startsWith('/notifications') ||
//     currentPath.startsWith('/profile') ||
//     currentPath.startsWith('/settings') ||
//     currentPath.startsWith('/manager') ||
//     currentPath.startsWith('/admin') ||
//     currentPath.startsWith('/auditor');

//   const isPublicPage = !isDashboardPath && currentPath !== '/login' && currentPath !== '/register';

//   const publicNavItems = [
//     { label: 'Home', path: ROUTES.HOME, icon: '🏠' },
//     { label: 'About', path: ROUTES.ABOUT, icon: 'ℹ️' },
//     { label: 'Services', path: '/services', icon: '⚡' },
//     { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS, icon: '💰' },
//     { label: 'Calculator', path: '/loan-calculator', icon: '🧮' },
//     { label: 'FAQ', path: ROUTES.FAQ, icon: '❓' },
//     { label: 'Contact', path: ROUTES.CONTACT, icon: '📧' },
//   ];

//   return (
//     <nav className={`sticky top-0 z-50 flex-shrink-0 border-b border-[#1a3159]/50 bg-gradient-to-r from-[#0a1929] via-[#0d2137] to-[#0a1929] shadow-2xl backdrop-blur-sm ${className}`}>
//       <div className="flex items-center justify-between px-6 py-3">

//         {/* ============================
//             Left Section
//         ============================ */}
//         <div className="flex items-center gap-5">

//           {/* Sidebar Toggle with Animation */}
//           <button
//             onClick={toggleSidebar}
//             aria-label="Toggle Sidebar"
//             className="group relative rounded-xl bg-slate-800/50 p-2.5 text-white transition-all duration-300 hover:scale-110 hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/20"
//           >
//             <svg className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//             <span className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></span>
//           </button>

//           {/* Logo with Gradient and Animation */}
//           <Link to={getDashboardRoute()} className="group flex flex-col">
//             <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 group-hover:from-orange-300 group-hover:to-orange-400">
//               💰 MaxCash
//             </span>
//             <span className="text-xs font-medium uppercase tracking-widest text-blue-200/70 transition-colors group-hover:text-blue-200">
//               Loan Management System
//             </span>
//           </Link>

//           {/* Desktop Navigation with Enhanced Effects */}
//           <div className="ml-4 hidden items-center gap-2 border-l border-[#1a3159]/50 pl-6 lg:flex">
//             {publicNavItems.map((item) => {
//               const active = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`group relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 overflow-hidden ${
//                     active
//                       ? 'text-orange-400'
//                       : 'text-gray-300 hover:text-white'
//                   }`}
//                 >
//                   {/* Background hover effect */}
//                   <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
//                     active
//                       ? 'bg-orange-500/20'
//                       : 'bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-orange-500/10'
//                   }`}></span>
                  
//                   {/* Shine effect on hover */}
//                   <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent"></span>
                  
//                   <span className="relative flex items-center gap-1.5">
//                     <span className="text-base">{item.icon}</span>
//                     {item.label}
//                   </span>
                  
//                   {/* Active indicator */}
//                   {active && (
//                     <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-400 rounded-full animate-pulse"></span>
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//         </div>

//         {/* ============================
//             Right Section
//         ============================ */}
//         <div className="flex items-center gap-3">

//           {/* Return to Dashboard with Animation */}
//           {isPublicPage && (
//             <Link
//               to={getDashboardRoute()}
//               className="group relative hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-semibold text-white rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 overflow-hidden"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//               <svg className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               <span className="relative z-10">Dashboard</span>
//             </Link>
//           )}

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2.5 rounded-xl bg-slate-800/50 text-white transition-all duration-300 hover:bg-orange-500/20 hover:scale-110"
//           >
//             <svg className={`h-5 w-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//             </svg>
//           </button>

//           {/* Notifications with Animation */}
//           <Link
//             to={ROUTES.NOTIFICATIONS}
//             className="group relative rounded-xl bg-slate-800/50 p-2.5 text-white transition-all duration-300 hover:scale-110 hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/20"
//           >
//             <svg className="h-5 w-5 group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//             {notificationCount > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-xs font-bold text-white animate-bounce">
//                 {notificationCount > 9 ? '9+' : notificationCount}
//               </span>
//             )}
//             <span className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300"></span>
//           </Link>

//           {/* User Menu with Animation */}
//           <button className="group flex items-center gap-3 rounded-xl bg-slate-800/50 px-3 py-2 transition-all duration-300 hover:scale-105 hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/20">
//             <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
//               {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
//             </span>
//             <div className="hidden text-left lg:block">
//               <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
//                 {user?.firstName || 'User'}
//               </p>
//               <p className="text-xs capitalize text-blue-200/70 group-hover:text-blue-200 transition-colors duration-300">
//                 {user?.role}
//               </p>
//             </div>
//           </button>

//           {/* Logout with Animation */}
//           <button
//             onClick={handleLogout}
//             className="group relative rounded-xl bg-red-600/80 p-2.5 text-white transition-all duration-300 hover:scale-110 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30"
//             aria-label="Logout"
//           >
//             <svg className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             <span className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/20 transition-all duration-300"></span>
//           </button>

//         </div>
//       </div>

//       {/* Mobile Navigation with Smooth Animation */}
//       <div className={`lg:hidden border-t border-[#1a3159]/50 bg-[#0a1929]/80 px-4 overflow-hidden transition-all duration-500 ease-in-out ${
//         isMobileMenuOpen ? 'max-h-[500px] py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
//       }`}>
//         <div className="flex flex-wrap gap-2">
//           <Link
//             to={getDashboardRoute()}
//             className={`group relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${
//               !isPublicPage
//                 ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
//                 : 'bg-slate-800/50 text-slate-200 hover:bg-orange-500/20 hover:text-white'
//             }`}
//           >
//             <span className="relative z-10 flex items-center gap-1.5">
//               📊 Dashboard
//             </span>
//             {!isPublicPage && (
//               <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//             )}
//           </Link>
          
//           {publicNavItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`group relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${
//                   active
//                     ? 'bg-orange-500/20 text-orange-400'
//                     : 'bg-slate-800/50 text-slate-200 hover:bg-orange-500/20 hover:text-white'
//                 }`}
//               >
//                 <span className="relative z-10 flex items-center gap-1.5">
//                   <span>{item.icon}</span>
//                   {item.label}
//                 </span>
//                 <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-500/5 transition-all duration-300"></span>
//               </Link>
//             );
//           })}
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

//   // Check if current path is a public page (not a dashboard page)
//   const currentPath = location.pathname;
//   const isDashboardPath = 
//     currentPath.startsWith('/dashboard') ||
//     currentPath.startsWith('/my-loans') ||
//     currentPath.startsWith('/loan-application') ||
//     currentPath.startsWith('/transactions') ||
//     currentPath.startsWith('/notifications') ||
//     currentPath.startsWith('/profile') ||
//     currentPath.startsWith('/settings') ||
//     currentPath.startsWith('/manager') ||
//     currentPath.startsWith('/admin') ||
//     currentPath.startsWith('/auditor');

//   // If it's NOT a dashboard path, it's a public page
//   const isPublicPage = !isDashboardPath && currentPath !== '/login' && currentPath !== '/register';

//   // Debug log to help troubleshoot
//   console.log('📍 Current path:', currentPath);
//   console.log('🏠 Is public page?', isPublicPage);
//   console.log('📊 Is dashboard path?', isDashboardPath);

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
//           {/* Dashboard link always visible on mobile */}
//           <Link
//             to={getDashboardRoute()}
//             className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 whitespace-nowrap font-medium ${
//               !isPublicPage
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-[#1a3159] text-orange-400 hover:bg-[#1a3159]/80'
//             }`}
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
