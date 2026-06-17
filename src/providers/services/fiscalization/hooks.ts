import { useEffect, useSyncExternalStore } from 'react';
import { useFiscalService } from './provider';

export const useIsFiscalServiceReady = () => {
  const fiscalService = useFiscalService();
  return useSyncExternalStore(fiscalService.subscribe, fiscalService.getIsReady, () => false);
};

// ----------------------------------------------------------------------------------------------------

export const useOnFiscalServiceReady = (callback: () => void) => {
  const isFiscalServiceReady = useIsFiscalServiceReady();

  useEffect(() => {
    if (isFiscalServiceReady) {
      callback();
    }
  }, [isFiscalServiceReady, callback]);
};

// ----------------------------------------------------------------------------------------------------

export const useActiveFiscalAdapter = () => {
  const fiscalService = useFiscalService();

  return useSyncExternalStore(
    fiscalService.subscribe,
    () => (fiscalService.getIsReady() ? fiscalService.getActiveAdapter() : null),
    () => null,
  );
};

// ----------------------------------------------------------------------------------------------------

export const useOnActiveFiscalAdapterChange = (callback: () => void) => {
  const activeFiscalAdapter = useActiveFiscalAdapter();

  useEffect(() => {
    if (activeFiscalAdapter) {
      callback();
    }
  }, [activeFiscalAdapter, callback]);
};
