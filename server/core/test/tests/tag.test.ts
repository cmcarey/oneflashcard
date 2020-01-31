import supertest from "supertest";
import { createServer } from "../../src/server";
import { getDB } from "../db/db";
import { deleteTag, getTags, newTag, updateTag } from "../utils/tag";
import { login } from "../utils/user";

describe("Fetch tags", () => {
  let server: any;
  const db = getDB();
  beforeAll(() => (server = createServer(db.db, undefined as any)));
  afterAll(() => server.close());
  beforeEach(async () => await db.reset());

  test("Bad authentication", async () => {
    const res = await supertest(server).get("/tag");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Fetch but empty", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await getTags(server, sessionKey);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ tags: [] });
  });

  test("Fetch when there are tags", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    await newTag(server, sessionKey, "Some tag", "red");
    const tag2 = await newTag(server, sessionKey, "Some other tag", "blue");

    const res = await getTags(server, sessionKey);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      tags: [
        {
          // Manually specifying one of the tags to ensure all fields are there
          tag_id: expect.any(String),
          text: "Some tag",
          color: "red"
        },
        tag2.body.tag
      ]
    });
  });
});

describe("Insert tag", () => {
  let server: any;
  const db = getDB();
  beforeAll(() => (server = createServer(db.db, undefined as any)));
  afterAll(() => server.close());
  beforeEach(async () => await db.reset());

  test("Bad authentication", async () => {
    const res = await newTag(server, "badkey", "Some tag", "red");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad body", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await supertest(server)
      .post("/tag/new")
      .set("Authorization", `Bearer ${sessionKey}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Good insert", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await newTag(server, sessionKey, "Some tag", "red");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      tag: {
        tag_id: expect.any(String),
        text: "Some tag",
        color: "red"
      }
    });
  });
});

describe("Update tag", () => {
  let server: any;
  const db = getDB();
  beforeAll(() => (server = createServer(db.db, undefined as any)));
  afterAll(() => server.close());
  beforeEach(async () => await db.reset());

  test("Bad authentication", async () => {
    const res = await supertest(server).post("/tag/update");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad request body", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await supertest(server)
      .post("/tag/update")
      .set("Authorization", `Bearer ${sessionKey}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Bad tag ID", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const nextTag = {
      tag_id: "someid",
      text: "New tag",
      color: "blue"
    };

    const res = await updateTag(server, sessionKey, nextTag);
    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_TAGID");
  });

  test("Updates correctly", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const tag = await newTag(server, sessionKey, "tag", "red");

    const nextTag = {
      tag_id: tag.body.tag.tag_id,
      text: "New tag",
      color: "blue"
    };

    const res = await updateTag(server, sessionKey, nextTag);
    expect(res.status).toBe(200);
    expect(res.text).toBe("");

    const tags = await getTags(server, sessionKey);
    expect(tags.body).toEqual({ tags: [nextTag] });
  });
});

describe("Delete tag", () => {
  let server: any;
  const db = getDB();
  beforeAll(() => (server = createServer(db.db, undefined as any)));
  afterAll(() => server.close());
  beforeEach(async () => await db.reset());

  test("Bad authentication", async () => {
    const res = await supertest(server).post("/tag/delete");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad request body", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await supertest(server)
      .post("/tag/delete")
      .set("Authorization", `Bearer ${sessionKey}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Successful delete", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = await newTag(server, sessionKey, "some text", "red");

    const res = await deleteTag(server, sessionKey, card.body.tag.tag_id);
    expect(res.status).toBe(200);
    expect(res.text).toBe("");

    const tags = await getTags(server, sessionKey);
    expect(tags.body).toEqual({ tags: [] });
  });

  test("Bad tag ID", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await deleteTag(server, sessionKey, "badid");
    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_TAGID");
  });
});
