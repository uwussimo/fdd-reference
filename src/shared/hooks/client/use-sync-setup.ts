import { useEffect, useRef } from 'react';

// Runs `setup` exactly once for the lifetime of the component (synchronously,
// before children render) and calls its returned cleanup exactly once on
// unmount. Does not support dependencies — if something needs to re-run
// setup when an input changes, this is the wrong hook for it.
export const useSyncSetup = (setup: () => () => void) => {
  const cleanupRef = useRef<() => void>(null);

  if (cleanupRef.current === null) {
    cleanupRef.current = setup();
  }

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);
};
