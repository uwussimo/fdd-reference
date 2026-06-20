import { FiscalizationAdapter, Fiscalization } from './types';
import { ObservableService } from '../../observable';

export class FiscalizationService extends ObservableService implements Fiscalization {
  private adapter: FiscalizationAdapter | null = null;

  getIsReady = () => this.adapter !== null;

  init(adapter: FiscalizationAdapter) {
    this.adapter = adapter;
    this.notify();
  }

  async fiscalize(receipt: unknown) {
    if (!this.adapter) {
      throw new Error('Fiscalization service is not initialized. Call init() first.');
    }

    return this.adapter.fiscalize(receipt);
  }

  setActiveAdapter(adapter: FiscalizationAdapter) {
    this.adapter = adapter;
    this.notify();
  }

  getActiveAdapter() {
    if (!this.adapter) {
      throw new Error('Fiscalization service is not initialized. Call init() first.');
    }

    return this.adapter.name;
  }
}
