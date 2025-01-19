export const xorTuple = <T>(a: T, b: [T, T]): T => {
  return a !== b[0] && a !== b[1] ? a : b[0];
};
