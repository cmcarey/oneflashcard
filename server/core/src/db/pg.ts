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

  async getUser(
    email: string
  ): Promise<void | { userID: string; hashedPassword: string }> {
    const u = await this.pgConn("users")
      // .where({ email })
      .whereRaw(`LOWER(email) = ?`, [email.toLowerCase()])
      .first();

    if (!u) return;
    return { userID: u.user_id, hashedPassword: u.hashed_password };
  }

  async createSession(
    userID: string,
    deviceName: string
  ): Promise<{ sessionKey: string }> {
    throw new Error("Method not implemented.");
  }

  async getSession(sessionKey: string): Promise<void | { userID: string }> {
    throw new Error("Method not implemented.");
  }

  async getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]> {
    throw new Error("Method not implemented.");
  }

  async deleteSession(sessionID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
