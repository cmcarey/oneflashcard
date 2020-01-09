import Koa from "koa";
import bodyParser from "koa-bodyparser";
import KoaLogger from "koa-logger";
import Router from "koa-router";
import { IModel } from "./db/model";
import { CreateCardRoute, GetCardsRoute } from "./routes/card";
import { CreateCardTagRoute, GetCardTagsRoute } from "./routes/cardtag";
import {
  CreateSessionRoute,
  DeleteSessionsRoute,
  GetSessionsRoute
} from "./routes/session";
import { CreateUserRoute } from "./routes/user";
import { RouteHandler } from "./routes/utils";

export class App {
  public app: Koa;
  private router: Router;

  constructor(private model: IModel) {
    // Build HTTP server
    this.app = new Koa();
    this.router = new Router();
    // Setup body parsing
    this.app.use(bodyParser());
    // Add logger
    this.app.use(KoaLogger());
    // Register routes
    this.registerRoutes();
    // Register router with koa
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
  }

  public start(port: number) {
    // Listen
    return this.app.listen(port);
  }

  private registerRoutes() {
    const build = (routeHandler: RouteHandler) => async (ctx: any) => {
      await routeHandler.run(ctx);
    };

    type Route = ["post" | "get", string, RouteHandler];
    const routes: Route[] = [
      // USER ROUTES
      ["post", "/user/create", new CreateUserRoute(this.router, this.model)],

      // SESSION ROUTES
      [
        "post",
        "/session/login",
        new CreateSessionRoute(this.router, this.model)
      ],
      ["get", "/session", new GetSessionsRoute(this.router, this.model)],
      [
        "post",
        "/session/delete",
        new DeleteSessionsRoute(this.router, this.model)
      ],

      // CARD ROUTES
      ["post", "/card", new CreateCardRoute(this.router, this.model)],
      ["get", "/card", new GetCardsRoute(this.router, this.model)],

      // CARD TAG ROUTES
      ["post", "/cardtag", new CreateCardTagRoute(this.router, this.model)],
      ["get", "/cardtag", new GetCardTagsRoute(this.router, this.model)]
    ];

    routes.forEach(r => this.router[r[0]](r[1], build(r[2])));
  }
}
