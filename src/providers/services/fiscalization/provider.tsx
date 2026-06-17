'use client';

import { createContext, ReactNode, use, useEffect, useState } from 'react';
import { useWorkstationPromise } from '@/providers/data/workstation/client';
import { Fiscalization } from './service';
import { FiscalService } from './types';
import { resolveAdapter } from './helpers';

const FiscalServiceContext = createContext<FiscalService | null>(null);

// ----------------------------------------------------------------------------------------------------

type FiscalServiceProviderProps = {
  children: ReactNode;
};

export const FiscalServiceProvider = (props: FiscalServiceProviderProps) => {
  const { children } = props;

  const [fiscalService] = useState(() => new Fiscalization());

  const workstationPromise = useWorkstationPromise();

  useEffect(() => {
    (async () => {
      const workstation = await workstationPromise;
      const adapter = resolveAdapter(workstation);

      if (!adapter) {
        throw new Error('No supported fiscalization adapter found for this workstation');
      }

      fiscalService.init(adapter);
    })();
  }, [workstationPromise, fiscalService]);

  return <FiscalServiceContext value={fiscalService}>{children}</FiscalServiceContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useFiscalService = () => {
  const context = use(FiscalServiceContext);

  if (!context) {
    throw new Error('useFiscalService must be used within a FiscalServiceProvider');
  }

  return context;
};
