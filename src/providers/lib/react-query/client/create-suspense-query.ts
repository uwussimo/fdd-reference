export const createSuspenseQuery = () => {
  const useSuspenseQuery = () => {};
  const useInvalidateSuspenseQuery = () => {};

  return [useSuspenseQuery, useInvalidateSuspenseQuery];
};
