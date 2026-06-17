import { ReactNode } from 'react';

type MantineProps = {
  children: ReactNode;
};

export const Theme = (props: MantineProps) => {
  const { children } = props;
  return children;
};
