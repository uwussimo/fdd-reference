import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export type FetchRecommendationsParams = Record<string, unknown>;
export type FetchAnalogsParams = Record<string, unknown>;

export const createSalesApi = (client: AxiosInstance) => ({
  fetchRecommendations: async (params?: FetchRecommendationsParams, options?: AxiosRequestConfig) => {
    const { data } = await client.get<unknown>('products-recommended', { ...options, params });

    return data;
  },

  fetchAnalogs: async (params?: FetchAnalogsParams, options?: AxiosRequestConfig) => {
    const { data } = await client.get<unknown>('products-analogs', { ...options, params });

    return data;
  },
});
