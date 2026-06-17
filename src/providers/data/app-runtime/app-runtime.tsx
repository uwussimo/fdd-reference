import { ReactNode } from 'react';
import { AppRuntimeProvider } from './provider';

type AppRuntimeProps = {
  children: ReactNode;
};

export const AppRuntime = (props: AppRuntimeProps) => {
  const { children } = props;

  const appRuntimePromise = Promise.resolve<Record<string, unknown>>({}); // server query

  return <AppRuntimeProvider value={appRuntimePromise}>{children}</AppRuntimeProvider>;
};
