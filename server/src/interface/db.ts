import knex from "knex";
import { dbConfig } from "../config";
import { IDb } from "./IDb";
import { Session, User } from "./model";

export class Db implements IDb {
  conn = knex({ client: "pg", connection: dbConfig });

  getUserByEmail(_: string): Promise<User | void> {
    throw new Error("Method not implemented.");
  }
  getUserByUserID(_: string): Promise<User | void> {
    throw new Error("Method not implemented.");
  }

  createSession(_: string, _2: string): Promise<Session> {
    throw new Error("Method not implemented.");
  }
  getSessionByKey(_: string): Promise<Session | void> {
    throw new Error("Method not implemented.");
  }
}
