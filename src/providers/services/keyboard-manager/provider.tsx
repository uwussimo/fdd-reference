'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { KeyboardManager } from './service';

const KeyboardManagerContext = createContext<KeyboardManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type KeyboardManagerServiceProviderProps = {
  children: ReactNode;
};

export const KeyboardManagerServiceProvider = (props: KeyboardManagerServiceProviderProps) => {
  const { children } = props;

  const [keyboardManagerService] = useState(() => new KeyboardManager());

  return <KeyboardManagerContext value={keyboardManagerService}>{children}</KeyboardManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useKeyboardManagerService = () => {
  const context = use(KeyboardManagerContext);

  if (!context) {
    throw new Error('useKeyboardManagerService must be used within a KeyboardManagerServiceProvider');
  }

  return context;
};
