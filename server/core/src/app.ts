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
    this.router.post(
      "/user/create",
      async (ctx: any) =>
        await new CreateUserRoute(this.router, this.model).run(ctx)
    );
    this.router.post(
      "/user/login",
      async (ctx: any) =>
        await new CreateSessionRoute(this.router, this.model).run(ctx)
    );

    this.router.get(
      "/sessions",
      async (ctx: any) =>
        await new GetSessionsRoute(this.router, this.model).run(ctx)
    );
    this.router.post(
      "/sessions/delete",
      async (ctx: any) =>
        await new DeleteSessionsRoute(this.router, this.model).run(ctx)
    );
  }
}
