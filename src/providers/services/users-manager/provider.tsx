'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { UsersManager } from './service';

const UsersManagerContext = createContext<UsersManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type UsersManagerServiceProviderProps = {
  children: ReactNode;
};

export const UsersManagerServiceProvider = (props: UsersManagerServiceProviderProps) => {
  const { children } = props;

  const [usersManager] = useState(() => new UsersManager());

  return <UsersManagerContext value={usersManager}>{children}</UsersManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useUsersManagerService = () => {
  const context = use(UsersManagerContext);

  if (!context) {
    throw new Error('useUsersManagerService must be used within a UsersManagerServiceProvider');
  }

  return context;
};
