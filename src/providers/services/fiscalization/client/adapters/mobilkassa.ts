import { FiscalizationAdapter } from '../types';

export class MobilkassaAdapter implements FiscalizationAdapter {
  readonly name = 'mobilkassa';

  async isAvailable(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async fiscalize(_receipt: unknown): Promise<unknown> {
    throw new Error('Not implemented');
  }
}
