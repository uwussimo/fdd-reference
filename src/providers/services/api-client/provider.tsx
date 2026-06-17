'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { ApiClient } from './service';

const ApiClientContext = createContext<ApiClient | null>(null);

// ----------------------------------------------------------------------------------------------------

type ApiClientServiceProviderProps = {
  children: ReactNode;
};

export const ApiClientServiceProvider = (props: ApiClientServiceProviderProps) => {
  const { children } = props;

  const [apiClientService] = useState(() => new ApiClient());

  return <ApiClientContext value={apiClientService}>{children}</ApiClientContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useApiClientService = () => {
  const context = use(ApiClientContext);

  if (!context) {
    throw new Error('useApiClient must be used within a ApiClientServiceProvider');
  }

  return context;
};
