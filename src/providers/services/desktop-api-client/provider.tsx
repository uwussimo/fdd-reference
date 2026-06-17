'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { DesktopApiClient } from './service';

const DesktopApiClientContext = createContext<DesktopApiClient | null>(null);

// ----------------------------------------------------------------------------------------------------

type DesktopApiClientServiceProviderProps = {
  children: ReactNode;
};

export const DesktopApiClientServiceProvider = (props: DesktopApiClientServiceProviderProps) => {
  const { children } = props;

  const [desktopApiClientService] = useState(() => new DesktopApiClient());

  return (
    <DesktopApiClientContext value={desktopApiClientService}>
      {children}

      {/* ⁉️ Maybe here, maybe not */}
      {/* <DesktopReadyListener /> */}
      {/* <DesktopCloseModal /> */}
    </DesktopApiClientContext>
  );
};

// ----------------------------------------------------------------------------------------------------

export const useDesktopApiClientService = () => {
  const context = use(DesktopApiClientContext);

  if (!context) {
    throw new Error('useDesktopApiClientService must be used within a DesktopApiClientServiceProvider');
  }

  return context;
};
