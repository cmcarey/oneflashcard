import knex from "knex";
import { dbConfig } from "../config";
import { IDb } from "./IDb";

export class Db implements IDb {
  conn = knex({ client: "pg", connection: dbConfig });
}
