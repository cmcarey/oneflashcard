import supertest from "supertest";
import { createServer } from "../src/server";
import { Db } from "./db";

describe("some tests", () => {
  let server: any;
  beforeAll(() => (server = createServer(new Db(), undefined as any)));
  afterAll(() => server.close());

  test("some stuff", async () => {
    await supertest(server)
      .post("/login")
      .expect(400);
  });
});
