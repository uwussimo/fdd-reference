'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { UsersManager } from './types';
import { UsersManagerService } from './service';

const UsersManagerContext = createContext<UsersManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type UsersManagerProviderProps = {
  children: ReactNode;
};

export const UsersManagerProvider = (props: UsersManagerProviderProps) => {
  const { children } = props;

  const [usersManagerService] = useState(() => new UsersManagerService());

  return <UsersManagerContext value={usersManagerService}>{children}</UsersManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useUsersManager = () => {
  const context = use(UsersManagerContext);

  if (!context) {
    throw new Error('useUsersManager must be used within a UsersManagerProvider');
  }

  return context;
};
