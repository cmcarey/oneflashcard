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
  }

  // User methods
  async getUserByEmail(email: string): Promise<User | void> {
    const user = await this.conn<User>("users")
      .where({ email: email.toLowerCase() })
      .first();

    return user;
  }
  async getUserByUserID(user_id: string): Promise<User | void> {
    const user = await this.conn<User>("users")
      .where({ user_id })
      .first();

    return user;
  }

  // Session methods
  async createSession(user_id: string, key: string): Promise<Session> {
    const session = await this.conn<Session>("sessions")
      .insert({ user_id, key })
      .returning("*");

    return session[0];
  }
  async getSessionByKey(key: string): Promise<Session | void> {
    const session = await this.conn<Session>("sessions")
      .where({ key })
      .first();

    return session;
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
