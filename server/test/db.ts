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
  getTagsByUserID(_userID: string): Promise<Tag[]> {
    // TODO implement
    return Promise.resolve([]);
  }
}
