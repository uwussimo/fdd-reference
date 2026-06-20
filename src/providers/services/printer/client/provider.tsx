'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { Printer } from './types';
import { PrinterService } from './service';

const PrinterContext = createContext<Printer | null>(null);

// ----------------------------------------------------------------------------------------------------

type PrinterProviderProps = {
  children: ReactNode;
};

export const PrinterProvider = (props: PrinterProviderProps) => {
  const { children } = props;

  const [printerService] = useState(() => new PrinterService());

  return <PrinterContext value={printerService}>{children}</PrinterContext>;
};

// ----------------------------------------------------------------------------------------------------

export const usePrinter = () => {
  const context = use(PrinterContext);

  if (!context) {
    throw new Error('usePrinter must be used within a PrinterProvider');
  }

  return context;
};
