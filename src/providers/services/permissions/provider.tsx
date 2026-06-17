'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { Permissions } from './service';

const PermissionsContext = createContext<Permissions | null>(null);

// ----------------------------------------------------------------------------------------------------

type PermissionsServiceProviderProps = {
  children: ReactNode;
};

export const PermissionsServiceProvider = (props: PermissionsServiceProviderProps) => {
  const { children } = props;

  const [permissionsService] = useState(() => new Permissions());

  return <PermissionsContext.Provider value={permissionsService}>{children}</PermissionsContext.Provider>;
};

// ----------------------------------------------------------------------------------------------------

export const usePermissionsService = () => {
  const context = use(PermissionsContext);

  if (!context) {
    throw new Error('usePermissionsService must be used within a PermissionsServiceProvider');
  }

  return context;
};
