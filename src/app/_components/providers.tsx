import { ReactNode } from 'react';

import { NextIntlClientProvider as NextIntlClient } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { NavigationGuardProvider as NavigationGuard } from 'next-navigation-guard';
import { ReactQuery } from '@/providers/lib/react-query/client';
import { Mantine } from '@/providers/lib/mantine/client';

import { AppRuntime } from '@/providers/data/app-runtime/server';

import { ApiClientProvider as ApiClient } from '@/providers/services/api-client/client';
import { DesktopApiClientProvider as DesktopApiClient } from '@/providers/services/desktop-api-client/client';
import { KeyboardManagerProvider as KeyboardManager } from '@/providers/services/keyboard-manager/client';
import { NetworkMonitorProvider as NetworkMonitor } from '@/providers/services/network-monitor/client';

type ProvidersProps = {
  children: ReactNode;
};

const DataProviders = (props: ProvidersProps) => {
  const { children } = props;

  return <AppRuntime>{children}</AppRuntime>;
};

// ----------------------------------------------------------------------------------------------------

const LibProviders = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <NextIntlClient>
      <NuqsAdapter>
        <NavigationGuard>
          <ReactQuery>
            <Mantine>{children}</Mantine>
          </ReactQuery>
        </NavigationGuard>
      </NuqsAdapter>
    </NextIntlClient>
  );
};

// ----------------------------------------------------------------------------------------------------

const ServiceProviders = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <ApiClient>
      <DesktopApiClient>
        <KeyboardManager>
          <NetworkMonitor>{children}</NetworkMonitor>
        </KeyboardManager>
      </DesktopApiClient>
    </ApiClient>
  );
};

// ----------------------------------------------------------------------------------------------------

export const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <DataProviders>
      <LibProviders>
        <ServiceProviders>{children}</ServiceProviders>
      </LibProviders>
    </DataProviders>
  );
};
