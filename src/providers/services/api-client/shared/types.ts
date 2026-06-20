import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosInterceptorOptions } from 'axios';

type RequestInterceptor = {
  onFulfilled?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected?: (error: unknown) => unknown;
  options?: AxiosInterceptorOptions;
};

type ResponseInterceptor = {
  onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: unknown) => unknown;
};

export type Interceptor = {
  request?: RequestInterceptor;
  response?: ResponseInterceptor;
};

// ----------------------------------------------------------------------------------------------------

export type ApiClient = {
  readonly client: AxiosInstance;
  use(interceptor: Interceptor): () => void;
};
