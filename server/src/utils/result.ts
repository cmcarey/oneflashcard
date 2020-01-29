export type Result<Value, Errors> =
  | { tag: "ok"; payload: Value }
  | { tag: "error"; error: Errors };

export const isNever = (_: never) => {};
