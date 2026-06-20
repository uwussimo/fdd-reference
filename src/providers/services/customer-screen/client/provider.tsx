'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { CustomerScreen } from './types';
import { CustomerScreenService } from './service';

const CustomerScreenContext = createContext<CustomerScreen | null>(null);

// ----------------------------------------------------------------------------------------------------

type CustomerScreenProviderProps = {
  children: ReactNode;
};

export const CustomerScreenProvider = (props: CustomerScreenProviderProps) => {
  const { children } = props;

  const [customerScreenService] = useState(() => new CustomerScreenService());

  return <CustomerScreenContext value={customerScreenService}>{children}</CustomerScreenContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useCustomerScreen = () => {
  const context = use(CustomerScreenContext);

  if (!context) {
    throw new Error('useCustomerScreen must be used within a CustomerScreenProvider');
  }

  return context;
};
