import { ReactNode } from 'react';
import { BranchProvider } from '../shared/provider';

type BranchProps = {
  children: ReactNode;
};

export const Branch = (props: BranchProps) => {
  const { children } = props;

  // server query
  const branchPromise = Promise.resolve<Record<string, unknown>>({});

  return <BranchProvider value={branchPromise}>{children}</BranchProvider>;
};
