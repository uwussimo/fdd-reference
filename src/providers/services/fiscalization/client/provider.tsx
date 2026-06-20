'use client';

import { createContext, ReactNode, use, useEffect, useState } from 'react';

import { useWorkstationPromise } from '@/providers/data/workstation/client';
import { FiscalizationService } from './service';
import { Fiscalization } from './types';
import { resolveAdapter } from './helpers';

const FiscalizationContext = createContext<Fiscalization | null>(null);

// ----------------------------------------------------------------------------------------------------

type FiscalizationProviderProps = {
  children: ReactNode;
};

export const FiscalizationProvider = (props: FiscalizationProviderProps) => {
  const { children } = props;

  const [fiscalizationService] = useState(() => new FiscalizationService());

  const workstationPromise = useWorkstationPromise();

  useEffect(() => {
    (async () => {
      const workstation = await workstationPromise;
      const adapter = resolveAdapter(workstation);

      if (!adapter) {
        throw new Error('No supported fiscalization adapter found for this workstation');
      }

      // Delayed initialization
      fiscalizationService.init(adapter);
    })();
  }, [workstationPromise, fiscalizationService]);

  return <FiscalizationContext value={fiscalizationService}>{children}</FiscalizationContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useFiscalization = () => {
  const context = use(FiscalizationContext);

  if (!context) {
    throw new Error('useFiscalization must be used within a FiscalizationProvider');
  }

  return context;
};
