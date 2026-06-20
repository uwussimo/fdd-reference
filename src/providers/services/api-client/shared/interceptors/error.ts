import { AxiosError, isAxiosError } from 'axios';
import { Interceptor } from '../types';

type ErrorInterceptorOptions = {
  onSessionExpired?: (error: AxiosError) => Promise<void> | void;
  onLicenseExpired?: (error: AxiosError) => Promise<void> | void;
};

export const errorInterceptor = (options?: ErrorInterceptorOptions): Interceptor => ({
  response: {
    onRejected: async error => {
      if (isAxiosError(error)) {
        if (error.response?.data?.code === 10_005) {
          await options?.onSessionExpired?.(error);
        } else if (error.response?.data?.code === 10_008) {
          await options?.onLicenseExpired?.(error);
        }
      }

      return Promise.reject(error);
    },
  },
});
