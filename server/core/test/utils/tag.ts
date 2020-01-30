import supertest from "supertest";

export const getTags = (server: any, key: string) =>
  supertest(server)
    .get("/tag")
    .set("Authorization", `Bearer ${key}`);

export const newTag = (server: any, key: string, text: string, color: string) =>
  supertest(server)
    .post("/tag/new")
    .send({ text, color })
    .set("Authorization", `Bearer ${key}`);

export const updateTag = (
  server: any,
  key: string,
  tag: {
    tagID: string;
    text: string;
    color: string;
  }
) =>
  supertest(server)
    .post("/tag/update")
    .send({ tag })
    .set("Authorization", `Bearer ${key}`);

export const deleteTag = (server: any, key: string, tagID: string) =>
  supertest(server)
    .post("/tag/delete")
    .send({ tagID })
    .set("Authorization", `Bearer ${key}`);
