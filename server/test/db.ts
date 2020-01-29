import bcrypt from "bcryptjs";
import { IDb } from "../src/interface/IDb";
import { Session, User } from "../src/interface/model";

const somepassHashed = bcrypt.hashSync("somepass", bcrypt.genSaltSync(10));

class Store {
  users: User[] = [
    { userID: "0", email: "chance@carey.sh", password: somepassHashed }
  ];

  sessions: Session[] = [];
  nextSessionID = 0;
  getNextSessionID = () => (this.nextSessionID++).toString();
}

export class Db implements IDb {
  store = new Store();
  resetStore = () => (this.store = new Store());

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
}
