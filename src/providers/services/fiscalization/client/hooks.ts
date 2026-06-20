import { useEffect, useSyncExternalStore } from 'react';
import { useFiscalization } from './provider';

export const useIsFiscalizationReady = () => {
  const fiscalization = useFiscalization();
  return useSyncExternalStore(fiscalization.subscribe, fiscalization.getIsReady, () => false);
};

// ----------------------------------------------------------------------------------------------------

export const useOnFiscalizationReady = (callback: () => void) => {
  const isFiscalizationReady = useIsFiscalizationReady();

  useEffect(() => {
    if (isFiscalizationReady) {
      callback();
    }
  }, [isFiscalizationReady, callback]);
};

// ----------------------------------------------------------------------------------------------------

export const useActiveFiscalizationAdapter = () => {
  const fiscalization = useFiscalization();

  return useSyncExternalStore(
    fiscalization.subscribe,
    () => (fiscalization.getIsReady() ? fiscalization.getActiveAdapter() : null),
    () => null,
  );
};

// ----------------------------------------------------------------------------------------------------

export const useOnFiscalizationAdapterChange = (callback: () => void) => {
  const adapter = useActiveFiscalizationAdapter();

  useEffect(() => {
    if (adapter) {
      callback();
    }
  }, [adapter, callback]);
};
