import { Session, User } from "./model";

export interface IDb {
  getUserByEmail(email: string): Promise<User | void>;
  getUserByUserID(userID: string): Promise<User | void>;

  createSession(userID: string, key: string): Promise<Session>;
  getSessionByKey(key: string): Promise<Session | void>;
}
