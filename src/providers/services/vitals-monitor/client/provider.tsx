'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { VitalsMonitorService } from './service';
import { VitalsMonitor } from './types';

const VitalsMonitorContext = createContext<VitalsMonitor | null>(null);

// ----------------------------------------------------------------------------------------------------

type VitalsMonitorProviderProps = {
  children: ReactNode;
};

export const VitalsMonitorProvider = (props: VitalsMonitorProviderProps) => {
  const { children } = props;

  const [vitalsMonitorService] = useState(() => new VitalsMonitorService());

  return <VitalsMonitorContext value={vitalsMonitorService}>{children}</VitalsMonitorContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useVitalsMonitor = () => {
  const context = use(VitalsMonitorContext);

  if (!context) {
    throw new Error('useVitalsMonitor must be used within a VitalsMonitorProvider');
  }

  return context;
};
