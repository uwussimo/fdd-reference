import { Interceptor } from '../../shared/types';

export const authInterceptor: Interceptor = {
  request: {
    onFulfilled: config => {
      // TODO: replace with real auth token source from cookies on the server
      const mockToken = 'mock-auth-token';

      config.headers.set('Authorization', `Bearer ${mockToken}`);

      return config;
    },
  },
};
