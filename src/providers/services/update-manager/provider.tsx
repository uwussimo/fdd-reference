'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { UpdateManager } from './service';

const UpdateManagerContext = createContext<UpdateManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type UpdateManagerServiceProviderProps = {
  children: ReactNode;
};

export const UpdateManagerServiceProvider = (props: UpdateManagerServiceProviderProps) => {
  const { children } = props;

  const [updateManagerService] = useState(() => new UpdateManager());

  return <UpdateManagerContext value={updateManagerService}>{children}</UpdateManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useUpdateManagerService = () => {
  const context = use(UpdateManagerContext);

  if (!context) {
    throw new Error('useUpdateManagerService must be used within a UpdateManagerServiceProvider');
  }

  return context;
};
