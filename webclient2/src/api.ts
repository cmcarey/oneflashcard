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
      return { value: { key: "some-session-key" } };
    // Otherwise it's bad
    return { error: "INVALID_DETAILS" };
  },

  async getUser(
    sessionKey: string
  ): ApiResponse<"BAD_KEY", { username: string }> {
    // Delay
    await sleep(1000);
    // Ensure session key is correct
    if (sessionKey !== "some-session-key") return { error: "BAD_KEY" };
    // Return user
    return { value: { username: "Chance Carey" } };
  }
};
