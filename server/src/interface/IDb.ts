import { Card, Session, Tag, User } from "./model";

export interface IDb {
  // User methods
  getUserByEmail(email: string): Promise<User | void>;
  getUserByUserID(userID: string): Promise<User | void>;

  // Session methods
  createSession(userID: string, key: string): Promise<Session>;
  getSessionByKey(key: string): Promise<Session | void>;

  // Card methods
  createCard(
    userID: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): Promise<Card>;
  getCardsByUserID(userID: string): Promise<Card[]>;
  updateCard(card: Card): Promise<void>;
  deleteCard(cardID: string): Promise<void>;

  // Tag methods
  getTagsByUserID(userID: string): Promise<Tag[]>;
  createTag(userID: string, text: string, color: string): Promise<Tag>;
  updateTag(tag: Tag): Promise<void>;
  deleteTag(tagID: string): Promise<void>;
}
