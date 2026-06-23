import { useFiscalizeReceipt } from '@/features/sales/fiscalize-receipt/client';
import { usePrintReceipt } from '@/features/sales/print-receipt/client';
import { useVitalsMonitor } from '@/providers/services/vitals-monitor/client';

export const useCheckout = () => {
  const vitalsMonitor = useVitalsMonitor();

  const { fiscalizeReceipt, isFiscalizingReceipt, isFiscalizeReceiptError } = useFiscalizeReceipt();
  const { printReceipt, isPrintingReceipt, isPrintReceiptError } = usePrintReceipt();

  const checkout = async (receipt: unknown) => {
    try {
      const fiscalizedReceipt = await fiscalizeReceipt(receipt);
      await printReceipt(fiscalizedReceipt);
    } catch (error) {
      vitalsMonitor.reportError(error as Error);
    }
  };

  return {
    isCheckingOut: isFiscalizingReceipt || isPrintingReceipt,
    isCheckoutError: isFiscalizeReceiptError || isPrintReceiptError,
    checkout,
  };
};
