'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { store } from '@/store';
import { hydrateToken } from '@/store/slices/auth-slice';
import { ThemeProvider } from './theme-provider';

type Props = {
  children: React.ReactNode;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const queryClient = new QueryClient({
  // handle global error useQuery
  queryCache: new QueryCache({
    onError: (error) => toast.error(getErrorMessage(error)),
  }),
  // handle global error useMutation
  mutationCache: new MutationCache({
    onError: (error) => toast.error(getErrorMessage(error)),
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // max fresh data
      gcTime: 1000 * 60 * 10, // cache time
    },
    mutations: {
      retry: false,
    },
  },
});

const AppProvider = ({ children }: Props) => {
  useEffect(() => {
    // Hydrate token from localStorage on mount
    store.dispatch(hydrateToken());
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position='top-right' />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
