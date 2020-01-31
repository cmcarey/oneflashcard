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
    const card_id = card[0];

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
  async updateCard(card: Card): Promise<void> {
    //Update title and text
    await this.conn("cards")
      .update({ title: card.title, text: card.text })
      .where({ card_id: card.card_id });

    // Get current card_tag relations
    const card_tags = await this.conn("card_tags")
      .where({ card_id: card.card_id })
      .select();

    // Delete card_tags that are in card_tags but not card.tag_ids
    const toDelete = card_tags
      .filter(ct => !card.tag_ids.includes(ct.tag_id))
      .map(ct => ct.card_tag_id);
    if (toDelete.length > 0)
      await this.conn("card_tags")
        .whereIn("card_tag_id", toDelete)
        .delete();

    // Add card_tags that are in card.tag_ids but not in card_tags
    const toAdd = card.tag_ids.filter(
      tag_id => !card_tags.map(ct => ct.tag_id).includes(tag_id)
    );
    if (toAdd.length > 0)
      await this.conn("card_tags").insert(
        toAdd.map(tag_id => ({
          user_id: card.user_id,
          card_id: card.card_id,
          tag_id
        }))
      );
  }
  async deleteCard(card_id: string): Promise<void> {
    await this.conn("cards")
      .where({ card_id })
      .delete();
  }

  // Tag methods
  async getTagsByUserID(user_id: string): Promise<Tag[]> {
    const tags = await this.conn<Tag>("tags")
      .where({ user_id })
      .select();

    return tags;
  }
  async createTag(user_id: string, text: string, color: string): Promise<Tag> {
    const tag = await this.conn<Tag>("tags")
      .insert({ user_id, text, color })
      .returning("*");

    return tag[0];
  }
  async updateTag(tag: Tag): Promise<void> {
    await this.conn("tags")
      .update({ text: tag.text, color: tag.color })
      .where({ tag_id: tag.tag_id });
  }
  async deleteTag(tag_id: string): Promise<void> {
    await this.conn("tags")
      .where({ tag_id })
      .delete();
  }
}
