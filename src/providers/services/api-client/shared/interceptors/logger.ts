import { Interceptor } from '../types';

export const loggerInterceptor: Interceptor = {
  request: {
    onFulfilled: config => config,
  },
  response: {
    onFulfilled: response => response,
  },
};
