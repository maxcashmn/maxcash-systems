// // src/core/api/client.ts

// import axios from 'axios';
// import type {
//   AxiosError,
//   InternalAxiosRequestConfig,
// } from 'axios';

// import { endpoints } from './endpoints';

// const API_URL =
//   import.meta.env.VITE_API_URL ??
//   'http://localhost:8787/api/v1';

// export const apiClient = axios.create({
//   baseURL: API_URL,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const getAccessToken = () =>
//   localStorage.getItem('accessToken');

// const getRefreshToken = () =>
//   localStorage.getItem('refreshToken');

// const clearTokens = () => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
// };


// // Attach JWT token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();

//     if (token) {
//       config.headers.Authorization =
//         `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) =>
//     Promise.reject(error)
// );


// // Handle token refresh and API errors
// apiClient.interceptors.response.use(
//   (response) =>
//     response,

//   async (error: AxiosError) => {
//     const originalRequest =
//       error.config as InternalAxiosRequestConfig & {
//         _retry?: boolean;
//       };

//     if (
//       error.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken =
//           getRefreshToken();

//         if (!refreshToken) {
//           throw new Error(
//             'Refresh token missing'
//           );
//         }

//         const response =
//           await apiClient.post(
//             endpoints.auth.refresh,
//             {
//               refreshToken,
//             }
//           );

//         const data =
//           response.data.data;

//         localStorage.setItem(
//           'accessToken',
//           data.token
//         );

//         localStorage.setItem(
//           'refreshToken',
//           data.refreshToken
//         );

//         originalRequest.headers.Authorization =
//           `Bearer ${data.token}`;

//         return apiClient(
//           originalRequest
//         );

//       } catch (refreshError) {
//         clearTokens();

//         window.location.href =
//           '/login';

//         return Promise.reject(
//           refreshError
//         );
//       }
//     }

//     return Promise.reject(error);
//   }
// );


import axios from 'axios';
import { endpoints } from './endpoints';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => localStorage.getItem('accessToken');

const getRefreshToken = () => localStorage.getItem('refreshToken');

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Attach authentication token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh and API errors
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error('Refresh token missing');
        }

        const response = await apiClient.post(
          endpoints.auth.refresh,
          { refreshToken }
        );

        const data = response.data.data ?? response.data;

        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

