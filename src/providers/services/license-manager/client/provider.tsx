'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { LicenseManagerService } from './service';
import { LicenseManager } from './types';

const LicenseManagerContext = createContext<LicenseManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type LicenseManagerProviderProps = {
  children: ReactNode;
};

export const LicenseManagerProvider = (props: LicenseManagerProviderProps) => {
  const { children } = props;

  const [licenseManagerService] = useState(() => new LicenseManagerService());

  return <LicenseManagerContext value={licenseManagerService}>{children}</LicenseManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useLicenseManager = () => {
  const context = use(LicenseManagerContext);

  if (!context) {
    throw new Error('useLicenseManager must be used within a LicenseManagerProvider');
  }

  return context;
};
