import { ReactNode } from 'react';
import { AppRuntimeProvider } from '../shared/provider';

type AppRuntimeProps = {
  children: ReactNode;
};

export const AppRuntime = (props: AppRuntimeProps) => {
  const { children } = props;

  // server query
  const appRuntimePromise = Promise.resolve({ version: null, platform: null, desktopId: null }).then(appRuntime => {
    const isDesktop = appRuntime.version !== null || appRuntime.platform !== null || appRuntime.desktopId !== null;
    const isClient = typeof window !== 'undefined';
    const isServer = !isClient;

    return { isClient, isServer, isDesktop, ...appRuntime };
  });

  return <AppRuntimeProvider value={appRuntimePromise}>{children}</AppRuntimeProvider>;
};
