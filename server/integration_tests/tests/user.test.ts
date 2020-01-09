import { Client } from "pg";
import { connect, jsonPost, register, reset } from "./utils";

describe("User registration", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/user/create";

  it("Good registration", async () => {
    const res = await register();

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  it("Email in use", async () => {
    await register();

    const res = await register();

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Email address is in use");
  });

  it("Email in use different capitalization", async () => {
    await register();

    const res = await jsonPost(url, {
      email: "CHANCE@carey.sh",
      password: "somegoodpass"
    });

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Email address is in use");
  });

  it("Bad inputs", async () => {
    const res = await jsonPost(url, {
      email: "chance@carey.sh"
    });

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe(`"password" is required`);
  });
});

describe("User login", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/user/login";

  it("Good login", async () => {
    await register();

    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass",
      deviceName: "some device"
    });

    expect(res.status).toBe(200);
    expect(Object.keys(await res.json())).toEqual(["sessionKey"]);
  });

  it("Bad email", async () => {
    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass",
      deviceName: "some device"
    });

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Bad login details");
  });

  it("Bad password", async () => {
    await register();

    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "badpassword",
      deviceName: "some device"
    });

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Bad login details");
  });
});
