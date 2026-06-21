import { useCleanup } from './use-cleanup';
import { useEnhanceApiClient } from './use-enhance-api-client';

export const Effects = () => {
  useEnhanceApiClient();
  useCleanup();

  return null;
};
