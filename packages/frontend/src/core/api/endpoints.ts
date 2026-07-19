const API_PREFIX = '/api/v1';

export const endpoints = {
  auth: {
    register: `${API_PREFIX}/auth/register`,
    login: `${API_PREFIX}/auth/login`,
    refresh: `${API_PREFIX}/auth/refresh`,
    logout: `${API_PREFIX}/auth/logout`,
    forgotPassword: `${API_PREFIX}/auth/forgot-password`,
    changePassword: `${API_PREFIX}/auth/change-password`,
  },


  users: {
    me: `${API_PREFIX}/users/me`,
    list: `${API_PREFIX}/users`,

    update: (userId: string) =>
      `${API_PREFIX}/users/${userId}`,

    updateStatus: (userId: string) =>
      `${API_PREFIX}/users/${userId}/status`,

    delete: (userId: string) =>
      `${API_PREFIX}/users/${userId}`,
  },


  wallets: {
    create: `${API_PREFIX}/wallets`,
    me: `${API_PREFIX}/wallets/me`,
    balance: `${API_PREFIX}/wallets/me/balance`,
    fund: `${API_PREFIX}/wallets/me/fund`,
    withdraw: `${API_PREFIX}/wallets/me/withdraw`,
  },


  transfers: {
    create: `${API_PREFIX}/transfers`,
    list: `${API_PREFIX}/transfers`,

    get: (transferId: string) =>
      `${API_PREFIX}/transfers/${transferId}`,

    byReference: (reference: string) =>
      `${API_PREFIX}/transfers/reference/${reference}`,
  },


  transactions: {
    create: `${API_PREFIX}/transactions`,
    list: `${API_PREFIX}/transactions`,

    get: (transactionId: string) =>
      `${API_PREFIX}/transactions/${transactionId}`,

    byReference: (reference: string) =>
      `${API_PREFIX}/transactions/reference/${reference}`,
  },


  loans: {
    create: `${API_PREFIX}/loans`,
    list: `${API_PREFIX}/loans`,

    get: (loanId: string) =>
      `${API_PREFIX}/loans/${loanId}`,

    approve: (loanId: string) =>
      `${API_PREFIX}/loans/${loanId}/approve`,

    reject: (loanId: string) =>
      `${API_PREFIX}/loans/${loanId}/reject`,

    disburse: (loanId: string) =>
      `${API_PREFIX}/loans/${loanId}/disburse`,

    active: `${API_PREFIX}/loans/active/all`,
  },


  notifications: {
    list: `${API_PREFIX}/notifications`,
    unread: `${API_PREFIX}/notifications/unread`,

    markRead: (notificationId: string) =>
      `${API_PREFIX}/notifications/${notificationId}/read`,
  },


  reports: {
    transactions: `${API_PREFIX}/reports/transactions`,
    loans: `${API_PREFIX}/reports/loans`,
    users: `${API_PREFIX}/reports/users`,
  },


  admin: {
    health: `${API_PREFIX}/admin/health`,
    stats: `${API_PREFIX}/admin/stats`,
    reconciliation: `${API_PREFIX}/admin/reconciliation`,
  },


  /**
   * Future integrations
   */

  cms: {
    pages: `${API_PREFIX}/cms/pages`,
    content: `${API_PREFIX}/cms/content`,
  },


  communication: {
    email: `${API_PREFIX}/communication/email`,
    whatsapp: `${API_PREFIX}/communication/whatsapp`,
  },

} as const;
