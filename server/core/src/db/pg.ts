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
    sessionKey: string,
    deviceName: string
  ): Promise<void> {
    await this.pgConn("sessions").insert({
      user_id: userID,
      session_key: sessionKey,
      device_name: deviceName
    });
  }

  async getSession(sessionKey: string): Promise<void | { userID: string }> {
    const s = await this.pgConn("sessions")
      .where({ session_key: sessionKey })
      .first();

    if (!s) return;
    return { userID: s.user_id };
  }

  async getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]> {
    const ss = await this.pgConn("sessions")
      .where({ user_id: userID })
      .select();

    return ss.map(s => ({
      sessionID: s.session_id,
      deviceName: s.device_name
    }));
  }

  async deleteSession(sessionID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
