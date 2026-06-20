import { FiscalizationAdapter } from '../types';

export class MultikassaAdapter implements FiscalizationAdapter {
  readonly name = 'multikassa';

  async isAvailable(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async fiscalize(_receipt: unknown): Promise<unknown> {
    throw new Error('Not implemented');
  }
}
