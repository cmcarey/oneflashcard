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
    await this.pgConn("users").insert({
      email,
      hashed_password: hashedPassword
    });
  }

  async getUser(
    email: string
  ): Promise<void | { userID: string; hashedPassword: string }> {
    const user = await this.pgConn("users")
      .whereRaw(`LOWER(email) = ?`, [email.toLowerCase()])
      .first();

    if (!user) return;
    return { userID: user.user_id, hashedPassword: user.hashed_password };
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
    const session = await this.pgConn("sessions")
      .where({ session_key: sessionKey })
      .first();

    if (!session) return;
    return { userID: session.user_id };
  }

  async getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]> {
    const sessions = await this.pgConn("sessions")
      .where({ user_id: userID })
      .select();

    return sessions.map(s => ({
      sessionID: s.session_id,
      deviceName: s.device_name
    }));
  }

  async deleteSession(sessionID: string): Promise<void> {
    await this.pgConn("sessions")
      .where({ session_id: sessionID })
      .delete();
  }
}
