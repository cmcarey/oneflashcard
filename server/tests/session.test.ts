import http from "http";
import request from "supertest";
import { App } from "../src/app";
import { createMockModel, resetMockModel } from "./utils";

// Encrypted result of "somepass"
const encPass = "$2b$10$592SSmQmvZR/xsM6o9xTRuUJX0lH0ODbQHO.IaV.7TaJ7bcrnJmfe";

describe("POST /user/login", () => {
  let model = createMockModel();
  let server = http.createServer(new App(model).app.callback());
  afterEach(() => resetMockModel(model));

  const url = "/user/login";
  const goodReqBody = {
    email: "chance@carey.sh",
    password: "somepass",
    deviceName: "tester"
  };

  test("Good login", async () => {
    model.getUser.mockReturnValue({ userID: 1, hashedPassword: encPass });
    model.createSession.mockReturnValue(7);

    let res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(200);
    expect(res.body.sessionID).toBe(7);

    expect(model.createSession.mock.calls.length).toBe(1);
    expect(model.createSession.mock.calls[0][0]).toBe(1);
    expect(model.createSession.mock.calls[0][1]).toBe("tester");
  });

  test("Bad login email", async () => {
    model.getUser.mockReturnValue({ userID: 1, hashedPassword: "~" });

    let res = await request(server)
      .post(url)
      .send({ ...goodReqBody, email: "chance@carey.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Bad login details");
  });

  test("Bad login pass", async () => {
    model.getUser.mockReturnValue({ userID: 1, hashedPassword: "~" });

    let res = await request(server)
      .post(url)
      .send(goodReqBody);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Bad login details");
  });
});
