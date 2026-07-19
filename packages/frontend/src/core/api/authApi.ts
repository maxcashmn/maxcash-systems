// import { apiClient } from './client';
// import { endpoints } from './endpoints';

// // planned feature to add: verify email & resend verification
// /**
//  * Authentication request types
//  */

// export interface LoginData {
//   email: string;
//   password: string;
// }


// export interface RegisterData {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
//   role?: string;
// }


// export interface ChangePasswordData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }


// /**
//  * Authentication API service
//  *
//  * Handles communication between
//  * frontend and Cloudflare Worker auth endpoints.
//  */
// export const authApi = {

//   /**
//    * Register a new user.
//    *
//    * Default role:
//    * borrower
//    *
//    * Role management will later
//    * be controlled by backend permissions.
//    */
//   register: (data: RegisterData) =>
//     apiClient.post(
//       endpoints.auth.register,
//       {
//         ...data,
//         role: data.role ?? 'borrower',
//       }
//     ),


//   /**
//    * Login existing user.
//    */
//   login: (data: LoginData) =>
//     apiClient.post(
//       endpoints.auth.login,
//       data
//     ),


//   /**
//    * Refresh expired access token.
//    */
//   refreshToken: (refreshToken: string) =>
//     apiClient.post(
//       endpoints.auth.refresh,
//       {
//         refreshToken,
//       }
//     ),


//   /**
//    * Logout current user session.
//    */
//   logout: () =>
//     apiClient.post(
//       endpoints.auth.logout
//     ),


//   /**
//    * Request password reset email.
//    */
//   forgotPassword: (email: string) =>
//     apiClient.post(
//       endpoints.auth.forgotPassword,
//       {
//         email,
//       }
//     ),


//   /**
//    * Change authenticated user's password.
//    */
//   changePassword: (
//     data: ChangePasswordData
//   ) =>
//     apiClient.post(
//       endpoints.auth.changePassword,
//       data
//     ),
// };


// export default authApi;


import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: string; // ✅ ADDED: Role field for registration
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

export const authApi = {
  /**
   * Register a new user
   * @param data - User registration data including email, password, name, and optional role
   * @returns Promise with user data and tokens
   */
  register: (data: RegisterData) => {
    // Ensure role is sent, default to 'borrower' if not provided
    const registerData = {
      ...data,
      role: data.role || 'borrower',
    };
    return apiClient.post(endpoints.auth.register, registerData);
  },

  /**
   * Login an existing user
   * @param data - Login credentials (email, password)
   * @returns Promise with user data and tokens
   */
  login: (data: LoginData) => apiClient.post(endpoints.auth.login, data),

  /**
   * Refresh authentication tokens
   * @param refreshToken - The refresh token to exchange for new tokens
   * @returns Promise with new tokens
   */
  refreshToken: (refreshToken: string) => 
    apiClient.post(endpoints.auth.refresh, { refreshToken }),

  /**
   * Logout the current user
   * @returns Promise with logout confirmation
   */
  logout: () => apiClient.post(endpoints.auth.logout),

  /**
   * Request password reset
   * @param email - User's email address
   * @returns Promise with reset confirmation
   */
  forgotPassword: (email: string) => 
    apiClient.post(endpoints.auth.forgotPassword, { email }),

  /**
   * Change user password (authenticated)
   * @param data - Current password, new password, and confirmation
   * @returns Promise with password change confirmation
   */
  changePassword: (data: ChangePasswordData) => 
    apiClient.post(endpoints.auth.changePassword, data),

  /**
   * Verify email address
   * @param token - Verification token
   * @returns Promise with verification confirmation
   */
  verifyEmail: (token: string) => 
    apiClient.post('/api/v1/auth/verify-email', { token }),

  /**
   * Resend verification email
   * @param email - User's email address
   * @returns Promise with resend confirmation
   */
  resendVerification: (email: string) => 
    apiClient.post('/api/v1/auth/resend-verification', { email }),
};

export default authApi;
