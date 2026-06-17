'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { Printer } from './service';

const PrinterContext = createContext<Printer | null>(null);

// ----------------------------------------------------------------------------------------------------

type PrinterServiceProviderProps = {
  children: ReactNode;
};

export const PrinterServiceProvider = (props: PrinterServiceProviderProps) => {
  const { children } = props;

  const [printerService] = useState(() => new Printer());

  return <PrinterContext value={printerService}>{children}</PrinterContext>;
};

// ----------------------------------------------------------------------------------------------------

export const usePrinterService = () => {
  const context = use(PrinterContext);

  if (!context) {
    throw new Error('usePrinterService must be used within a PrinterServiceProvider');
  }

  return context;
};
