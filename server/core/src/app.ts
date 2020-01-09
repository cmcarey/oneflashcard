import Koa from "koa";
import bodyParser from "koa-bodyparser";
import KoaLogger from "koa-logger";
import Router from "koa-router";
import { IModel } from "./db/model";
import {
  CreateSessionRoute,
  DeleteSessionsRoute,
  GetSessionsRoute
} from "./routes/session";
import { CreateUserRoute } from "./routes/user";
import { handleRoute, RouteHandler } from "./routes/utils";

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
    const build = (
      routeHandler: RouteHandler
    ): ((ctx: any) => Promise<void>) => {
      return handleRoute(this.router, this.model, routeHandler);
    };

    this.router.post("/user/create", build(new CreateUserRoute()));
    this.router.post("/user/login", build(new CreateSessionRoute()));

    this.router.get("/sessions", build(new GetSessionsRoute()));
    this.router.post("/sessions/delete", build(new DeleteSessionsRoute()));
  }
}
