import { useFiscalizeReceipt } from '@/features/sales/fiscalize-receipt/client';
import { usePrintReceipt } from '@/features/sales/print-receipt/client';

export const useCheckout = () => {
  const { fiscalizeReceipt, isFiscalizingReceipt, isFiscalizeReceiptError } = useFiscalizeReceipt();
  const { printReceipt, isPrintingReceipt, isPrintReceiptError } = usePrintReceipt();

  const checkout = async (receipt: unknown) => {
    try {
      const fiscalizedReceipt = await fiscalizeReceipt(receipt);
      await printReceipt(fiscalizedReceipt);
    } catch (error) {
      // handle full checkout process error if needed, otherwise individual steps will report their own errors
    }
  };

  return {
    isCheckingOut: isFiscalizingReceipt || isPrintingReceipt,
    isCheckoutError: isFiscalizeReceiptError || isPrintReceiptError,
    checkout,
  };
};
