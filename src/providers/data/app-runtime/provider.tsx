'use client';

import { createContext, ReactNode, use } from 'react';

const AppRuntimeContext = createContext<Promise<Record<string, unknown>> | null>(null);

// ----------------------------------------------------------------------------------------------------

type AppRuntimeProviderProps = {
  value: Promise<Record<string, unknown>>;
  children: ReactNode;
};

export const AppRuntimeProvider = (props: AppRuntimeProviderProps) => {
  const { value, children } = props;

  return <AppRuntimeContext value={value}>{children}</AppRuntimeContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useAppRuntimePromise = () => {
  const appRuntimePromise = use(AppRuntimeContext);

  if (!appRuntimePromise) {
    throw new Error('useAppRuntimePromise must be used within an AppRuntimeProvider');
  }

  return appRuntimePromise;
};

// ----------------------------------------------------------------------------------------------------

export const useAppRuntimeSuspense = () => use(useAppRuntimePromise());
