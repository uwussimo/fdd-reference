export type Receipt = unknown;
export type FiscalizationResult = unknown;

export type FiscalizationAdapter = {
  readonly name: string;
  isAvailable(): Promise<boolean>;
  fiscalize(receipt: Receipt): Promise<FiscalizationResult>;
};

export type FiscalService = {
  fiscalize(receipt: Receipt): Promise<FiscalizationResult>;
  setActiveAdapter(adapter: FiscalizationAdapter): void;
  getActiveAdapter(): string;
  subscribe(onStoreChange: () => void): () => void;
  getIsReady(): boolean;
};
