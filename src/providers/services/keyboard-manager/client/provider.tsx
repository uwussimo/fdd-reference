'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { KeyboardManagerService } from './service';
import { KeyboardManager } from './types';

const KeyboardManagerContext = createContext<KeyboardManager | null>(null);

// ----------------------------------------------------------------------------------------------------

type KeyboardManagerProviderProps = {
  children: ReactNode;
};

export const KeyboardManagerProvider = (props: KeyboardManagerProviderProps) => {
  const { children } = props;

  const [keyboardManagerService] = useState(() => new KeyboardManagerService());

  return <KeyboardManagerContext value={keyboardManagerService}>{children}</KeyboardManagerContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useKeyboardManager = () => {
  const context = use(KeyboardManagerContext);

  if (!context) {
    throw new Error('useKeyboardManager must be used within a KeyboardManagerProvider');
  }

  return context;
};
