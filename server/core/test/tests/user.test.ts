import supertest from "supertest";
import { createServer } from "../../src/server";
import { getDB } from "../db/db";
import { getUser, login } from "../utils/user";

describe("Login", () => {
  let server: any;
  const db = getDB();
  beforeAll(() => (server = createServer(db.db, undefined as any)));
  afterAll(() => server.close());
  beforeEach(async () => await db.reset());

  test("Bad request body", async () => {
    const res = await supertest(server).post("/api/login");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Good login", async () => {
    const res = await login(server);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      user: {
        user_id: expect.any(String),
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
  const db = getDB();
  beforeAll(() => (server = createServer(db.db, undefined as any)));
  afterAll(() => server.close());
  beforeEach(async () => await db.reset());

  test("Missing session key", async () => {
    const res = await supertest(server).get("/api/user");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Malformed auth header", async () => {
    const loginRes = await login(server);
    const key = loginRes.body.sessionKey;

    const res = await supertest(server)
      .get("/api/user")
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
