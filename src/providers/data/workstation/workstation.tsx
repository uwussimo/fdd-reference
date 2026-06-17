import { ReactNode } from 'react';
import { WorkstationProvider } from './provider';

type WorkstationProps = {
  children: ReactNode;
};

export const Workstation = (props: WorkstationProps) => {
  const { children } = props;

  const workstationPromise = Promise.resolve<Record<string, unknown>>({}).then(workstation => ({
    ...workstation,
    isMultikassa: true,
    isMobilkassa: false,
    isQpos: false,
  })); // server query

  return <WorkstationProvider value={workstationPromise}>{children}</WorkstationProvider>;
};
