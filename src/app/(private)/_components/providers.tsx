import { ReactNode } from 'react';

import { Workstation } from '@/providers/data/workstation/server';
import { Branch } from '@/providers/data/branch/server';

import { FiscalServiceProvider as Fiscalization } from '@/providers/services/fiscalization/client';
import { PermissionsServiceProvider as Permissions } from '@/providers/services/permissions/client';
import { PrinterServiceProvider as Printer } from '@/providers/services/printer/client';
import { SystemShiftServiceProvider as SystemShift } from '@/providers/services/system-shift/client';
import { UpdateManagerServiceProvider as UpdateManager } from '@/providers/services/update-manager/client';
import { TrackingServiceProvider as Tracking } from '@/providers/services/tracking/client';

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
    <Tracking>
      <Permissions>
        <Fiscalization>
          <Printer>
            <SystemShift>
              <UpdateManager>{children}</UpdateManager>
            </SystemShift>
          </Printer>
        </Fiscalization>
      </Permissions>
    </Tracking>
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
