import { Card, Tag } from "../Store/Model";
import { ApiResponse, AUTH, INPUT, IServer } from "./IApi";

export class Api implements IServer {
  async register(
    name: string,
    email: string,
    password: string
  ): ApiResponse<INPUT | "EMAIL_USED", { sessionKey: string }> {
    throw new Error("Not yet implemented");
  }

  async login(
    email: string,
    password: string
  ): ApiResponse<INPUT | "INVALID_DETAILS", { sessionKey: string }> {
    throw new Error("Not yet implemented");
  }

  async getCards(sessionKey: string): ApiResponse<AUTH, Card[]> {
    throw new Error("Not yet implemented");
  }

  async getTags(sessionKey: string): ApiResponse<AUTH, Tag[]> {
    throw new Error("Not yet implemented");
  }

  async newCard(
    sessionKey: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): ApiResponse<AUTH | INPUT | "INVALID_TAG_ID", { cardID: string }> {
    throw new Error("Not yet implemented");
  }

  async newTag(
    sessionKey: string,
    name: string,
    color: string
  ): ApiResponse<AUTH | INPUT, { tagID: string }> {
    throw new Error("Not yet implemented");
  }

  async updateCard(
    sessionKey: string,
    cardID: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): ApiResponse<AUTH | INPUT | "INVALID_CARD_ID" | "INVALID_TAG_ID", void> {
    throw new Error("Not yet implemented");
  }

  async updateTag(
    sessionKey: string,
    tagID: string,
    name: string,
    color: string
  ): ApiResponse<AUTH | INPUT | "INVALID_TAG_ID", void> {
    throw new Error("Not yet implemented");
  }
}
