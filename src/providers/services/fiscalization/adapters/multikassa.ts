import { FiscalizationAdapter, FiscalizationResult, Receipt } from '../types';

export class MultikassaAdapter implements FiscalizationAdapter {
  readonly name = 'multikassa';

  async isAvailable(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async fiscalize(_receipt: Receipt): Promise<FiscalizationResult> {
    throw new Error('Not implemented');
  }
}
