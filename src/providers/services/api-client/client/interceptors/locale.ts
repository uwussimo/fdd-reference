import { Interceptor } from '../../shared/types';

export const localeInterceptor: Interceptor = {
  request: {
    onFulfilled: config => {
      if (!config.headers.has('Accept-Language')) {
        config.headers.set('Accept-Language', 'ru');
      }

      return config;
    },
  },
};
