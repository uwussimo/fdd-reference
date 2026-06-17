'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { CustomerScreen } from './service';

const CustomerScreenContext = createContext<CustomerScreen | null>(null);

// ----------------------------------------------------------------------------------------------------

type CustomerScreenServiceProviderProps = {
  children: ReactNode;
};

export const CustomerScreenServiceProvider = (props: CustomerScreenServiceProviderProps) => {
  const { children } = props;

  const [customerScreenService] = useState(() => new CustomerScreen());

  return <CustomerScreenContext value={customerScreenService}>{children}</CustomerScreenContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useCustomerScreenService = () => {
  const context = use(CustomerScreenContext);

  if (!context) {
    throw new Error('useCustomerScreenService must be used within a CustomerScreenServiceProvider');
  }

  return context;
};
