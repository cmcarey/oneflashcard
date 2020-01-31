import { Api, AQRes, QRes } from "./api";
import { resCards, resTags } from "./cards";
import { Card, Tag, User } from "./model";

const sleep = (ms: number = 500) => new Promise(r => setTimeout(r, ms));

const cards = resCards;
let nextCardID = cards.length + 1;
const tags = resTags;
let nextTagID = tags.length + 1;

const api: Api = {
  async login(
    email: string,
    password: string
  ): QRes<{ user: User; sessionKey: string }, "BAD_EMAIL" | "BAD_PASSWORD"> {
    await sleep();

    if (email === "chance@carey.sh" && password === "somepass")
      return {
        tag: "ok",
        payload: {
          user: { user_id: "some-user-id", email: "chance@carey.sh" },
          sessionKey: "some-session-key"
        }
      };

    return { tag: "error", error: "BAD_EMAIL" };
  },

  async fetchUser(sessionKey: string): AQRes<{ user: User }, never> {
    await sleep();

    if (sessionKey === "some-session-key")
      return {
        tag: "ok",
        payload: { user: { user_id: "some-user-id", email: "chance@carey.sh" } }
      };

    return { tag: "error", error: "INVALID_SESSION_KEY" };
  },

  async fetchCards(sessionKey: string): AQRes<{ cards: Card[] }, never> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    return { tag: "ok", payload: { cards } };
  },

  async fetchTags(sessionKey: string): AQRes<{ tags: Tag[] }, never> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    return { tag: "ok", payload: { tags } };
  },

  async newTag(
    sessionKey: string,
    text: string,
    color: string
  ): AQRes<{ tag: Tag }, never> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    const tag = {
      tag_id: (nextTagID++).toString(),
      text,
      color
    };
    tags.push(tag);
    return { tag: "ok", payload: { tag } };
  },

  async updateTag(sessionKey: string, tag: Tag): AQRes<void, "BAD_TAGID"> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    const tagIDs = tags.map(tag => tag.tag_id);
    tags.splice(tagIDs.indexOf(tag.tag_id), 1, tag);

    return { tag: "ok", payload: undefined };
  },

  async deleteTag(sessionKey: string, tagID: string): AQRes<void, "BAD_TAGID"> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    const tagIDs = tags.map(tag => tag.tag_id);
    tags.splice(tagIDs.indexOf(tagID), 1);

    // Also iterate through cards and remove cards that have this tag
    cards.forEach(card => {
      const index = card.tag_ids.indexOf(tagID);
      if (index !== -1) card.tag_ids.splice(index, 1);
    });

    return { tag: "ok", payload: undefined };
  },

  async newCard(
    sessionKey: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): AQRes<{ card: Card }, "BAD_TAGID"> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    const card = { card_id: (nextCardID++).toString(), title, text, tag_ids };
    cards.splice(0, 0, card);

    return { tag: "ok", payload: { card } };
  },

  async updateCard(
    sessionKey: string,
    card: Card
  ): AQRes<{ card: Card }, "BAD_CARDID" | "BAD_TAGID"> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    const cardIDs = cards.map(card => card.card_id);
    cards.splice(cardIDs.indexOf(card.card_id), 1, card);

    return { tag: "ok", payload: { card } };
  },

  async deleteCard(
    sessionKey: string,
    cardID: string
  ): AQRes<void, "BAD_CARDID"> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { tag: "error", error: "INVALID_SESSION_KEY" };

    const cardIDs = cards.map(card => card.card_id);
    cards.splice(cardIDs.indexOf(cardID), 1);

    return { tag: "ok", payload: undefined };
  }
};

export default api;
