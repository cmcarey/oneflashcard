import knex from "knex";

export interface IModel {
  createUser(email: string, hashedPassword: string): void;
  getUser(email: string): { userID: string; hashedPassword: string };

  createSession(userID: string, deviceName: string): { sessionID: string };
  getSession(sessionID: string): { userID: string; deviceName: string };
  getSessions(userID: string): { sessionID: string; deviceName: string }[];
  deleteSession(sessionID: string): void;
}

export class PGModel implements IModel {
  constructor(private pgConnection: knex) {}

  createUser(email: string, password: string): void {
    throw new Error("Method not implemented.");
  }
  getUser(email: string): { userID: string; hashedPassword: string } {
    throw new Error("Method not implemented.");
  }
  createSession(userID: string, deviceName: string): { sessionID: string } {
    throw new Error("Method not implemented.");
  }
  getSession(sessionID: string): { userID: string; deviceName: string } {
    throw new Error("Method not implemented.");
  }
  getSessions(userID: string): { sessionID: string; deviceName: string }[] {
    throw new Error("Method not implemented.");
  }
  deleteSession(sessionID: string): void {
    throw new Error("Method not implemented.");
  }
}
