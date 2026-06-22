import { useMutation } from '@tanstack/react-query';
import { useFiscalization } from '@/providers/services/fiscalization/client';
import { useVitalsMonitor } from '@/providers/services/vitals-monitor/client';
import { useCustomerScreen } from '@/providers/services/customer-screen/client';

export const useFiscalizeReceipt = () => {
  const fiscalization = useFiscalization();
  const vitalsMonitor = useVitalsMonitor();
  const customerScreen = useCustomerScreen();

  const fiscalizeMutation = useMutation({ mutationFn: (receipt: unknown) => fiscalization.fiscalize(receipt) });

  // Main orchestration function
  const fiscalizeReceipt = async (receipt: unknown) => {
    try {
      customerScreen.reportStatus('Fiscalizing receipt, please wait...');

      const result = await fiscalizeMutation.mutateAsync(receipt);

      customerScreen.reportStatus('Receipt fiscalized successfully!');

      return result;
    } catch (error) {
      customerScreen.reportStatus('Failed to fiscalize receipt.');

      vitalsMonitor.reportError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return {
    isFiscalizingReceipt: fiscalizeMutation.isPending,
    isFiscalizeReceiptError: fiscalizeMutation.isError,
    fiscalizeReceipt,
  };
};
