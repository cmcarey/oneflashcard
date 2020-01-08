import knex from "knex";

export const createPGConnection = () =>
  knex({
    client: "pg",
    connection: { database: "oneflashcard" }
  });
