import supertest from "supertest";
import { createServer } from "../../src/server";
import { Db } from "../db";
import { getUser, login } from "../utils/user";

describe("Login", () => {
  let server: any;
  const db = new Db();
  beforeAll(() => (server = createServer(db, undefined as any)));
  afterAll(() => server.close());
  afterEach(() => db.resetStore());

  test("Bad request body", async () => {
    const res = await supertest(server).post("/login");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Good login", async () => {
    const res = await login(server);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      user: {
        userID: "0",
        email: "chance@carey.sh"
      },
      sessionKey: expect.any(String)
    });
  });

  test("Bad email", async () => {
    const res = await login(server, "notchance@carey.sh");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_EMAIL");
  });

  test("Bad password", async () => {
    const res = await login(server, undefined, "notsomepass");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_PASSWORD");
  });
});

describe("Fetch user", () => {
  let server: any;
  const db = new Db();
  beforeAll(() => (server = createServer(db, undefined as any)));
  afterAll(() => server.close());
  afterEach(() => db.resetStore());

  test("Missing session key", async () => {
    const res = await supertest(server).get("/user");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Malformed auth header", async () => {
    const loginRes = await login(server);
    const key = loginRes.body.sessionKey;

    const res = await supertest(server)
      .get("/user")
      .set("Authorization", `Beary ${key}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad session key", async () => {
    const res = await getUser(server, "badkey");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Good session key", async () => {
    const loginRes = await login(server);
    const sessionKey = loginRes.body.sessionKey;

    const res = await getUser(server, sessionKey);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ user: loginRes.body.user });
  });
});
