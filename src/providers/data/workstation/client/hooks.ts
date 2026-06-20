import { use } from 'react';
import { WorkstationContext } from '../shared/provider';

export const useWorkstationPromise = () => {
  const workstationPromise = use(WorkstationContext);

  if (!workstationPromise) {
    throw new Error('useWorkstationPromise must be used within a WorkstationProvider');
  }

  return workstationPromise;
};

// ----------------------------------------------------------------------------------------------------

export const useWorkstationSuspense = () => use(useWorkstationPromise());
