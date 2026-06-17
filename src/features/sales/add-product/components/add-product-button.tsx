type AddProductButtonProps = {
  onClick: () => void;
};

export const AddProductButton = (props: AddProductButtonProps) => {
  const { onClick } = props;

  return <button onClick={onClick}>Add Product</button>;
};
