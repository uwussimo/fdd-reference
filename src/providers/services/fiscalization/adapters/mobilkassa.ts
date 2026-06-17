import { FiscalizationAdapter, FiscalizationResult, Receipt } from '../types';

export class MobilkassaAdapter implements FiscalizationAdapter {
  readonly name = 'mobilkassa';

  async isAvailable(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async fiscalize(_receipt: Receipt): Promise<FiscalizationResult> {
    throw new Error('Not implemented');
  }
}
