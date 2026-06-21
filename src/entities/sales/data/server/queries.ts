import { cacheTag } from 'next/cache';
import { SalesApi } from './api';

export const fetchRecommendations = async () => {
  'use cache';
  cacheTag('recommendations');

  return SalesApi.fetchRecommendations();
};

// ----------------------------------------------------------------------------------------------------

export const fetchAnalogs = async () => {
  'use cache';
  cacheTag('analogs');

  return SalesApi.fetchAnalogs();
};
