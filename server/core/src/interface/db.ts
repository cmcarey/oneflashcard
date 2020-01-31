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
    user_id: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): Promise<Card> {
    // Insert card
    const card = await this.conn("cards")
      .insert({ user_id, title, text })
      .returning("card_id");
    const card_id = card[0].card_id;

    // Then insert all card_tags relations
    await this.conn("card_tags").insert(
      tag_ids.map(tag_id => ({ user_id, card_id, tag_id }))
    );

    return { card_id, user_id, title, text, tag_ids };
  }
  async getCardsByUserID(user_id: string): Promise<Card[]> {
    // Must fetch card_tags.tag_id for each card by card_tags.card_id
    const cards = await this.conn("cards")
      .where({ user_id })
      .select();

    const card_tags = await this.conn("card_tags")
      .whereIn(
        "card_id",
        cards.map(card => card.card_id)
      )
      .select("card_id", "tag_id");

    return cards.map(card => ({
      ...card,
      tag_ids: card_tags
        .filter(ct => ct.card_id === card.card_id)
        .map(ct => ct.tag_id)
    }));
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
