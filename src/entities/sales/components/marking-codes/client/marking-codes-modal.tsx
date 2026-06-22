export type MarkingCodesModalProps = {
  isProcessingMarkingCode: boolean;
  isProcessMarkingCodeError: boolean;
  processMarkingCode: (data: unknown) => void;
};

export const MarkingCodesModal = (props: MarkingCodesModalProps) => {
  const { isProcessingMarkingCode, isProcessMarkingCodeError, processMarkingCode } = props;

  return (
    <div>
      <h1>Marking Codes Modal</h1>

      <button
        onClick={() =>
          processMarkingCode({
            /* receipt data */
          })
        }
        disabled={isProcessingMarkingCode}
      >
        {isProcessingMarkingCode ? 'Processing...' : 'Process Marking Code'}
      </button>

      {isProcessMarkingCodeError && (
        <p style={{ color: 'red' }}>An error occurred during processing. Please try again.</p>
      )}
    </div>
  );
};
