import bcrypt from "bcryptjs";
import knex from "knex";
import { getConfig } from "../../src/config";
import { Db } from "../../src/interface/db";
import { ITestDB } from "./db";

const somepassHashed = bcrypt.hashSync("somepass", bcrypt.genSaltSync(10));

export class RealDB implements ITestDB {
  private config = getConfig();
  db = new Db(this.config);

  private conn = knex({
    client: "pg",
    connection: {
      host: this.config.db_host,
      user: this.config.db_user,
      password: this.config.db_pass,
      database: this.config.db_database
    }
  });

  async reset() {
    // Truncate all tables
    const tables = ["users", "sessions", "cards", "tags", "card_tags"];
    // DIRTY RAW QUERY
    await this.conn.raw(
      `TRUNCATE ${tables.join(", ")} RESTART IDENTITY CASCADE`
    );

    // Seed DB
    await this.seed();
  }

  private async seed() {
    // Insert test user
    await this.conn("users").insert({
      email: "chance@carey.sh",
      password: somepassHashed
    });
  }
}
