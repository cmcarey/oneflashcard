export const propMatches = <T extends any>(
  stack: T[],
  prop: keyof T,
  value: T[keyof T]
) => {
  for (const item of stack) if (item[prop] === value) return true;
  return false;
};
