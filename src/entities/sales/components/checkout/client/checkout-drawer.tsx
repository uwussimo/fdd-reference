type CheckoutDrawerProps = {
  isCheckingOut: boolean;
  isCheckoutError: boolean;
  checkout: (data: unknown) => void;
};

export const CheckoutDrawer = (props: CheckoutDrawerProps) => {
  const { isCheckingOut, isCheckoutError, checkout } = props;

  return (
    <div>
      <h1>Checkout Drawer</h1>

      <button
        onClick={() =>
          checkout({
            /* receipt data */
          })
        }
        disabled={isCheckingOut}
      >
        {isCheckingOut ? 'Processing...' : 'Checkout'}
      </button>

      {isCheckoutError && <p style={{ color: 'red' }}>An error occurred during checkout. Please try again.</p>}
    </div>
  );
};
