import { Client } from "pg";
import {
  connect,
  get,
  insertCard,
  jsonPost,
  login,
  register,
  reset
} from "./utils";

describe("Create card", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  test("Good creation", async () => {
    await register();

    const key = await login();

    const res = await insertCard(
      key,
      "Some flash card",
      "Some flash card body"
    );

    expect(res.status).toBe(200);
    const resJson = await res.json();
    expect(resJson).toEqual({
      cardID: resJson.cardID,
      cardTitle: "Some flash card",
      cardBody: "Some flash card body"
    });
  });
});

describe("Get cards", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/card";

  test("Good fetch", async () => {
    await register();

    const key = await login();

    const c1 = await insertCard(key, "Some flash card", "Some flash card body");
    const id1 = (await c1.json()).cardID;
    const c2 = await insertCard(
      key,
      "Some flash card2",
      "Some flash card body2"
    );
    const id2 = (await c2.json()).cardID;

    const res = await get(url, key);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cards: [
        {
          cardID: id1,
          cardTitle: "Some flash card",
          cardBody: "Some flash card body"
        },
        {
          cardID: id2,
          cardTitle: "Some flash card2",
          cardBody: "Some flash card body2"
        }
      ]
    });
  });

  test("No crossover", async () => {
    await register();
    const key = await login();
    await register("chance2@carey.sh");
    const key2 = await login("chance2@carey.sh");

    const c1 = await insertCard(key, "Some flash card", "Some flash card body");
    const id1 = (await c1.json()).cardID;

    let res = await get(url, key);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cards: [
        {
          cardID: id1,
          cardTitle: "Some flash card",
          cardBody: "Some flash card body"
        }
      ]
    });

    res = await get(url, key2);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cards: []
    });
  });
});

describe("Update card", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/card/update";

  test("Update card title and body", async () => {
    await register();
    const key = await login();
    const c1 = await insertCard(key, "Some flash card", "Some flash card body");
    const id1 = (await c1.json()).cardID;

    let res = await jsonPost(
      url,
      {
        cardID: id1,
        cardTitle: "Some other title",
        cardBody: "Some other body"
      },
      key
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardID: id1,
      cardTitle: "Some other title",
      cardBody: "Some other body"
    });

    res = await get("http://core:3000/card", key);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cards: [
        {
          cardID: id1,
          cardTitle: "Some other title",
          cardBody: "Some other body"
        }
      ]
    });
  });

  test("Can't update nonexistent card", async () => {
    await register();
    const key = await login();

    const res = await jsonPost(
      url,
      {
        cardID: "aaaaa",
        cardTitle: "Some other title",
        cardBody: "Some other body"
      },
      key
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Invalid cardID"
    });
  });
});
