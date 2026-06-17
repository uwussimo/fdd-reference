import { ObservableService } from '../observable';
import { FiscalizationAdapter, FiscalService, Receipt } from './types';

export class Fiscalization extends ObservableService implements FiscalService {
  private adapter: FiscalizationAdapter | null = null;

  getIsReady = () => this.adapter !== null;

  init(adapter: FiscalizationAdapter) {
    this.adapter = adapter;
    this.notify();
  }

  async fiscalize(receipt: Receipt) {
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
