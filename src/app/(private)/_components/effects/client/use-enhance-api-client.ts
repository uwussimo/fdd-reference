import { useSyncSetup } from '@/shared/hooks/client';
import { useApiClient, authInterceptor } from '@/providers/services/api-client/client';

export const useEnhanceApiClient = () => {
  const apiClient = useApiClient();

  useSyncSetup(() => apiClient.use(authInterceptor));
  // useSyncSetup(() => apiClient.use(refreshAuthInterceptor));
};
