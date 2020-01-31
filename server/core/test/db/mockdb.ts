import bcrypt from "bcryptjs";
import { IDb } from "../../src/interface/IDb";
import { Card, Session, Tag, User } from "../../src/interface/model";
import { ITestDB } from "./db";

const somepassHashed = bcrypt.hashSync("somepass", bcrypt.genSaltSync(10));

class Store {
  users: User[] = [
    {
      user_id: "0000-0000-0000-0000",
      email: "chance@carey.sh",
      password: somepassHashed
    }
  ];

  sessions: Session[] = [];
  nextSessionID = 0;
  getNextSessionID = () => (this.nextSessionID++).toString();

  cards: Card[] = [];
  nextCardID = 0;
  getNextCardID = () => (this.nextCardID++).toString();

  tags: Tag[] = [];
  nextTagID = 0;
  getNextTagID = () => (this.nextTagID++).toString();
}

class Db implements IDb {
  store = new Store();

  // User methods
  getUserByEmail(email: string): Promise<User | void> {
    for (const user of this.store.users) {
      if (user.email === email) return Promise.resolve(user);
    }

    return Promise.resolve();
  }
  getUserByUserID(user_id: string): Promise<User | void> {
    for (const user of this.store.users) {
      if (user.user_id === user_id) return Promise.resolve(user);
    }

    return Promise.resolve();
  }

  // Session methods
  createSession(user_id: string, key: string): Promise<Session> {
    const session = { session_id: this.store.getNextSessionID(), user_id, key };
    this.store.sessions.push(session);

    return Promise.resolve(session);
  }
  getSessionByKey(key: string): Promise<Session | void> {
    for (const session of this.store.sessions) {
      if (session.key === key) return Promise.resolve(session);
    }

    return Promise.resolve();
  }

  // Card methods
  createCard(
    user_id: string,
    title: string,
    text: string,
    tag_ids: string[]
  ): Promise<Card> {
    const card = {
      card_id: this.store.getNextCardID(),
      user_id,
      title,
      text,
      tag_ids
    };
    this.store.cards.push(card);

    return Promise.resolve(card);
  }
  getCardsByUserID(user_id: string): Promise<Card[]> {
    const cards = this.store.cards.filter(card => card.user_id === user_id);

    return Promise.resolve(cards);
  }
  updateCard(card: Card): Promise<void> {
    const card_ids = this.store.cards.map(card => card.card_id);
    const index = card_ids.indexOf(card.card_id);

    this.store.cards.splice(index, 1, card);

    return Promise.resolve();
  }
  deleteCard(card_id: string): Promise<void> {
    const card_ids = this.store.cards.map(card => card.card_id);
    const index = card_ids.indexOf(card_id);

    this.store.cards.splice(index, 1);

    return Promise.resolve();
  }

  // Tag methods
  getTagsByUserID(user_id: string): Promise<Tag[]> {
    const tags = this.store.tags.filter(tag => tag.user_id === user_id);

    return Promise.resolve(tags);
  }
  createTag(user_id: string, text: string, color: string): Promise<Tag> {
    const tag = { tag_id: this.store.getNextTagID(), user_id, text, color };

    this.store.tags.push(tag);

    return Promise.resolve(tag);
  }
  updateTag(tag: Tag): Promise<void> {
    const tag_ids = this.store.tags.map(tag => tag.tag_id);
    const tagIndex = tag_ids.indexOf(tag.tag_id);

    this.store.tags.splice(tagIndex, 1, tag);

    return Promise.resolve();
  }
  deleteTag(tag_id: string): Promise<void> {
    const tag_ids = this.store.tags.map(tag => tag.tag_id);
    const tagIndex = tag_ids.indexOf(tag_id);

    this.store.tags.splice(tagIndex, 1);

    return Promise.resolve();
  }
}

export class MockDB implements ITestDB {
  db = new Db();
  reset = async () => {
    this.db.store = new Store();
  };
}
