import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { Db } from "./interface/db";
import { IDb } from "./interface/IDb";
import {
  cardCreateRoute,
  cardDeleteRoute,
  cardFetchFoute,
  cardUpdateRoute
} from "./routes/card";
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

  // Add route handler
  app.use(router.routes()).use(router.allowedMethods());

  return app.listen(port);
};

if (process.env.NODE_ENV !== "test") {
  createServer(new Db(), 8000);
}