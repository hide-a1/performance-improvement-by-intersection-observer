export const getNumbers: (length: number) => number[] = (length: number) => {
  return Array.from({
    length,
  }).map((_, i) => {
    return i + 1;
  });
};
