import http from "http";
import request from "supertest";
import { App } from "../src/app";
import { createMockModel, resetMockModel } from "./utils";

describe("POST /user/create", () => {
  let model = createMockModel();
  let server = http.createServer(new App(model).app.callback());
  afterEach(() => resetMockModel(model));

  const url = "/user/create";
  const goodReqBody = { email: "chance@carey.sh", password: "somepass" };

  test("Good register", async () => {
    let res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(200);

    expect(model.createUser.mock.calls.length).toBe(1);
    expect(model.createUser.mock.calls[0][0]).toBe("chance@carey.sh");
  });
  test("Good register", async () => {
    let res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(200);

    expect(model.createUser.mock.calls.length).toBe(1);
    expect(model.createUser.mock.calls[0][0]).toBe("chance@carey.sh");
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

    // Password too short
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
      throw new Error("email used");
    });

    res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email address is in use");
  });
});
