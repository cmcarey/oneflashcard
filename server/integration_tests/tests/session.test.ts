import { Client } from "pg";
import { connect, get, jsonPost, login, register, reset } from "./utils";

describe("Session login", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/session/login";

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

describe("Get sessions", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/session";

  it("Good fetch", async () => {
    await register();
    const key = await login();

    const res = await get(url, key);

    expect(res.status).toBe(200);

    const sessions = (await res.json()).sessions;
    expect(sessions.length).toBe(1);
    expect(sessions[0]).toEqual({ sessionID: 1, deviceName: "some device" });
  });

  it("Bad auth token", async () => {
    await register();
    await login();

    const res = await get(url, "~");

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Invalid session key");
  });
});

describe("Delete session", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/session/delete";

  it("Delete session", async () => {
    await register();
    const key = await login();

    const res = await jsonPost(url, { sessionID: 1 }, key);

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  it("Can't delete nonexistent session", async () => {
    await register();
    const key = await login();

    const res = await jsonPost(url, { sessionID: 2 }, key);

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Unable to delete session");
  });

  it("Actually deletes", async () => {
    await register();
    const key = await login();

    let res = await jsonPost(url, { sessionID: 1 }, key);

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");

    res = await jsonPost(url, { sessionID: 1 }, key);

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Invalid session key");
  });
});
