import { apiClient } from './client';
import { endpoints } from './endpoints';


/**
 * Transaction creation payload
 *
 * NOTE:
 * Transaction creation should eventually
 * be controlled by backend services only.
 */
export interface CreateTransactionData {
  type: string;
  amount: number;
  description?: string;
  metadata?: Record<string, unknown>;
}


/**
 * Transaction filtering options
 */
export interface TransactionListParams {
  page?: number;
  limit?: number;
  type?: string;
  reference?: string;
}


/**
 * Transaction API service
 *
 * Handles transaction history
 * and ledger access.
 */
export const transactionApi = {


  /**
   * Create transaction.
   *
   * Review required:
   * Should this remain frontend-accessible?
   */
  createTransaction: (
    data: CreateTransactionData
  ) =>
    apiClient.post(
      endpoints.transactions.create,
      data
    ),



  /**
   * List transactions.
   */
  listTransactions: (
    params?: TransactionListParams
  ) =>
    apiClient.get(
      endpoints.transactions.list,
      {
        params,
      }
    ),



  /**
   * Get transaction details.
   */
  getTransaction: (
    id: string
  ) =>
    apiClient.get(
      endpoints.transactions.get(id)
    ),



  /**
   * Lookup transaction by reference.
   */
  getTransactionByReference: (
    reference: string
  ) =>
    apiClient.get(
      endpoints.transactions.byReference(reference)
    ),
};


export default transactionApi;


// import { apiClient } from './client';
// import { endpoints } from './endpoints';

// export interface CreateTransactionData {
//   type: string;
//   amount: number;
//   description?: string;
//   metadata?: Record<string, any>;
// }

// export const transactionApi = {
//   createTransaction: (data: CreateTransactionData) => apiClient.post(endpoints.transactions.create, data),
//   listTransactions: () => apiClient.get(endpoints.transactions.list),
//   getTransaction: (id: string) => apiClient.get(endpoints.transactions.get(id)),
//   getTransactionByReference: (reference: string) => apiClient.get(endpoints.transactions.byReference(reference)),
// };
