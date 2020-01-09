import knex from "knex";
import { Card, CardTag, IModel, Session, User } from "./model";

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

  async getUser(email: string): Promise<void | User> {
    const user = await this.pgConn("users")
      .whereRaw(`LOWER(email) = ?`, [email.toLowerCase()])
      .first();

    if (!user) return;
    return {
      userID: user.user_id,
      hashedPassword: user.hashed_password,
      email: user.email
    };
  }

  async createSession(
    userID: string,
    sessionKey: string,
    deviceName: string
  ): Promise<void> {
    await this.pgConn("user_sessions").insert({
      user_id: userID,
      session_key: sessionKey,
      device_name: deviceName
    });
  }

  async getSessionByKey(sessionKey: string): Promise<void | Session> {
    const session = await this.pgConn("user_sessions")
      .where({ session_key: sessionKey })
      .first();

    if (!session) return;
    return {
      sessionID: session.session_id,
      userID: session.user_id,
      sessionKey: session.session_key,
      deviceName: session.device_name
    };
  }

  async getSessionsByUserID(userID: string): Promise<Session[]> {
    const sessions = await this.pgConn("user_sessions")
      .where({ user_id: userID })
      .select();

    return sessions.map(session => ({
      sessionID: session.session_id,
      userID: session.user_id,
      sessionKey: session.session_key,
      deviceName: session.device_name
    }));
  }

  async deleteSession(sessionID: string): Promise<void> {
    await this.pgConn("user_sessions")
      .where({ session_id: sessionID })
      .delete();
  }

  async createCard(userID: string, title: string, body: string): Promise<Card> {
    const card = await this.pgConn("cards")
      .insert({
        user_id: userID,
        card_title: title,
        card_body: body
      })
      .returning(["card_id", "user_id", "card_title", "card_body"]);

    return {
      cardID: card[0].card_id,
      userID: card[0].user_id,
      cardTitle: card[0].card_title,
      cardBody: card[0].card_body
    };
  }

  async getCardsByUserID(userID: string): Promise<Card[]> {
    const cards = await this.pgConn("cards")
      .where({ user_id: userID })
      .select();

    return cards.map(card => ({
      cardID: card.card_id,
      userID: card.user_id,
      cardTitle: card.card_title,
      cardBody: card.card_body
    }));
  }

  async createCardTag(cardID: string, name: string): Promise<CardTag> {
    throw new Error("Method not implemented.");
  }

  async getCardTagsByUserID(cardID: string): Promise<CardTag> {
    throw new Error("Method not implemented.");
  }
}
