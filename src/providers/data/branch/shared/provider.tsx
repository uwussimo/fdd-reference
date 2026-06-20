'use client';

import { createContext, ReactNode } from 'react';

export const BranchContext = createContext<Promise<Record<string, unknown>> | null>(null);

// ----------------------------------------------------------------------------------------------------

type BranchProviderProps = {
  value: Promise<Record<string, unknown>>;
  children: ReactNode;
};

export const BranchProvider = (props: BranchProviderProps) => {
  const { value, children } = props;

  return <BranchContext value={value}>{children}</BranchContext>;
};
