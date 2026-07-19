import { apiClient } from './client';
import { endpoints } from './endpoints';


/**
 * Wallet funding request
 */
export interface FundWalletData {
  amount: number;
  reference: string;
}


/**
 * Wallet withdrawal request
 */
export interface WithdrawWalletData {
  amount: number;
  reference: string;
}


/**
 * Wallet API service
 *
 * Handles:
 *
 * Wallet creation
 * Balance lookup
 * Funding
 * Withdrawals
 */
export const walletApi = {


  /**
   * Create wallet for authenticated user.
   */
  createWallet: () =>
    apiClient.post(
      endpoints.wallets.create
    ),



  /**
   * Get current user's wallet.
   */
  getWallet: () =>
    apiClient.get(
      endpoints.wallets.me
    ),



  /**
   * Get wallet balance.
   */
  getBalance: () =>
    apiClient.get(
      endpoints.wallets.balance
    ),



  /**
   * Fund wallet.
   */
  fundWallet: (
    data: FundWalletData
  ) =>
    apiClient.post(
      endpoints.wallets.fund,
      data
    ),



  /**
   * Withdraw funds.
   */
  withdraw: (
    data: WithdrawWalletData
  ) =>
    apiClient.post(
      endpoints.wallets.withdraw,
      data
    ),
};


export default walletApi;


// import { apiClient } from './client';
// import { endpoints } from './endpoints';

// export interface FundWalletData {
//   amount: number;
//   reference: string;
// }

// export const walletApi = {
//   createWallet: () => apiClient.post(endpoints.wallets.create),
//   getWallet: () => apiClient.get(endpoints.wallets.me),
//   getBalance: () => apiClient.get(endpoints.wallets.balance),
//   fundWallet: (data: FundWalletData) => apiClient.post(endpoints.wallets.fund, data),
//   withdraw: (data: FundWalletData) => apiClient.post(endpoints.wallets.withdraw, data),
// };
