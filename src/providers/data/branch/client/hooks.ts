import { use } from 'react';
import { BranchContext } from '../shared/provider';

export const useBranchPromise = () => {
  const branchPromise = use(BranchContext);

  if (!branchPromise) {
    throw new Error('useBranchPromise must be used within a BranchProvider');
  }

  return branchPromise;
};

// ----------------------------------------------------------------------------------------------------

export const useBranchSuspense = () => use(useBranchPromise());
