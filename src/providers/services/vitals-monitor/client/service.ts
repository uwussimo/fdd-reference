import { VitalsMonitor } from './types';

export class VitalsMonitorService implements VitalsMonitor {
  reportError(error: Error) {
    // Here you would implement the logic to report the error to your monitoring service
  }
}
