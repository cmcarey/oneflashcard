import { Client } from "pg";
import { connect, get, jsonPost, login, register, reset } from "./utils";

describe("Session login", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/session/login";

  test("Good login", async () => {
    await register();

    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass",
      deviceName: "some device"
    });

    expect(res.status).toBe(200);
    expect(Object.keys(await res.json())).toEqual(["sessionKey"]);
  });

  test("Bad email", async () => {
    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass",
      deviceName: "some device"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Bad login details" });
  });

  test("Bad password", async () => {
    await register();

    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "badpassword",
      deviceName: "some device"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Bad login details" });
  });
});

describe("Get sessions", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/session";

  test("Good fetch", async () => {
    await register();
    const key = await login();

    const res = await get(url, key);

    expect(res.status).toBe(200);
    const resJson = await res.json();
    expect(resJson).toEqual({
      sessions: [
        { sessionID: resJson.sessions[0].sessionID, deviceName: "some device" }
      ]
    });
  });

  test("Bad auth token", async () => {
    await register();
    await login();

    const res = await get(url, "~");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid session key" });
  });

  test("No crossover", async () => {
    // First user
    await register();
    const key = await login();
    // Second user
    await register("chance2@carey.sh");
    await login("chance2@carey.sh");

    const res = await get(url, key);

    expect(res.status).toBe(200);
    const resJson = await res.json();
    expect(resJson).toEqual({
      sessions: [
        { sessionID: resJson.sessions[0].sessionID, deviceName: "some device" }
      ]
    });
  });
});

describe("Delete session", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/session/delete";

  test("Delete session", async () => {
    await register();
    const key = await login();

    const session = await get("http://core:3000/session", key);
    const sessionID = (await session.json()).sessions[0].sessionID;

    const res = await jsonPost(url, { sessionID }, key);

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  test("Can't delete nonexistent session", async () => {
    await register();
    const key = await login();

    const res = await jsonPost(url, { sessionID: "2" }, key);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid sessionID" });
  });

  test("Actually deletes", async () => {
    await register();
    const key = await login();

    const session = await get("http://core:3000/session", key);
    const sessionID = (await session.json()).sessions[0].sessionID;

    let res = await jsonPost(url, { sessionID }, key);

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");

    res = await jsonPost(url, { sessionID: "1" }, key);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid session key" });
  });
});
