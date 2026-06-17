'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { License } from './service';

const LicenseContext = createContext<License | null>(null);

// ----------------------------------------------------------------------------------------------------

type LicenseServiceProviderProps = {
  children: ReactNode;
};

export const LicenseServiceProvider = (props: LicenseServiceProviderProps) => {
  const { children } = props;

  const [licenseService] = useState(() => new License());

  return <LicenseContext value={licenseService}>{children}</LicenseContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useLicenseService = () => {
  const context = use(LicenseContext);

  if (!context) {
    throw new Error('useLicenseService must be used within a LicenseServiceProvider');
  }

  return context;
};
