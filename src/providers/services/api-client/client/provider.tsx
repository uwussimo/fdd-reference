'use client';

import { createContext, ReactNode, use, useEffect, useState } from 'react';

import { ApiClient } from '../shared/types';
import { ApiClientService } from '../shared/service';
import { defaultConfig } from '../shared/config';
import { localeInterceptor } from './interceptors/locale';
import { loggerInterceptor } from '../shared/interceptors/logger';
import { errorInterceptor } from '../shared/interceptors/error';

const ApiClientContext = createContext<ApiClient | null>(null);

// ----------------------------------------------------------------------------------------------------

type ApiClientProviderProps = {
  children: ReactNode;
};

export const ApiClientProvider = (props: ApiClientProviderProps) => {
  const { children } = props;

  const [apiClientService] = useState(() => {
    const apiClientService = new ApiClientService(defaultConfig);

    apiClientService.use(localeInterceptor);

    // Conditional interceptor
    if (process.env.NODE_ENV === 'development') {
      apiClientService.use(loggerInterceptor);
    }

    // Interceptor with external options
    apiClientService.use(
      errorInterceptor({
        onSessionExpired: error => console.log('Session expired', error),
        onLicenseExpired: error => console.log('License expired', error),
      }),
    );

    return apiClientService;
  });

  useEffect(() => {
    return () => {
      apiClientService.destroy();
    };
  }, [apiClientService]);

  return <ApiClientContext value={apiClientService}>{children}</ApiClientContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useApiClient = () => {
  const context = use(ApiClientContext);

  if (!context) {
    throw new Error('useApiClient must be used within a ApiClientProvider');
  }

  return context;
};
