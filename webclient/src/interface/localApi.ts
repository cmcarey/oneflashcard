import { resCards, resTags } from "./cards";
import { Card, Tag, User } from "./model";

type AUTH = "INVALID_SESSION_KEY";

type ApiResponse<E, V> = Promise<{ error: E } | { value: V }>;

const sleep = (ms: number = 500) => new Promise(r => setTimeout(r, ms));

const cards = resCards;
let nextCardID = cards.length + 1;
const tags = resTags;
let nextTagID = tags.length + 1;

export default {
  async login(
    email: string,
    password: string
  ): ApiResponse<"INVALID_DETAILS", { user: User; sessionKey: string }> {
    await sleep();

    if (email === "chance@carey.sh" && password === "somepass")
      return {
        value: {
          user: { user_id: "some-user-id", email: "chance@carey.sh" },
          sessionKey: "some-session-key"
        }
      };

    return { error: "INVALID_DETAILS" };
  },

  async restore(sessionKey: string): ApiResponse<AUTH, { user: User }> {
    await sleep();

    if (sessionKey === "some-session-key")
      return {
        value: { user: { user_id: "some-user-id", email: "chance@carey.sh" } }
      };

    return { error: "INVALID_SESSION_KEY" };
  },

  async fetchCards(sessionKey: string): ApiResponse<AUTH, { cards: Card[] }> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    return { value: { cards } };
  },

  async fetchTags(sessionKey: string): ApiResponse<AUTH, { tags: Tag[] }> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    return { value: { tags } };
  },

  async newTag(
    sessionKey: string,
    text: string,
    color: string
  ): ApiResponse<AUTH, { tag: Tag }> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    const tag = {
      tag_id: (nextTagID++).toString(),
      text,
      color
    };
    tags.push(tag);
    return { value: { tag } };
  },

  async updateTag(sessionKey: string, tag: Tag): ApiResponse<AUTH, void> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    const tagIDs = tags.map(tag => tag.tag_id);
    tags.splice(tagIDs.indexOf(tag.tag_id), 1, tag);

    return { value: undefined };
  },

  async deleteTag(sessionKey: string, tagID: string): ApiResponse<AUTH, void> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    const tagIDs = tags.map(tag => tag.tag_id);
    tags.splice(tagIDs.indexOf(tagID), 1);

    // Also iterate through cards and remove cards that have this tag
    cards.forEach(card => {
      const index = card.tag_ids.indexOf(tagID);
      if (index !== -1) card.tag_ids.splice(index, 1);
    });

    return { value: undefined };
  },

  async newCard(
    sessionKey: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): ApiResponse<AUTH, { card: Card }> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    const card = { card_id: (nextCardID++).toString(), title, text, tag_ids };
    cards.splice(0, 0, card);

    return { value: { card } };
  },

  async updateCard(sessionKey: string, card: Card): ApiResponse<AUTH, void> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    const cardIDs = cards.map(card => card.card_id);
    cards.splice(cardIDs.indexOf(card.card_id), 1, card);

    return { value: undefined };
  },

  async deleteCard(
    sessionKey: string,
    cardID: string
  ): ApiResponse<AUTH, void> {
    await sleep();

    if (sessionKey !== "some-session-key")
      return { error: "INVALID_SESSION_KEY" };

    const cardIDs = cards.map(card => card.card_id);
    cards.splice(cardIDs.indexOf(cardID), 1);

    return { value: undefined };
  }
};
