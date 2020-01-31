import { Api, AQRes, QRes } from "./api";
import { Card, Tag, User } from "./model";

const api: Api = {
  // User routes
  async login(
    email: string,
    password: string
  ): QRes<{ user: User; sessionKey: string }, "BAD_EMAIL" | "BAD_PASSWORD"> {
    throw new Error("Not yet implemented.");
  },
  async fetchUser(key: string): AQRes<{ user: User }, never> {
    throw new Error("Not yet implemented.");
  },

  // Card routes
  async fetchCards(key: string): AQRes<{ cards: Card[] }, never> {
    throw new Error("Not yet implemented.");
  },
  async newCard(
    key: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): AQRes<{ card: Card }, "BAD_TAGID"> {
    throw new Error("Not yet implemented.");
  },
  async updateCard(
    key: string,
    card: Card
  ): AQRes<{ card: Card }, "BAD_CARDID" | "BAD_TAGID"> {
    throw new Error("Not yet implemented.");
  },
  async deleteCard(key: string, card_id: string): AQRes<never, "BAD_CARDID"> {
    throw new Error("Not yet implemented.");
  },

  // Tag routes
  async fetchTags(key: string): AQRes<{ tags: Tag[] }, never> {
    throw new Error("Not yet implemented.");
  },
  async newTag(
    key: string,
    text: string,
    color: string
  ): AQRes<{ tag: Tag }, never> {
    throw new Error("Not yet implemented.");
  },
  async updateTag(key: string, tag: Tag): AQRes<never, "BAD_TAGID"> {
    throw new Error("Not yet implemented.");
  },
  async deleteTag(key: string, tag_id: string): AQRes<never, "BAD_TAGID"> {
    throw new Error("Not yet implemented.");
  }
};

export default api;
