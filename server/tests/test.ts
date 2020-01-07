import { Server } from "http";
import request from "supertest";
import { App } from "../src/app";
import { EmailInUseError } from "../src/db/model";

const createModelMock = () => ({ createUser: jest.fn(), getUser: jest.fn() });

describe("POST /user/create", () => {
  let model: ReturnType<typeof createModelMock>;
  let server: Server;
  beforeEach(() => {
    model = createModelMock();
    server = new App(model).start(3840);
  });
  afterEach(() => server.close());

  const url = "/user/create";
  const goodReqBody = { email: "chance@carey.sh", password: "somepass" };

  test("Good register", async () => {
    const res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(200);

    expect(model.createUser.mock.calls.length).toBe(1);
    expect(model.createUser.mock.calls[0][0]).toBe("chance@carey.sh");
    expect(model.createUser.mock.calls[0][1]).toBe("somepass");
  });

  test("Bad input", async () => {
    // Missing email field
    let res = await request(server)
      .post(url)
      .send({ password: "somepass" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(`"email" is required`);

    // Badly formatted email
    res = await request(server)
      .post(url)
      .send({ email: "someuser" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(`"email" must be a valid email`);

    // Missing password field
    res = await request(server)
      .post(url)
      .send({ email: "chance@carey.sh" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(`"password" is required`);

    // Too short password
    res = await request(server)
      .post(url)
      .send({ email: "chance@carey.sh", password: "a" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      `"password" length must be at least 8 characters long`
    );
  });

  test("Email in use", async () => {
    let res = await request(server)
      .post(url)
      .send(goodReqBody);

    model.createUser.mockImplementation(() => {
      throw new EmailInUseError();
    });

    res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("EMAIL_IN_USE");
  });
});
