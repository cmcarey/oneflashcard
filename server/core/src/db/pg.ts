import knex from "knex";
import { IModel } from "./model";

export const createPGConnection = () =>
  knex({
    client: "pg",
    connection: { host: "db", user: "postgres", database: "oneflashcard" }
  });

export class PGModel implements IModel {
  constructor(private pgConn: knex) {}

  async createUser(email: string, hashedPassword: string): Promise<void> {
    // Lowercase email key
    await this.pgConn("users").insert({
      email,
      hashed_password: hashedPassword
    });
  }

  getUser(email: string): Promise<{ userID: string; hashedPassword: string }> {
    throw new Error("Method not implemented.");
  }

  createSession(
    userID: string,
    deviceName: string
  ): Promise<{ sessionKey: string }> {
    throw new Error("Method not implemented.");
  }

  getSession(sessionKey: string): Promise<{ userID: string }> {
    throw new Error("Method not implemented.");
  }

  getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]> {
    throw new Error("Method not implemented.");
  }

  deleteSession(sessionID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
