import bcrypt from "bcryptjs";
import { IDb } from "../src/interface/IDb";
import { Card, Session, Tag, User } from "../src/interface/model";

const somepassHashed = bcrypt.hashSync("somepass", bcrypt.genSaltSync(10));

class Store {
  users: User[] = [
    { userID: "0", email: "chance@carey.sh", password: somepassHashed }
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

export class Db implements IDb {
  store = new Store();
  resetStore = () => (this.store = new Store());

  // User methods
  getUserByEmail(email: string): Promise<User | void> {
    for (const user of this.store.users) {
      if (user.email === email) return Promise.resolve(user);
    }

    return Promise.resolve();
  }
  getUserByUserID(userID: string): Promise<User | void> {
    for (const user of this.store.users) {
      if (user.userID === userID) return Promise.resolve(user);
    }

    return Promise.resolve();
  }

  // Session methods
  createSession(userID: string, key: string): Promise<Session> {
    const session = { sessionID: this.store.getNextSessionID(), userID, key };
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
    userID: string,
    title: string,
    text: string,
    tagIDs: string[]
  ): Promise<Card> {
    const card = {
      cardID: this.store.getNextCardID(),
      userID,
      title,
      text,
      tagIDs
    };
    this.store.cards.push(card);

    return Promise.resolve(card);
  }
  getCardsByUserID(userID: string): Promise<Card[]> {
    const cards = this.store.cards.filter(card => card.userID === userID);

    return Promise.resolve(cards);
  }
  updateCard(card: Card): Promise<void> {
    const cardIDs = this.store.cards.map(card => card.cardID);
    const index = cardIDs.indexOf(card.cardID);

    this.store.cards.splice(index, 1, card);

    return Promise.resolve();
  }
  deleteCard(cardID: string): Promise<void> {
    const cardIDs = this.store.cards.map(card => card.cardID);
    const index = cardIDs.indexOf(cardID);

    this.store.cards.splice(index, 1);

    return Promise.resolve();
  }

  // Tag methods
  getTagsByUserID(userID: string): Promise<Tag[]> {
    const tags = this.store.tags.filter(tag => tag.userID === userID);

    return Promise.resolve(tags);
  }
  createTag(userID: string, text: string, color: string): Promise<Tag> {
    const tag = { tagID: this.store.getNextTagID(), userID, text, color };

    this.store.tags.push(tag);

    return Promise.resolve(tag);
  }
  updateTag(tag: Tag): Promise<void> {
    const tagIDs = this.store.tags.map(tag => tag.tagID);
    const tagIndex = tagIDs.indexOf(tag.tagID);

    this.store.tags.splice(tagIndex, 1, tag);

    return Promise.resolve();
  }
  deleteTag(tagID: string): Promise<void> {
    const tagIDs = this.store.tags.map(tag => tag.tagID);
    const tagIndex = tagIDs.indexOf(tagID);

    this.store.tags.splice(tagIndex, 1);

    return Promise.resolve();
  }
}
