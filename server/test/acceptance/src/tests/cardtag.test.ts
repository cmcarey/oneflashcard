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

    const c1 = await insertCard(key, "Some flash card", "Some flash card body");
    const id1 = (await c1.json()).cardID;

    const res = await insertCardTag(key, id1, "Some tag");
    const resJson = await res.json();

    expect(res.status).toBe(200);
    expect(resJson).toEqual({
      cardID: id1,
      cardTagID: resJson.cardTagID,
      tagName: "Some tag"
    });
  });

  test("No such card", async () => {
    await register();

    const key = await login();

    const res = await insertCardTag(key, "1", "Some tag");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Invalid cardID"
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

    const c1 = await insertCard(key, "Some flash card", "Some flash card body");
    const id1 = (await c1.json()).cardID;
    const ct1 = await insertCardTag(key, id1, "Some tag");
    const idct1 = (await ct1.json()).cardTagID;
    const ct2 = await insertCardTag(key, id1, "Some tag2");
    const idct2 = (await ct2.json()).cardTagID;

    const res = await get(url, key);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardTags: [
        {
          cardTagID: idct1,
          cardID: id1,
          tagName: "Some tag"
        },
        {
          cardTagID: idct2,
          cardID: id1,
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

    const c1 = await insertCard(key, "Some flash card", "Some flash card body");
    const id1 = (await c1.json()).cardID;
    const ct1 = await insertCardTag(key, id1, "Some tag");
    const idct1 = (await ct1.json()).cardTagID;

    let res = await get(url, key);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      cardTags: [
        {
          cardTagID: idct1,
          cardID: id1,
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

describe("Update card tag", () => {
  test("TODO", () => {
    expect(true).toBe(false);
  });
});
