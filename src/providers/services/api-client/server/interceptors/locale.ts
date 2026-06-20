import { getLocale } from 'next-intl/server';
import { Interceptor } from '../../shared/types';

export const localeInterceptor: Interceptor = {
  request: {
    onFulfilled: async config => {
      const locale = await getLocale();

      if (!config.headers.has('Accept-Language')) {
        config.headers.set('Accept-Language', locale);
      }

      return config;
    },
  },
};
