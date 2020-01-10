import { Client } from "pg";
import { connect, get, insertCard, login, register, reset } from "./utils";

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
    expect(await res.json()).toEqual({
      cardID: 1,
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

    await insertCard(key, "Some flash card", "Some flash card body");
    await insertCard(key, "Some flash card2", "Some flash card body2");

    const res = await get(url, key);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cards: [
        {
          cardID: 1,
          cardTitle: "Some flash card",
          cardBody: "Some flash card body"
        },
        {
          cardID: 2,
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

    await insertCard(key, "Some flash card", "Some flash card body");

    let res = await get(url, key);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cards: [
        {
          cardID: 1,
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
