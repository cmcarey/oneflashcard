import { Client } from "pg";
import {
  connect,
  get,
  insertCard,
  insertCardTag,
  login,
  register,
  reset
} from "./utils";

describe("Create card tag", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  test("Good creation", async () => {
    await register();

    const key = await login();

    await insertCard(key, "Some flash card", "Some flash card body");

    const res = await insertCardTag(key, "1", "Some tag");

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardID: 1,
      cardTagID: 1,
      tagName: "Some tag"
    });
  });

  test("No such card", async () => {
    await register();

    const key = await login();

    const res = await insertCardTag(key, "1", "Some tag");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "No such card"
    });
  });
});

describe("Get card tags", () => {
  let client: Client;
  beforeAll(async () => (client = await connect()));
  afterAll(async () => await client.end());
  afterEach(async () => await reset(client));

  const url = "http://core:3000/cardtag";

  test("Good fetch", async () => {
    await register();

    const key = await login();

    await insertCard(key, "Some flash card", "Some flash card body");
    await insertCardTag(key, "1", "Some tag");
    await insertCardTag(key, "1", "Some tag2");

    const res = await get(url, key);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardTags: [
        {
          cardTagID: 1,
          cardID: 1,
          tagName: "Some tag"
        },
        {
          cardTagID: 2,
          cardID: 1,
          tagName: "Some tag2"
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
    await insertCardTag(key, "1", "Some tag");

    let res = await get(url, key);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardTags: [
        {
          cardTagID: 1,
          cardID: 1,
          tagName: "Some tag"
        }
      ]
    });

    res = await get(url, key2);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardTags: []
    });
  });
});
