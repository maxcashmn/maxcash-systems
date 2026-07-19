// packages/frontend/src/core/api/loanApi.ts
import { apiClient } from './client';
import { endpoints } from './endpoints';

/**
 * Loan application payload
 */
export interface ApplyLoanData {
  amount: number;
  termMonths: number;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: number;
  // Optional fields that might be added later
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

/**
 * Loan listing filters
 *
 * Used by:
 * - Borrowers
 * - Managers
 * - Admins
 */
export interface LoanListParams {
  page?: number;
  limit?: number;
  status?: string;
  borrowerId?: string;
}

/**
 * Loan rejection payload
 */
export interface RejectLoanData {
  reason: string;
}

/**
 * Loan response
 */
export interface LoanResponse {
  id: string;
  reference: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'disbursed';
  amount: number;
  termMonths: number;
  purpose: string;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  createdAt: string;
  updatedAt: string;
  borrower?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

/**
 * Loan API service
 *
 * Handles complete loan lifecycle:
 *
 * Application
 * Review
 * Approval
 * Rejection
 * Disbursement
 */
export const loanApi = {
  /**
   * Submit new loan application.
   */
  applyForLoan: (data: ApplyLoanData) =>
    apiClient.post(endpoints.loans.create, data),

  /**
   * Get loans.
   *
   * Supports filtering and pagination.
   */
  listLoans: (params?: LoanListParams) =>
    apiClient.get(endpoints.loans.list, {
      params,
    }),

  /**
   * Get single loan.
   */
  getLoan: (id: string) =>
    apiClient.get(endpoints.loans.get(id)),

  /**
   * Approve loan application.
   */
  approveLoan: (id: string) =>
    apiClient.patch(endpoints.loans.approve(id)),

  /**
   * Reject loan application.
   */
  rejectLoan: (id: string, data: RejectLoanData) =>
    apiClient.patch(endpoints.loans.reject(id), data),

  /**
   * Disburse approved loan.
   */
  disburseLoan: (id: string) =>
    apiClient.patch(endpoints.loans.disburse(id)),

  /**
   * Get active loans.
   */
  getActiveLoans: () =>
    apiClient.get(endpoints.loans.active),

  /**
   * Get loan application status
   */
  getApplicationStatus: (id: string) =>
    apiClient.get(`/loan-applications/${id}/status`),

  /**
   * Cancel a pending loan application
   */
  cancelApplication: (id: string) =>
    apiClient.post(`/loan-applications/${id}/cancel`),

  /**
   * Get loan statistics for dashboard
   */
  getLoanStats: () =>
    apiClient.get('/loan-applications/stats'),

  /**
   * Get repayment schedule for a loan
   */
  getRepaymentSchedule: (id: string) =>
    apiClient.get(`/loans/${id}/schedule`),

  /**
   * Make a loan payment
   */
  makePayment: (id: string, data: { amount: number; paymentMethod: string }) =>
    apiClient.post(`/loans/${id}/payments`, data),

  /**
   * Get payment history for a loan
   */
  getPaymentHistory: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get(`/loans/${id}/payments`, { params }),

  /**
   * Get loan documents/attachments
   */
  getLoanDocuments: (id: string) =>
    apiClient.get(`/loans/${id}/documents`),

  /**
   * Upload loan document
   */
  uploadDocument: (id: string, file: File, documentType: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    return apiClient.post(`/loans/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Get loan eligibility check
   */
  checkEligibility: (data: { amount: number; termMonths: number; monthlyIncome: number }) =>
    apiClient.post('/loan-applications/eligibility', data),

  /**
   * Calculate loan repayment
   */
  calculateRepayment: (data: { amount: number; termMonths: number; interestRate?: number }) =>
    apiClient.post('/loan-applications/calculate', data),
};

export default loanApi;


// import { apiClient } from './client';
// import { endpoints } from './endpoints';


// /**
//  * Loan application payload
//  */
// export interface ApplyLoanData {
//   amount: number;
//   termMonths: number;
//   purpose: string;
//   employmentStatus: string;
//   monthlyIncome: number;
// }


// /**
//  * Loan listing filters
//  *
//  * Used by:
//  * - Borrowers
//  * - Managers
//  * - Admins
//  */
// export interface LoanListParams {
//   page?: number;
//   limit?: number;
//   status?: string;
//   borrowerId?: string;
// }


// /**
//  * Loan rejection payload
//  */
// export interface RejectLoanData {
//   reason: string;
// }


// /**
//  * Loan API service
//  *
//  * Handles complete loan lifecycle:
//  *
//  * Application
//  * Review
//  * Approval
//  * Rejection
//  * Disbursement
//  */
// export const loanApi = {


//   /**
//    * Submit new loan application.
//    */
//   applyForLoan: (
//     data: ApplyLoanData
//   ) =>
//     apiClient.post(
//       endpoints.loans.create,
//       data
//     ),



//   /**
//    * Get loans.
//    *
//    * Supports filtering and pagination.
//    */
//   listLoans: (
//     params?: LoanListParams
//   ) =>
//     apiClient.get(
//       endpoints.loans.list,
//       {
//         params,
//       }
//     ),



//   /**
//    * Get single loan.
//    */
//   getLoan: (
//     id: string
//   ) =>
//     apiClient.get(
//       endpoints.loans.get(id)
//     ),



//   /**
//    * Approve loan application.
//    */
//   approveLoan: (
//     id: string
//   ) =>
//     apiClient.patch(
//       endpoints.loans.approve(id)
//     ),



//   /**
//    * Reject loan application.
//    */
//   rejectLoan: (
//     id: string,
//     data: RejectLoanData
//   ) =>
//     apiClient.patch(
//       endpoints.loans.reject(id),
//       data
//     ),



//   /**
//    * Disburse approved loan.
//    */
//   disburseLoan: (
//     id: string
//   ) =>
//     apiClient.patch(
//       endpoints.loans.disburse(id)
//     ),



//   /**
//    * Get active loans.
//    */
//   getActiveLoans: () =>
//     apiClient.get(
//       endpoints.loans.active
//     ),
// };


// export default loanApi;



// import { apiClient } from './client';
// import { endpoints } from './endpoints';

// export interface ApplyLoanData {
//   amount: number;
//   termMonths: number;
//   purpose: string;
//   employmentStatus: string;
//   monthlyIncome: number;
// }

// export const loanApi = {
//   applyForLoan: (data: ApplyLoanData) => apiClient.post(endpoints.loans.create, data),
//   listLoans: () => apiClient.get(endpoints.loans.list),
//   getLoan: (id: string) => apiClient.get(endpoints.loans.get(id)),
//   approveLoan: (id: string) => apiClient.patch(endpoints.loans.approve(id)),
//   rejectLoan: (id: string, reason: string) => apiClient.patch(endpoints.loans.reject(id), { reason }),
//   disburseLoan: (id: string) => apiClient.patch(endpoints.loans.disburse(id)),
//   getActiveLoans: () => apiClient.get(endpoints.loans.active),
// };
