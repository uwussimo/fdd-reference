import { CreateAxiosDefaults } from 'axios';
import { isArray, mapValues, sortBy } from 'lodash-es';
import queryString from 'query-string';

export const defaultConfig: CreateAxiosDefaults = {
  withCredentials: false,
  baseURL: process.env.NEXT_PUBLIC_PHARMACY_API_URL,
  paramsSerializer: {
    serialize: params => {
      const sortedParams = mapValues(params, value => (isArray(value) ? sortBy(value) : value));
      return queryString.stringify(sortedParams, { skipNull: true, skipEmptyString: true, arrayFormat: 'comma' });
    },
  },
};
