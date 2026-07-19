import { apiClient } from './client';
import { endpoints } from './endpoints';


/**
 * User profile update payload
 */
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}


/**
 * User listing filters
 *
 * Used mainly by:
 * - Admin
 * - Manager
 */
export interface ListUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
}


/**
 * User API service
 *
 * Handles user profile,
 * management and administration requests.
 */
export const userApi = {


  /**
   * Get currently authenticated user.
   */
  me: () =>
    apiClient.get(
      endpoints.users.me
    ),


  /**
   * Update current user's profile.
   */
  updateProfile: (
    data: UpdateProfileData
  ) =>
    apiClient.put(
      endpoints.users.me,
      data
    ),


  /**
   * List users.
   *
   * Mainly used by:
   * Admin dashboard
   * Manager dashboard
   */
  listUsers: (
    params?: ListUsersParams
  ) =>
    apiClient.get(
      endpoints.users.list,
      {
        params,
      }
    ),


  /**
   * Get user by ID.
   *
   * NOTE:
   * Currently uses update endpoint because
   * backend route contract needs confirmation.
   *
   * Future:
   * GET /api/v1/users/:id
   */
  getUser: (
    id: string
  ) =>
    apiClient.get(
      endpoints.users.update(id)
    ),


  /**
   * Update user status.
   *
   * Example:
   * active
   * suspended
   * inactive
   */
  updateUserStatus: (
    id: string,
    status: string
  ) =>
    apiClient.patch(
      endpoints.users.updateStatus(id),
      {
        status,
      }
    ),


  /**
   * Delete user.
   *
   * Should later be replaced with
   * soft delete for financial records.
   */
  deleteUser: (
    id: string
  ) =>
    apiClient.delete(
      endpoints.users.delete(id)
    ),
};


export default userApi;



// import { apiClient } from './client';
// import { endpoints } from './endpoints';

// export interface UpdateProfileData {
//   firstName?: string;
//   lastName?: string;
//   phoneNumber?: string;
// }

// export interface ListUsersParams {
//   page?: number;
//   limit?: number;
//   role?: string;
//   status?: string;
// }

// export const userApi = {
//   me: () => apiClient.get(endpoints.users.me),
//   updateProfile: (data: UpdateProfileData) => apiClient.put(endpoints.users.me, data),
//   listUsers: (params?: ListUsersParams) => apiClient.get(endpoints.users.list, { params }),
//   getUser: (id: string) => apiClient.get(endpoints.users.update(id)),
//   updateUserStatus: (id: string, status: string) => apiClient.patch(endpoints.users.updateStatus(id), { status }),
//   deleteUser: (id: string) => apiClient.delete(endpoints.users.delete(id)),
// };
