import { Card, Session, Tag, User } from "./model";

export interface IDb {
  // User methods
  getUserByEmail(email: string): Promise<User | void>;
  getUserByUserID(user_id: string): Promise<User | void>;

  // Session methods
  createSession(user_id: string, key: string): Promise<Session>;
  getSessionByKey(key: string): Promise<Session | void>;

  // Card methods
  createCard(
    user_id: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): Promise<Card>;
  getCardsByUserID(user_id: string): Promise<Card[]>;
  updateCard(card: Card): Promise<void>;
  deleteCard(card_id: string): Promise<void>;

  // Tag methods
  getTagsByUserID(user_id: string): Promise<Tag[]>;
  createTag(user_id: string, text: string, color: string): Promise<Tag>;
  updateTag(tag: Tag): Promise<void>;
  deleteTag(tag_id: string): Promise<void>;
}
