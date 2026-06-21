import { serverApiClient } from '@/providers/services/api-client/server';
import { createSalesApi } from '../shared/api';

export const SalesApi = createSalesApi(serverApiClient.client);
