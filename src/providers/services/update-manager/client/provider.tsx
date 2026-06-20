'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { UpdateManager } from './types';
import { UpdateManagerService } from './service';

const UpdateManagerContext = createContext<UpdateManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type UpdateManagerProviderProps = {
  children: ReactNode;
};

export const UpdateManagerProvider = (props: UpdateManagerProviderProps) => {
  const { children } = props;

  const [updateManagerService] = useState(() => new UpdateManagerService());

  return <UpdateManagerContext value={updateManagerService}>{children}</UpdateManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useUpdateManager = () => {
  const context = use(UpdateManagerContext);

  if (!context) {
    throw new Error('useUpdateManager must be used within a UpdateManagerProvider');
  }

  return context;
};
