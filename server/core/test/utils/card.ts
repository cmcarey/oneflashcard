import supertest from "supertest";

export const getCards = (server: any, key: string) =>
  supertest(server)
    .get("/card")
    .set("Authorization", `Bearer ${key}`);

export const newCard = (
  server: any,
  key: string,
  title: string,
  text: string,
  tagIDs: string[]
) =>
  supertest(server)
    .post("/card/new")
    .send({ title, text, tagIDs })
    .set("Authorization", `Bearer ${key}`);

export const updateCard = (
  server: any,
  key: string,
  card: { cardID: string; title: string; text: string; tagIDs: string[] }
) =>
  supertest(server)
    .post("/card/update")
    .send({ card })
    .set("Authorization", `Bearer ${key}`);

export const deleteCard = (server: any, key: string, cardID: string) =>
  supertest(server)
    .post("/card/delete")
    .send({ cardID })
    .set("Authorization", `Bearer ${key}`);
