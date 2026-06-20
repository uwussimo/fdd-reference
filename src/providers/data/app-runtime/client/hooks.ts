import { use, useEffect } from 'react';
import { AppRuntimeContext } from '../shared/provider';

export const useAppRuntimePromise = () => {
  const appRuntimePromise = use(AppRuntimeContext);

  if (!appRuntimePromise) {
    throw new Error('useAppRuntimePromise must be used within an AppRuntimeProvider');
  }

  return appRuntimePromise;
};

// ----------------------------------------------------------------------------------------------------

export const useAppRuntimeSuspense = () => use(useAppRuntimePromise());

// ----------------------------------------------------------------------------------------------------

export const useDesktopCallbackSuspense = (callback: () => void) => {
  const { isDesktop } = useAppRuntimeSuspense();

  return isDesktop ? callback : () => {};
};

// ----------------------------------------------------------------------------------------------------

export const useDesktopEffectSuspense = (callback: () => void) => {
  const { isDesktop } = useAppRuntimeSuspense();

  useEffect(() => {
    if (isDesktop) {
      callback();
    }
  }, [isDesktop, callback]);
};
