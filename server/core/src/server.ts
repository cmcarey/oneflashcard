import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { config } from "./config";
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
  router.post("/login", handleRoute(userLoginRoute));
  router.get("/user", handleRoute(userFetchRoute));
  // Card routes
  router.get("/card", handleRoute(cardFetchFoute));
  router.post("/card/new", handleRoute(cardCreateRoute));
  router.post("/card/update", handleRoute(cardUpdateRoute));
  router.post("/card/delete", handleRoute(cardDeleteRoute));
  // Tag routes
  router.get("/tag", handleRoute(tagFetchRoute));
  router.post("/tag/new", handleRoute(tagCreateRoute));
  router.post("/tag/update", handleRoute(tagUpdateRoute));
  router.post("/tag/delete", handleRoute(tagDeleteRoute));

  // Add route handler
  app.use(router.routes()).use(router.allowedMethods());

  return app.listen(port);
};

if (process.env.NODE_ENV !== "test") {
  const port = config.port;
  createServer(new Db(), port);
  console.log(`Server running on :${port}`);
}
