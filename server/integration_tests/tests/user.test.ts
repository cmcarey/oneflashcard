import fetch from "node-fetch";

const jsonPost = (url: string, body: any) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

describe("User registration", () => {
  const url = "http://core:3000/user/create";

  it("Good registration", async () => {
    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass"
    });

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  it("Email in use", async () => {
    await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass"
    });

    const res = await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Email address is in use" });
  });

  it("Email in use different capitalization", async () => {
    await jsonPost(url, {
      email: "chance@carey.sh",
      password: "somegoodpass"
    });

    const res = await jsonPost(url, {
      email: "CHANCE@carey.sh",
      password: "somegoodpass"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Email address is in use" });
  });

  it("Bad inputs", async () => {
    const res = await jsonPost(url, {
      email: "chance@carey.sh"
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: `"password" is required` });
  });
});
