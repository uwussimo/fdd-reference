export type FiscalizationAdapter = {
  readonly name: string;
  isAvailable(): Promise<boolean>;
  fiscalize(receipt: unknown): Promise<unknown>;
};

export type Fiscalization = {
  getIsReady(): boolean;
  getActiveAdapter(): string;
  setActiveAdapter(adapter: FiscalizationAdapter): void;
  subscribe(onChange: () => void): () => void;
  fiscalize(receipt: unknown): Promise<unknown>;
};

// Claude's research notes from pharmacy-web, expected interface for fiscalization:

// fiscalization.isConnected;
// fiscalization.statusInfo;
// fiscalization.providerName; // plain label for telemetry/Sentry tags only — not a behavioral branch
// fiscalization.openShift(params);
// fiscalization.closeShift(params);
// fiscalization.sellReceipt(payload);
// fiscalization.refundReceipt(payload);
// fiscalization.getShiftInfo();
// fiscalization.getXReport();
// fiscalization.parseError(error); // new — replaces isMultikassaError/isMobilkassaError call-site checks
// fiscalization.toPrintableSellReceipt(data); // new — replaces sales-receipt-printable-converter.ts's switch
// fiscalization.toPrintableRefundReceipt(data); // new — replaces the inline branch in useSubmitWithFiscalization.ts:136-151
