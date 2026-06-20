import { ReactNode } from 'react';

type KeyboardEventsBoundaryProps = {
  children: ReactNode;
};

export const KeyboardEventsBoundary = (props: KeyboardEventsBoundaryProps) => {
  const { children } = props;

  return children;
};
