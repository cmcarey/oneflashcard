import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { Db } from "./interface/db";
import { IDb } from "./interface/IDb";
import { userFetchRoute, userLoginRoute } from "./routes/user";
import { buildHandler } from "./utils/route";

export const createServer = (db: IDb, port: number) => {
  // Initial setup
  const app = new Koa();
  const router = new Router();

  // Middleware
  app.use(bodyParser());

  // Add routes
  const handleRoute = buildHandler({ db });
  router.post("/login", handleRoute(userLoginRoute));
  router.get("/user", handleRoute(userFetchRoute));

  // Add route handler
  app.use(router.routes()).use(router.allowedMethods());

  return app.listen(port);
};

if (process.env.NODE_ENV !== "test") {
  createServer(new Db(), 8000);
}
