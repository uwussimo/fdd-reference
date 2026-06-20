'use client';

import { createContext, ReactNode } from 'react';

export const WorkstationContext = createContext<Promise<Record<string, unknown>> | null>(null);

// ----------------------------------------------------------------------------------------------------

type WorkstationProviderProps = {
  value: Promise<Record<string, unknown>>;
  children: ReactNode;
};

export const WorkstationProvider = (props: WorkstationProviderProps) => {
  const { value, children } = props;

  return <WorkstationContext value={value}>{children}</WorkstationContext>;
};
