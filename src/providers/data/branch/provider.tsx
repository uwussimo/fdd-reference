'use client';

import { createContext, ReactNode, use } from 'react';

const BranchContext = createContext<Promise<Record<string, unknown>> | null>(null);

// ----------------------------------------------------------------------------------------------------

type BranchProviderProps = {
  value: Promise<Record<string, unknown>>;
  children: ReactNode;
};

export const BranchProvider = (props: BranchProviderProps) => {
  const { value, children } = props;

  return <BranchContext value={value}>{children}</BranchContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useBranchPromise = () => {
  const branchPromise = use(BranchContext);

  if (!branchPromise) {
    throw new Error('useBranchPromise must be used within a BranchProvider');
  }

  return branchPromise;
};

// ----------------------------------------------------------------------------------------------------

export const useBranchSuspense = () => use(useBranchPromise());
