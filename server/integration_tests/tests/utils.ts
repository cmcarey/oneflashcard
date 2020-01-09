import fetch from "node-fetch";
import { Client } from "pg";

export const jsonPost = (url: string, body: any, key: string = "") =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: key },
    body: JSON.stringify(body)
  });

export const get = (url: string, key: string = "") =>
  fetch(url, {
    headers: { Authorization: key }
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
  await c.query(`TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE`);

// Registers account
export const register = async () =>
  await jsonPost("http://core:3000/user/create", {
    email: "chance@carey.sh",
    password: "somegoodpass"
  });

// Login, return session key
export const login = async () => {
  const r = await jsonPost("http://core:3000/user/login", {
    email: "chance@carey.sh",
    password: "somegoodpass",
    deviceName: "some device"
  });
  return (await r.json()).sessionKey;
};
