import { apiClient } from './client';
import { endpoints } from './endpoints';


/**
 * Transfer creation payload
 *
 * Backend must validate:
 * - sender wallet
 * - balance
 * - recipient
 * - transfer limits
 */
export interface InitiateTransferData {
  toUserId: string;
  amount: number;
  description?: string;
}


/**
 * Transfer filtering options
 */
export interface TransferListParams {
  page?: number;
  limit?: number;
  status?: string;
  reference?: string;
}


/**
 * Transfer API service
 *
 * Handles wallet-to-wallet transfers.
 */
export const transferApi = {


  /**
   * Initiate transfer.
   */
  initiateTransfer: (
    data: InitiateTransferData
  ) =>
    apiClient.post(
      endpoints.transfers.create,
      data
    ),



  /**
   * List transfers.
   */
  listTransfers: (
    params?: TransferListParams
  ) =>
    apiClient.get(
      endpoints.transfers.list,
      {
        params,
      }
    ),



  /**
   * Get transfer details.
   */
  getTransfer: (
    id: string
  ) =>
    apiClient.get(
      endpoints.transfers.get(id)
    ),



  /**
   * Find transfer by reference.
   */
  getTransferByReference: (
    reference: string
  ) =>
    apiClient.get(
      endpoints.transfers.byReference(reference)
    ),
};


export default transferApi;




// import { apiClient } from './client';
// import { endpoints } from './endpoints';

// export interface InitiateTransferData {
//   toUserId: string;
//   amount: number;
//   description?: string;
// }

// export const transferApi = {
//   initiateTransfer: (data: InitiateTransferData) => apiClient.post(endpoints.transfers.create, data),
//   listTransfers: () => apiClient.get(endpoints.transfers.list),
//   getTransfer: (id: string) => apiClient.get(endpoints.transfers.get(id)),
//   getTransferByReference: (reference: string) => apiClient.get(endpoints.transfers.byReference(reference)),
// };
