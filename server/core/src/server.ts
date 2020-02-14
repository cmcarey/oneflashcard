import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { getConfig } from "./config";
import { Db } from "./interface/db";
import { IDb } from "./interface/IDb";
import {
  cardCreateRoute,
  cardDeleteRoute,
  cardFetchFoute,
  cardUpdateRoute
} from "./routes/card";
import {
  tagCreateRoute,
  tagDeleteRoute,
  tagFetchRoute,
  tagUpdateRoute
} from "./routes/tag";
import { userFetchRoute, userLoginRoute } from "./routes/user";
import { buildHandler } from "./utils/route";

// console.log(bcrypt.hashSync("somedemopass", bcrypt.genSaltSync(10)));

export const createServer = (db: IDb, port: number) => {
  // Initial setup
  const app = new Koa();
  const router = new Router();

  // Middleware
  app.use(bodyParser());

  // Construct dependency injector
  const handleRoute = buildHandler({ db });

  // Add routes
  // User routes
  router.post("/api/login", handleRoute(userLoginRoute));
  router.get("/api/user", handleRoute(userFetchRoute));
  // Card routes
  router.get("/api/card", handleRoute(cardFetchFoute));
  router.post("/api/card/new", handleRoute(cardCreateRoute));
  router.post("/api/card/update", handleRoute(cardUpdateRoute));
  router.post("/api/card/delete", handleRoute(cardDeleteRoute));
  // Tag routes
  router.get("/api/tag", handleRoute(tagFetchRoute));
  router.post("/api/tag/new", handleRoute(tagCreateRoute));
  router.post("/api/tag/update", handleRoute(tagUpdateRoute));
  router.post("/api/tag/delete", handleRoute(tagDeleteRoute));

  // Add route handler
  app.use(router.routes()).use(router.allowedMethods());

  return app.listen(port);
};

if (process.env.NODE_ENV !== "test") {
  const config = getConfig();
  const port = config.port;
  createServer(new Db(config), port);
  console.log(`Server running on :${port}`);
}
