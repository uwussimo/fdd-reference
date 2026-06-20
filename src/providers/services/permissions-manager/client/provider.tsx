'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { PermissionsManager } from './types';
import { PermissionsManagerService } from './service';

const PermissionsManagerContext = createContext<PermissionsManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type PermissionsManagerProviderProps = {
  children: ReactNode;
};

export const PermissionsManagerProvider = (props: PermissionsManagerProviderProps) => {
  const { children } = props;

  const [permissionsManagerService] = useState(() => new PermissionsManagerService());

  return (
    <PermissionsManagerContext.Provider value={permissionsManagerService}>
      {children}
    </PermissionsManagerContext.Provider>
  );
};

// ----------------------------------------------------------------------------------------------------

export const usePermissionsManager = () => {
  const context = use(PermissionsManagerContext);

  if (!context) {
    throw new Error('usePermissionsManager must be used within a PermissionsManagerProvider');
  }

  return context;
};
