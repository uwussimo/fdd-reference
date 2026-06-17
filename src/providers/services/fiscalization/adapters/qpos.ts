import { FiscalizationAdapter, FiscalizationResult, Receipt } from '../types';

export class QposAdapter implements FiscalizationAdapter {
  readonly name = 'qpos';

  async isAvailable(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async fiscalize(_receipt: Receipt): Promise<FiscalizationResult> {
    throw new Error('Not implemented');
  }
}
