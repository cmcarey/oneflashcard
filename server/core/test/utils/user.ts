import supertest from "supertest";

export const login = (
  server: any,
  email = "chance@carey.sh",
  password = "somepass"
) =>
  supertest(server)
    .post("/login")
    .send({ email, password });

export const getUser = (server: any, key: string) =>
  supertest(server)
    .get("/user")
    .set("Authorization", `Bearer ${key}`);
