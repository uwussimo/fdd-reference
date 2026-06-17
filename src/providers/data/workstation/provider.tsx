'use client';

import { createContext, ReactNode, use } from 'react';

const WorkstationContext = createContext<Promise<Record<string, unknown>> | null>(null);

// ----------------------------------------------------------------------------------------------------

type WorkstationProviderProps = {
  value: Promise<Record<string, unknown>>;
  children: ReactNode;
};

export const WorkstationProvider = (props: WorkstationProviderProps) => {
  const { value, children } = props;

  return <WorkstationContext value={value}>{children}</WorkstationContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useWorkstationPromise = () => {
  const workstationPromise = use(WorkstationContext);

  if (!workstationPromise) {
    throw new Error('useWorkstationPromise must be used within a WorkstationProvider');
  }

  return workstationPromise;
};

// ----------------------------------------------------------------------------------------------------

export const useWorkstationSuspense = () => use(useWorkstationPromise());
