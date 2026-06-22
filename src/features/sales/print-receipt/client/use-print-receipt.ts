import { useMutation } from '@tanstack/react-query';

import { useVitalsMonitor } from '@/providers/services/vitals-monitor/client';
import { useCustomerScreen } from '@/providers/services/customer-screen/client';
import { usePrinter } from '@/providers/services/printer/client';

export const usePrintReceipt = () => {
  const printer = usePrinter();
  const vitalsMonitor = useVitalsMonitor();
  const customerScreen = useCustomerScreen();

  const printMutation = useMutation({ mutationFn: (receipt: unknown) => printer.print(receipt) });

  // Main orchestration function
  const printReceipt = async (receipt: unknown) => {
    try {
      customerScreen.reportStatus('Printing receipt, please wait...');

      const result = await printMutation.mutateAsync(receipt);

      customerScreen.reportStatus('Receipt printed successfully!');

      return result;
    } catch (error) {
      customerScreen.reportStatus('Failed to print receipt.');

      vitalsMonitor.reportError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return {
    isPrintingReceipt: printMutation.isPending,
    isPrintReceiptError: printMutation.isError,
    printReceipt,
  };
};
