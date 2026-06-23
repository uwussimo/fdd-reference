'use client';

import { useCheckout } from '@/processes/sales/checkout/client';
import { CheckoutDrawer } from '@/entities/sales/components/checkout/client';

const Page = () => {
  const { isCheckingOut, isCheckoutError, checkout } = useCheckout();

  return <CheckoutDrawer isCheckingOut={isCheckingOut} isCheckoutError={isCheckoutError} checkout={checkout} />;
};

export default Page;
