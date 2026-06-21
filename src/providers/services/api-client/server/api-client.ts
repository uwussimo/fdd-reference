import { defaultConfig } from '../shared/config';
import { errorInterceptor } from '../shared/interceptors/error';
import { loggerInterceptor } from '../shared/interceptors/logger';
import { ApiClientService } from '../shared/service';
import { authInterceptor } from './interceptors/auth';
import { localeInterceptor } from './interceptors/locale';

const serverApiClient = new ApiClientService(defaultConfig);

serverApiClient.use(localeInterceptor);

// Conditional interceptor
if (process.env.NODE_ENV === 'development') {
  serverApiClient.use(loggerInterceptor);
}

// Interceptor with external options
serverApiClient.use(
  errorInterceptor({
    onSessionExpired: error => console.log('Session expired', error),
    onLicenseExpired: error => console.log('License expired', error),
  }),
);

serverApiClient.use(authInterceptor);

export { serverApiClient };
