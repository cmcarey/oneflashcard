import knex from "knex";
import { Config } from "../config";
import { IDb } from "./IDb";
import { Card, Session, Tag, User } from "./model";

export class Db implements IDb {
  private conn: knex;

  constructor(config: Config) {
    this.conn = knex({
      client: "pg",
      connection: {
        host: config.db_host,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_database
      }
    });
    this.conn;
  }

  // User methods
  async getUserByEmail(_email: string): Promise<User | void> {
    // this.conn("users").where({email: _email.toLowerCase()}).
    throw new Error("Method not implemented.");
  }
  async getUserByUserID(_user_id: string): Promise<User | void> {
    throw new Error("Method not implemented.");
  }

  // Session methods
  async createSession(_user_id: string, _key: string): Promise<Session> {
    throw new Error("Method not implemented.");
  }
  async getSessionByKey(_key: string): Promise<Session | void> {
    throw new Error("Method not implemented.");
  }

  // Card methods
  async createCard(
    _user_id: string,
    _title: string,
    _text: string,
    _tag_ids: string[]
  ): Promise<Card> {
    throw new Error("Method not implemented.");
  }
  async getCardsByUserID(_user_id: string): Promise<Card[]> {
    throw new Error("Method not implemented.");
  }
  async updateCard(_card: Card): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteCard(_card_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // Tag methods
  async getTagsByUserID(_user_id: string): Promise<Tag[]> {
    throw new Error("Method not implemented.");
  }
  async createTag(
    _user_id: string,
    _text: string,
    _color: string
  ): Promise<Tag> {
    throw new Error("Method not implemented.");
  }
  async updateTag(_tag: Tag): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteTag(_tag_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
