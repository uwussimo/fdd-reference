import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { ApiClient, Interceptor } from './types';

export class ApiClientService implements ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);
  }

  get client() {
    return this.axiosInstance;
  }

  use(interceptor: Interceptor) {
    const requestId =
      interceptor.request ?
        this.axiosInstance.interceptors.request.use(
          interceptor.request.onFulfilled,
          interceptor.request.onRejected,
          interceptor.request.options,
        )
      : undefined;

    const responseId =
      interceptor.response ?
        this.axiosInstance.interceptors.response.use(interceptor.response.onFulfilled, interceptor.response.onRejected)
      : undefined;

    return () => {
      if (requestId !== undefined) {
        this.axiosInstance.interceptors.request.eject(requestId);
      }

      if (responseId !== undefined) {
        this.axiosInstance.interceptors.response.eject(responseId);
      }
    };
  }

  setDefaultHeader(name: string, value: string) {
    this.axiosInstance.defaults.headers.common[name] = value;
  }

  destroy() {
    this.axiosInstance.interceptors.request.clear();
    this.axiosInstance.interceptors.response.clear();
  }
}
