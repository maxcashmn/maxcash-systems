import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Global React Query configuration.
 *
 * Query-specific settings can override these defaults where necessary.
 */
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests once before reporting an error.
      retry: 1,

      // Prevent unnecessary refetching when switching browser tabs.
      refetchOnWindowFocus: false,

      // Data remains fresh for 5 minutes.
      staleTime: 5 * 60 * 1000,

      // Remove unused cached data after 10 minutes.
      gcTime: 10 * 60 * 1000,
    },

    mutations: {
      // Retry failed mutations once.
      retry: 1,
    },
  },
});

/**
 * Provides React Query functionality throughout the application.
 */
export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};





// import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//       staleTime: 5 * 60 * 1000,
//       gcTime: 10 * 60 * 1000,
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

// export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   );
// };
