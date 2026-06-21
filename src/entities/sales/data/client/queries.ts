import { useSuspenseQuery } from '@tanstack/react-query';
import { useSalesApi } from './api';
import { FetchRecommendationsParams, FetchAnalogsParams } from '../shared/api';

export const useRecommendationsSuspenseQuery = (params?: FetchRecommendationsParams) => {
  const SalesApi = useSalesApi();

  return useSuspenseQuery({
    queryKey: ['sales', 'recommendations', params],
    queryFn: () => SalesApi.fetchRecommendations(params),
  });
};

// ----------------------------------------------------------------------------------------------------

export const useAnalogsSuspenseQuery = (params?: FetchAnalogsParams) => {
  const SalesApi = useSalesApi();

  return useSuspenseQuery({
    queryKey: ['sales', 'analogs', params],
    queryFn: () => SalesApi.fetchAnalogs(params),
  });
};
