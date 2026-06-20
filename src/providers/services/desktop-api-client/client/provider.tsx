'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { DesktopApiClientService } from './service';
import { DesktopApiClient } from './types';

const DesktopApiClientContext = createContext<DesktopApiClient | null>(null);

// ----------------------------------------------------------------------------------------------------

type DesktopApiClientProviderProps = {
  children: ReactNode;
};

export const DesktopApiClientProvider = (props: DesktopApiClientProviderProps) => {
  const { children } = props;

  const [desktopApiClientService] = useState(() => new DesktopApiClientService());

  return (
    <DesktopApiClientContext value={desktopApiClientService}>
      {children}

      {/* <DesktopReadyListener /> */}
      {/* <DesktopCloseModal /> */}
    </DesktopApiClientContext>
  );
};

// ----------------------------------------------------------------------------------------------------

export const useDesktopApiClient = () => {
  const context = use(DesktopApiClientContext);

  if (!context) {
    throw new Error('useDesktopApiClient must be used within a DesktopApiClientProvider');
  }

  return context;
};
