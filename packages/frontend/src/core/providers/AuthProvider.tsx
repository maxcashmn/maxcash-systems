import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';

/**
 * Temporary token keys.
 *
 * These will be moved into core/constants/storage.ts
 * during the API enhancement phase.
 */
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state and actions
 * throughout the application.
 */
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Retrieves the authenticated user's profile.
   */
  const refreshUser = async () => {
    try {
      const response = await userApi.me();
      setUser(response.data);
    } catch {
      setUser(null);
    }
  };

  /**
   * Authenticates the user and stores session tokens.
   */
  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });

    const { token, refreshToken, user } = response.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    setUser(user);
  };

  /**
   * Registers a new borrower.
   *
   * The backend remains responsible for validating
   * and enforcing user roles.
   */
  const register = async (data: RegisterData) => {
    const response = await authApi.register({
      ...data,
      role: data.role ?? 'borrower',
    });

    const { token, refreshToken, user } = response.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    setUser(user);
  };

  /**
   * Clears the current session.
   */
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    setUser(null);
  };

  /**
   * Restore the authenticated session
   * when the application starts.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
        await refreshUser();
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Memoize the context value to prevent
   * unnecessary re-renders.
   */
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Authentication hook.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};





// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { authApi } from '../api/authApi';
// import { userApi } from '../api/userApi';

// interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
//   role: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   logout: () => void;
//   refreshUser: () => Promise<void>;
// }

// interface RegisterData {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
//   role?: string; // ✅ ADDED: Role field
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const refreshUser = async () => {
//     try {
//       const response = await userApi.me();
//       setUser(response.data);
//     } catch {
//       setUser(null);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     const response = await authApi.login({ email, password });
//     const { token, refreshToken, user } = response.data;
//     localStorage.setItem('accessToken', token);
//     localStorage.setItem('refreshToken', refreshToken);
//     setUser(user);
//   };

//   const register = async (data: RegisterData) => {
//     // Include role in registration, default to 'borrower'
//     const registerData = {
//       ...data,
//       role: data.role || 'borrower',
//     };
    
//     const response = await authApi.register(registerData);
//     const { token, refreshToken, user } = response.data;
//     localStorage.setItem('accessToken', token);
//     localStorage.setItem('refreshToken', refreshToken);
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setUser(null);
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//         await refreshUser();
//       }
//       setIsLoading(false);
//     };
//     initAuth();
//   }, []);

//   const value = {
//     user,
//     isLoading,
//     isAuthenticated: !!user,
//     login,
//     register,
//     logout,
//     refreshUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
