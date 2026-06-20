import { defaultConfig } from '../shared/config';
import { errorInterceptor } from '../shared/interceptors/error';
import { loggerInterceptor } from '../shared/interceptors/logger';
import { ApiClientService } from '../shared/service';
import { localeInterceptor } from './interceptors/locale';

const serverApiClient = new ApiClientService(defaultConfig);

serverApiClient.use(localeInterceptor);

if (process.env.NODE_ENV === 'development') {
  serverApiClient.use(loggerInterceptor);
}

serverApiClient.use(
  errorInterceptor({
    onSessionExpired: error => console.log('Session expired', error),
    onLicenseExpired: error => console.log('License expired', error),
  }),
);

export { serverApiClient };
