import knex from "knex";

export interface IModel {
  createUser(email: string, hashedPassword: string): Promise<void>;
  getUser(email: string): Promise<{ userID: string; hashedPassword: string }>;

  createSession(
    userID: string,
    deviceName: string
  ): Promise<{ sessionID: string }>;
  getSession(
    sessionID: string
  ): Promise<{ userID: string; deviceName: string }>;
  getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]>;
  deleteSession(sessionID: string): Promise<void>;
}

export class PGModel implements IModel {
  constructor(private pgConnection: knex) {}

  createUser(email: string, hashedPassword: string): Promise<void> {
    // Lowercase email key
    throw new Error("Method not implemented.");
  }
  getUser(email: string): Promise<{ userID: string; hashedPassword: string }> {
    throw new Error("Method not implemented.");
  }
  createSession(
    userID: string,
    deviceName: string
  ): Promise<{ sessionID: string }> {
    throw new Error("Method not implemented.");
  }
  getSession(
    sessionID: string
  ): Promise<{ userID: string; deviceName: string }> {
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
