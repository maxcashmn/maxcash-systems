export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  LOAN_PRODUCTS: '/loan-products',
  LOAN_CALCULATOR: '/loan-calculator',
  FAQ: '/faq',
  CONTACT: '/contact',
  APPLY: '/apply',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  UNAUTHORIZED: '/unauthorized',
  
  // Protected
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  
  // Borrower
  LOAN_APPLICATION: '/loan-application',
  MY_LOANS: '/my-loans',
  LOAN_DETAILS: '/my-loans/:id',
  REPAYMENT_SCHEDULE: '/repayment-schedule',
  TRANSACTIONS: '/transactions',
  
  // Manager
  MANAGER_DASHBOARD: '/manager/dashboard',
  REVIEW_APPLICATIONS: '/manager/review',
  ASSIGNED_BORROWERS: '/manager/borrowers',
  
  // Auditor
  AUDITOR_DASHBOARD: '/auditor/dashboard',
  AUDIT_TRAIL: '/auditor/audit-trail',
  
  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_LOANS: '/admin/loans',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
