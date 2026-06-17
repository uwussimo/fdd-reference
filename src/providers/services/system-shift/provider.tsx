'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { SystemShift } from './service';

const SystemShiftContext = createContext<SystemShift | null>(null);

// ----------------------------------------------------------------------------------------------------

type SystemShiftServiceProviderProps = {
  children: ReactNode;
};

export const SystemShiftServiceProvider = (props: SystemShiftServiceProviderProps) => {
  const { children } = props;

  const [systemShiftService] = useState(() => new SystemShift());

  return <SystemShiftContext value={systemShiftService}>{children}</SystemShiftContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useSystemShiftService = () => {
  const context = use(SystemShiftContext);

  if (!context) {
    throw new Error('useSystemShiftService must be used within a SystemShiftServiceProvider');
  }

  return context;
};
