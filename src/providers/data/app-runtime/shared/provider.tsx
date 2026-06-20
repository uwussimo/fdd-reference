'use client';

import { createContext, ReactNode } from 'react';

export const AppRuntimeContext = createContext<Promise<Record<string, unknown>> | null>(null);

// ----------------------------------------------------------------------------------------------------

type AppRuntimeProviderProps = {
  value: Promise<Record<string, unknown>>;
  children: ReactNode;
};

export const AppRuntimeProvider = (props: AppRuntimeProviderProps) => {
  const { value, children } = props;

  return <AppRuntimeContext value={value}>{children}</AppRuntimeContext>;
};
