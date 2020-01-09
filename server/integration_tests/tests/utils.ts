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

const tables = ["users", "user_sessions", "cards", "card_tags"];
export const reset = async (c: Client) =>
  await c.query(`TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE`);

// Registers account
export const register = async (
  email = "chance@carey.sh",
  password = "somegoodpass"
) =>
  await jsonPost("http://core:3000/user/create", {
    email,
    password
  });

// Login, return session key
export const login = async (
  email = "chance@carey.sh",
  password = "somegoodpass",
  deviceName = "some device"
) => {
  const r = await jsonPost("http://core:3000/session/login", {
    email,
    password,
    deviceName
  });
  return (await r.json()).sessionKey;
};

// Insert card
export const insertCard = async (
  key: string,
  cardTitle: string,
  cardBody: string
) =>
  await jsonPost(
    "http://core:3000/card",
    {
      cardTitle,
      cardBody
    },
    key
  );

// Insert card tag
export const insertCardTag = async (
  key: string,
  cardID: string,
  tagName: string
) =>
  await jsonPost(
    "http://core:3000/cardtag",
    {
      cardID,
      tagName
    },
    key
  );
