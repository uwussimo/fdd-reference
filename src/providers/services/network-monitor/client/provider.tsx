'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { NetworkMonitorService } from './service';
import { NetworkMonitor } from './types';

const NetworkMonitorContext = createContext<NetworkMonitor | null>(null);

// ----------------------------------------------------------------------------------------------------

type NetworkMonitorProviderProps = {
  children: ReactNode;
};

export const NetworkMonitorProvider = (props: NetworkMonitorProviderProps) => {
  const { children } = props;

  const [networkMonitorService] = useState(() => new NetworkMonitorService());

  return <NetworkMonitorContext value={networkMonitorService}>{children}</NetworkMonitorContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useNetworkMonitor = () => {
  const context = use(NetworkMonitorContext);

  if (!context) {
    throw new Error('useNetworkMonitor must be used within a NetworkMonitorProvider');
  }

  return context;
};
