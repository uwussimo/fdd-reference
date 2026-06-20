import { ReactNode } from 'react';
import { WorkstationProvider } from '../shared/provider';

type WorkstationProps = {
  children: ReactNode;
};

export const Workstation = (props: WorkstationProps) => {
  const { children } = props;

  // server query
  const workstationPromise = Promise.resolve<Record<string, unknown>>({}).then(workstation => ({
    isMultikassa: true,
    isMobilkassa: false,
    isQpos: false,
    workstation,
  }));

  return <WorkstationProvider value={workstationPromise}>{children}</WorkstationProvider>;
};
