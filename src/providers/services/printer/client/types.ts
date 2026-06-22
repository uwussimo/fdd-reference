export type Printer = {
  print: (receipt: unknown) => Promise<void>;
};
