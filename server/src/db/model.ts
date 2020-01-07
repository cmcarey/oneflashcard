import knex from "knex";

export interface IModel {
  createUser(email: string, password: string): void;
  getUser(email: string): { password: string };
}

export class EmailInUseError extends Error {
  public readonly message = "EMAIL_IN_USE";
}

export class PGModel implements IModel {
  constructor(private pgConnection: knex) {}

  createUser(email: string, password: string): void {
    throw new Error("Method not implemented.");
  }

  getUser(email: string): { password: string } {
    throw new Error("Method not implemented.");
  }
}
