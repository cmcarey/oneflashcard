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
    tag_id: string;
    text: string;
    color: string;
  }
) =>
  supertest(server)
    .post("/tag/update")
    .send({ tag })
    .set("Authorization", `Bearer ${key}`);

export const deleteTag = (server: any, key: string, tag_id: string) =>
  supertest(server)
    .post("/tag/delete")
    .send({ tag_id })
    .set("Authorization", `Bearer ${key}`);
