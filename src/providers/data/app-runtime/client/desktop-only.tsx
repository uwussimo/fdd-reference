import { ReactNode, Suspense, SuspenseProps } from 'react';
import { useAppRuntimeSuspense } from './hooks';

type DesktopOnlyProps = {
  fallback?: SuspenseProps['fallback'];
  children: ReactNode;
};

const DesktopOnlyContent = (props: DesktopOnlyProps) => {
  const { children } = props;

  const { isDesktop } = useAppRuntimeSuspense();

  if (!isDesktop) {
    return null;
  }

  return children;
};

export const DesktopOnly = (props: DesktopOnlyProps) => {
  const { fallback, ...restOfProps } = props;

  return (
    <Suspense fallback={fallback}>
      <DesktopOnlyContent {...restOfProps} />
    </Suspense>
  );
};
