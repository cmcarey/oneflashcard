type ApiResponse<E, V> = Promise<{ error: E } | { value: V }>;

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const api = {
  async login(
    email: string,
    password: string
  ): ApiResponse<"INVALID_DETAILS", { key: string }> {
    // Delay
    await sleep(500);
    // Require email chance@carey.sh and password somepass
    if (email === "chance@carey.sh" && password === "somepass")
      return Promise.resolve({ value: { key: "some-session-key" } });
    // Otherwise it's bad
    return Promise.resolve({ error: "INVALID_DETAILS" });
  }
};
