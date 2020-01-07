import { Server } from "http";
import request from "supertest";
import { App } from "../src/app";

const createModelMock = () => ({ createUser: jest.fn(), getUser: jest.fn() });

describe("GET /", () => {
  let server: Server;
  let model = createModelMock();

  beforeAll(() => {
    const app = new App(model);
    server = app.start(3840);
  });

  afterAll(() => {
    server.close();
  });

  it("Returns 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  it("Called create user", () => {
    expect(model.createUser.mock.calls.length).toBe(1);
    expect(model.createUser.mock.calls[0][0]).toBe("chance@carey.sh");
    expect(model.createUser.mock.calls[0][1]).toBe("somepass");
  });
});
