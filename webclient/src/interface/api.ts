import localApi from "./localApi";
import { Card, Tag, User } from "./model";
import realApi from "./realApi";

export type Result<Value, Errors> =
  | { tag: "ok"; payload: Value }
  | { tag: "error"; error: Errors };

export const isNever = (_: never) => {};

// Query result - always a promise result
export type QRes<V, E> = Promise<Result<V, E>>;
// Authenticated query result
export type AQRes<V, E> = QRes<V, E | "INVALID_SESSION_KEY">;

export type Api = {
  // User routes
  login(
    email: string,
    password: string
  ): QRes<{ user: User; sessionKey: string }, "BAD_EMAIL" | "BAD_PASSWORD">;
  fetchUser(key: string): AQRes<{ user: User }, never>;

  // Card routes
  fetchCards(key: string): AQRes<{ cards: Card[] }, never>;
  newCard(
    key: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): AQRes<{ card: Card }, "BAD_TAGID">;
  updateCard(
    key: string,
    card: Card
  ): AQRes<{ card: Card }, "BAD_CARDID" | "BAD_TAGID">;
  deleteCard(key: string, card_id: string): AQRes<never, "BAD_CARDID">;

  // Tag routes
  fetchTags(key: string): AQRes<{ tags: Tag[] }, never>;
  newTag(key: string, text: string, color: string): AQRes<{ tag: Tag }, never>;
  updateTag(key: string, tag: Tag): AQRes<never, "BAD_TAGID">;
  deleteTag(key: string, tag_id: string): AQRes<never, "BAD_TAGID">;
};

let api: Api;
console.log(process.env);
if (process.env.REACT_APP_DB === "mock") api = localApi as any;
else api = realApi;

export default api;
