import knex from "knex";
import { dbConfig } from "../config";
import { IDb } from "./IDb";
import { Card, Session, Tag, User } from "./model";

export class Db implements IDb {
  conn = knex({ client: "pg", connection: dbConfig });

  // User methods
  async getUserByEmail(_email: string): Promise<User | void> {
    throw new Error("Method not implemented.");
  }
  async getUserByUserID(_userID: string): Promise<User | void> {
    throw new Error("Method not implemented.");
  }

  // Session methods
  async createSession(_userID: string, _key: string): Promise<Session> {
    throw new Error("Method not implemented.");
  }
  async getSessionByKey(_key: string): Promise<Session | void> {
    throw new Error("Method not implemented.");
  }

  // Card methods
  async createCard(
    _userID: string,
    _title: string,
    _text: string,
    _tagIDs: string[]
  ): Promise<Card> {
    throw new Error("Method not implemented.");
  }
  async getCardsByUserID(_userID: string): Promise<Card[]> {
    throw new Error("Method not implemented.");
  }
  async updateCard(_card: Card): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteCard(_cardID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // Tag methods
  async getTagsByUserID(_userID: string): Promise<Tag[]> {
    throw new Error("Method not implemented.");
  }
  async createTag(
    _userID: string,
    _text: string,
    _color: string
  ): Promise<Tag> {
    throw new Error("Method not implemented.");
  }
  async updateTag(_tag: Tag): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteTag(_tagID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
