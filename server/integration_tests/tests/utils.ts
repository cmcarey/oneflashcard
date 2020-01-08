import fetch from "node-fetch";
import { Client } from "pg";

export const jsonPost = (url: string, body: any) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

export const connect = async () => {
  const client = new Client({
    host: "db",
    user: "postgres",
    database: "oneflashcard"
  });
  await client.connect();
  return client;
};

const tables = ["users", "sessions"];
export const reset = async (c: Client) =>
  c.query(`TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE`);
