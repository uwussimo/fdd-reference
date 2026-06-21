import { useApiClient } from '@/providers/services/api-client/client';
import { createSalesApi } from '../shared/api';

export const useSalesApi = () => {
  const apiClient = useApiClient();

  return createSalesApi(apiClient.client);
};
