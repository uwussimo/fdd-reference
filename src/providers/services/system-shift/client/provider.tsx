'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { SystemShift } from './types';
import { SystemShiftService } from './service';

const SystemShiftContext = createContext<SystemShift | null>(null);

// ----------------------------------------------------------------------------------------------------

type SystemShiftProviderProps = {
  children: ReactNode;
};

export const SystemShiftProvider = (props: SystemShiftProviderProps) => {
  const { children } = props;

  const [systemShiftService] = useState(() => new SystemShiftService());

  return <SystemShiftContext value={systemShiftService}>{children}</SystemShiftContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useSystemShift = () => {
  const context = use(SystemShiftContext);

  if (!context) {
    throw new Error('useSystemShift must be used within a SystemShiftProvider');
  }

  return context;
};
