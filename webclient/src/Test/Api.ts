import { ApiResponse, AUTH, INPUT, IServer } from "../Interface/IApi";
import { Card, Tag, User } from "../Store/Model";
import { resCards, resTags } from "./Res";

const key = "some-session-key";
let nextCardID = 1000;
const cards: Card[] = resCards;
let nextTagID = 1000;
const tags: Tag[] = resTags;

export class MockApi implements IServer {
  async register(
    name: string,
    email: string,
    password: string
  ): ApiResponse<INPUT | "EMAIL_USED", { sessionKey: string }> {
    if (name.length < 6 || password.length < 8 || email.indexOf("@") === -1)
      return Promise.resolve({ error: "BAD_INPUT" });

    if (email === "taken@carey.sh")
      return Promise.resolve({ error: "EMAIL_USED" });

    return Promise.resolve({ value: { sessionKey: key } });
  }

  async login(
    email: string,
    password: string
  ): ApiResponse<
    INPUT | "INVALID_DETAILS",
    { name: string; sessionKey: string }
  > {
    if (password.length < 8 || email.indexOf("@") === -1)
      return Promise.resolve({ error: "BAD_INPUT" });

    if (email !== "chance@carey.sh" || password !== "somepass")
      return Promise.resolve({ error: "INVALID_DETAILS" });

    return Promise.resolve({
      value: { name: "Chance Carey", sessionKey: key }
    });
  }

  async getUser(sessionKey: string): ApiResponse<AUTH, User> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    return Promise.resolve({
      value: { name: "Chance Carey", email: "chance@carey.sh" }
    });
  }

  async getCards(sessionKey: string): ApiResponse<AUTH, Card[]> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    return Promise.resolve({ value: cards });
  }

  async getTags(sessionKey: string): ApiResponse<AUTH, Tag[]> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    return Promise.resolve({ value: tags });
  }

  async newCard(
    sessionKey: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): ApiResponse<AUTH | INPUT | "INVALID_TAG_ID", { cardID: string }> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    // Check tags match
    const allTagIDs = tags.map(tag => tag.tagID);
    for (const tagID of tagIDs)
      if (allTagIDs.indexOf(tagID) === -1)
        Promise.resolve({ error: "INVALID_TAG_ID" });

    const card = { cardID: (nextCardID++).toString(), title, text, tagIDs };
    cards.push(card);

    return Promise.resolve({ value: { cardID: card.cardID } });
  }

  async newTag(
    sessionKey: string,
    name: string,
    color: string
  ): ApiResponse<AUTH | INPUT, { tagID: string }> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    const tag = { tagID: (nextTagID++).toString(), name, color };
    tags.push(tag);

    return Promise.resolve({ value: { tagID: tag.tagID } });
  }

  async updateCard(
    sessionKey: string,
    cardID: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): ApiResponse<AUTH | INPUT | "INVALID_CARD_ID" | "INVALID_TAG_ID", void> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    // card must exist
    const allCardIDs = cards.map(card => card.cardID);
    if (allCardIDs.indexOf(cardID) === -1)
      return Promise.resolve({ error: "INVALID_CARD_ID" });

    // tags must map
    const allTagIDs = tags.map(tag => tag.tagID);
    for (const tagID of tagIDs)
      if (allTagIDs.indexOf(tagID) === -1)
        Promise.resolve({ error: "INVALID_TAG_ID" });

    // perform update
    const card = cards[allCardIDs.indexOf(cardID)];
    card.title = title;
    card.text = text;
    card.tagIDs = tagIDs;

    return Promise.resolve({ value: undefined });
  }

  async updateTag(
    sessionKey: string,
    tagID: string,
    name: string,
    color: string
  ): ApiResponse<AUTH | INPUT | "INVALID_TAG_ID", void> {
    if (sessionKey !== key)
      return Promise.resolve({ error: "INVALID_SESSION_KEY" });

    // tag must exist
    const allTagIDs = tags.map(tag => tag.tagID);
    const tagIndex = allTagIDs.indexOf(tagID);
    if (tagIndex === -1) return Promise.resolve({ error: "INVALID_TAG_ID" });

    // update tag
    const tag = tags[tagIndex];
    tag.name = name;
    tag.color = color;

    return Promise.resolve({ value: undefined });
  }
}
