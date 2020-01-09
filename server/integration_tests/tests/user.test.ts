import { Client } from "pg";
import { connect, jsonPost, register, reset } from "./utils";

describe("User registration", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/user/create";

  test("Good registration", async () => {
    const res = await register();

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  test("Email in use", async () => {
    await register();

    const res = await register();

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Email address is in use" });
  });

  test("Email in use different capitalization", async () => {
    await register();

    const res = await jsonPost(url, {
      email: "CHANCE@carey.sh",
      password: "somegoodpass"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Email address is in use" });
  });

  test("Bad inputs", async () => {
    const res = await jsonPost(url, {
      email: "chance@carey.sh"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: `"password" is required` });
  });
});
