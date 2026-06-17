'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { NetworkMonitor } from './service';

const NetworkMonitorContext = createContext<NetworkMonitor | null>(null);

// ----------------------------------------------------------------------------------------------------

type NetworkMonitorServiceProviderProps = {
  children: ReactNode;
};

export const NetworkMonitorServiceProvider = (props: NetworkMonitorServiceProviderProps) => {
  const { children } = props;

  const [networkMonitorService] = useState(() => new NetworkMonitor());

  return <NetworkMonitorContext value={networkMonitorService}>{children}</NetworkMonitorContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useNetworkMonitorService = () => {
  const context = use(NetworkMonitorContext);

  if (!context) {
    throw new Error('useNetworkMonitorService must be used within a NetworkMonitorServiceProvider');
  }

  return context;
};
