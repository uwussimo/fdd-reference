import { ReactNode } from 'react';

import { Workstation } from '@/providers/data/workstation/server';
import { Branch } from '@/providers/data/branch/server';

import { FiscalizationProvider as Fiscalization } from '@/providers/services/fiscalization/client';
import { PermissionsManagerProvider as PermissionsManager } from '@/providers/services/permissions-manager/client';
import { PrinterProvider as Printer } from '@/providers/services/printer/client';
import { SystemShiftProvider as SystemShift } from '@/providers/services/system-shift/client';
import { UpdateManagerProvider as UpdateManager } from '@/providers/services/update-manager/client';
import { VitalsMonitorProvider as VitalsMonitor } from '@/providers/services/vitals-monitor/client';
import { UsersManagerProvider as UsersManager } from '@/providers/services/users-manager/client';
import { CustomerScreenProvider as CustomerScreen } from '@/providers/services/customer-screen/client';
import { LicenseManagerProvider as LicenseManager } from '@/providers/services/license-manager/client';

type ProvidersProps = {
  children: ReactNode;
};

const DataProviders = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <Workstation>
      <Branch>{children}</Branch>
    </Workstation>
  );
};

// ----------------------------------------------------------------------------------------------------

const LibProviders = (props: ProvidersProps) => {
  const { children } = props;

  return children;
};

// ----------------------------------------------------------------------------------------------------

const ServiceProviders = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <VitalsMonitor>
      <LicenseManager>
        <PermissionsManager>
          <UpdateManager>
            <UsersManager>
              <Printer>
                <Fiscalization>
                  <SystemShift>
                    <CustomerScreen>{children}</CustomerScreen>
                  </SystemShift>
                </Fiscalization>
              </Printer>
            </UsersManager>
          </UpdateManager>
        </PermissionsManager>
      </LicenseManager>
    </VitalsMonitor>
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
