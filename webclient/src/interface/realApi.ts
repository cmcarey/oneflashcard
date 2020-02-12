import superagent from "superagent";
import { Api, AQRes, QRes } from "./api";
import { Card, Tag, User } from "./model";

const api: Api = {
  // User routes
  async login(
    email: string,
    password: string
  ): QRes<{ user: User; sessionKey: string }, "BAD_EMAIL" | "BAD_PASSWORD"> {
    try {
      const req = await superagent.post("/api/login").send({ email, password });
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async fetchUser(key: string): AQRes<{ user: User }, never> {
    try {
      const req = await superagent
        .get("/api/user")
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },

  // Card routes
  async fetchCards(key: string): AQRes<{ cards: Card[] }, never> {
    try {
      const req = await superagent
        .get("/api/card")
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async newCard(
    key: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): AQRes<{ card: Card }, "BAD_TAGID"> {
    try {
      const req = await superagent
        .post("/api/card/new")
        .send({ title, text, tag_ids })
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async updateCard(
    key: string,
    card: Card
  ): AQRes<{ card: Card }, "BAD_CARDID" | "BAD_TAGID"> {
    try {
      const req = await superagent
        .post("/api/card/update")
        .send({ card })
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async deleteCard(key: string, card_id: string): AQRes<void, "BAD_CARDID"> {
    try {
      const req = await superagent
        .post("/api/card/delete")
        .send({ card_id })
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },

  // Tag routes
  async fetchTags(key: string): AQRes<{ tags: Tag[] }, never> {
    try {
      const req = await superagent
        .get("/api/tag")
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async newTag(
    key: string,
    text: string,
    color: string
  ): AQRes<{ tag: Tag }, never> {
    try {
      const req = await superagent
        .post("/api/tag/new")
        .send({ text, color })
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async updateTag(key: string, tag: Tag): AQRes<void, "BAD_TAGID"> {
    try {
      const req = await superagent
        .post("/api/tag/update")
        .send({ tag })
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  },
  async deleteTag(key: string, tag_id: string): AQRes<void, "BAD_TAGID"> {
    try {
      const req = await superagent
        .post("/api/tag/delete")
        .send({ tag_id })
        .set("Authorization", `Bearer ${key}`);
      return { tag: "ok", payload: req.body };
    } catch (e) {
      const e_msg = (e as any).response.text;
      return { tag: "error", error: e_msg };
    }
  }
};

export default api;
