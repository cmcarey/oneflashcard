import supertest from "supertest";
import { createServer } from "../../src/server";
import { Db } from "../db";
import { deleteCard, getCards, newCard, updateCard } from "../utils/card";
import { login } from "../utils/user";

describe("Fetch cards", () => {
  let server: any;
  const db = new Db();
  beforeAll(() => (server = createServer(db, undefined as any)));
  afterAll(() => server.close());
  afterEach(() => db.resetStore());

  test("Bad authentication", async () => {
    const res = await supertest(server).get("/card");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Fetch but empty", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await getCards(server, sessionKey);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cards: [] });
  });

  test("Fetch when there are cards", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card1 = await newCard(
      server,
      sessionKey,
      "some title",
      "some text",
      []
    );
    const card2 = await newCard(
      server,
      sessionKey,
      "some title2",
      "some text2",
      []
    );

    const res = await getCards(server, sessionKey);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cards: [card1.body.card, card2.body.card] });
  });
});

describe("New card", () => {
  let server: any;
  const db = new Db();
  beforeAll(() => (server = createServer(db, undefined as any)));
  afterAll(() => server.close());
  afterEach(() => db.resetStore());

  test("Bad authentication", async () => {
    const res = await supertest(server).post("/card/new");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad request body", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await supertest(server)
      .post("/card/new")
      .set("Authorization", `Bearer ${sessionKey}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Inserts correctly", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = await newCard(
      server,
      sessionKey,
      "some title",
      "some text",
      []
    );

    expect(card.status).toBe(200);
    expect(card.body).toEqual({
      card: {
        cardID: expect.any(String),
        title: "some title",
        text: "some text",
        tagIDs: []
      }
    });
  });

  test("Bad tag ID", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = await newCard(server, sessionKey, "some title", "some text", [
      "sometag"
    ]);

    expect(card.status).toBe(400);
    expect(card.text).toBe("BAD_TAGID");
  });
});

describe("Update card", () => {
  let server: any;
  const db = new Db();
  beforeAll(() => (server = createServer(db, undefined as any)));
  afterAll(() => server.close());
  afterEach(() => db.resetStore());

  test("Bad authentication", async () => {
    const res = await supertest(server).post("/card/update");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad request body", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await supertest(server)
      .post("/card/update")
      .set("Authorization", `Bearer ${sessionKey}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Updates correctly", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = await newCard(
      server,
      sessionKey,
      "some title",
      "some text",
      []
    );

    const nextCard = {
      cardID: card.body.card.cardID,
      title: "New title",
      text: "New text",
      tagIDs: []
    };

    const res = await updateCard(server, sessionKey, nextCard);
    expect(res.status).toBe(200);
    expect(res.text).toBe("");

    const cards = await getCards(server, sessionKey);
    expect(cards.body).toEqual({ cards: [nextCard] });
  });

  test("Bad card ID", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = {
      cardID: "badcardid",
      title: "New title",
      text: "New text",
      tagIDs: []
    };

    const res = await updateCard(server, sessionKey, card);
    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_CARDID");

    const cards = await getCards(server, sessionKey);
    expect(cards.body).toEqual({ cards: [] });
  });

  test("Bad tag ID", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = await newCard(
      server,
      sessionKey,
      "some title",
      "some text",
      []
    );

    const nextCard = {
      cardID: card.body.card.cardID,
      title: "New title",
      text: "New text",
      tagIDs: ["badid"]
    };

    const res = await updateCard(server, sessionKey, nextCard);
    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_TAGID");

    const cards = await getCards(server, sessionKey);
    expect(cards.body).toEqual({ cards: [card.body.card] });
  });
});

describe("Delete card", () => {
  let server: any;
  const db = new Db();
  beforeAll(() => (server = createServer(db, undefined as any)));
  afterAll(() => server.close());
  afterEach(() => db.resetStore());

  test("Bad authentication", async () => {
    const res = await supertest(server).post("/card/delete");

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_SESSION_KEY");
  });

  test("Bad request body", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await supertest(server)
      .post("/card/delete")
      .set("Authorization", `Bearer ${sessionKey}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_REQUEST_BODY");
  });

  test("Successful delete", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const card = await newCard(
      server,
      sessionKey,
      "some title",
      "some text",
      []
    );

    const res = await deleteCard(server, sessionKey, card.body.card.cardID);
    expect(res.status).toBe(200);
    expect(res.text).toBe("");

    const cards = await getCards(server, sessionKey);
    expect(cards.body).toEqual({ cards: [] });
  });

  test("Bad card ID", async () => {
    const sessionKey = (await login(server)).body.sessionKey;

    const res = await deleteCard(server, sessionKey, "badid");
    expect(res.status).toBe(400);
    expect(res.text).toBe("BAD_CARDID");
  });
});
