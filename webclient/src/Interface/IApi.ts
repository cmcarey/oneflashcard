import { Card, Tag } from "../Store/Model";

export type AUTH = "INVALID_SESSION_KEY";
export type INPUT = "BAD_INPUT";

export type ApiResponse<E, T> = Promise<{
  error?: E | "SERVER_ERROR";
  value?: T;
}>;

export interface IServer {
  register(
    name: string,
    email: string,
    password: string
  ): ApiResponse<INPUT | "EMAIL_USED", { sessionKey: string }>;

  login(
    email: string,
    password: string
  ): ApiResponse<INPUT | "INVALID_DETAILS", { sessionKey: string }>;

  getCards(sessionKey: string): ApiResponse<AUTH, Card[]>;

  getTags(sessionKey: string): ApiResponse<AUTH, Tag[]>;

  newCard(
    sessionKey: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): ApiResponse<AUTH | INPUT | "INVALID_TAG_ID", { cardID: string }>;

  newTag(
    sessionKey: string,
    name: string,
    color: string
  ): ApiResponse<AUTH | INPUT, { tagID: string }>;

  updateCard(
    sessionKey: string,
    cardID: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): ApiResponse<AUTH | INPUT | "INVALID_CARD_ID" | "INVALID_TAG_ID", void>;

  updateTag(
    sessionKey: string,
    tagID: string,
    name: string,
    color: string
  ): ApiResponse<AUTH | INPUT | "INVALID_TAG_ID", void>;
}
