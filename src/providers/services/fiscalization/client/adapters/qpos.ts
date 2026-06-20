import { FiscalizationAdapter } from '../types';

export class QposAdapter implements FiscalizationAdapter {
  readonly name = 'qpos';

  async isAvailable(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async fiscalize(_receipt: unknown): Promise<unknown> {
    throw new Error('Not implemented');
  }
}
