import type { DesktopApiClient } from '@/providers/services/desktop-api-client/client';
import type { Printer } from './types';

export class PrinterService implements Printer {
  private desktopApiClient: DesktopApiClient;

  constructor(desktopApiClient: DesktopApiClient) {
    this.desktopApiClient = desktopApiClient;
  }

  async print(receipt: unknown) {
    await this.desktopApiClient.printReceipt(receipt);
  }
}
