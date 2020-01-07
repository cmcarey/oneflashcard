import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { IModel } from "./db/model";
import { CreateSessionRoute, GetSessionsRoute } from "./routes/session";
import { CreateUserRoute } from "./routes/user";
import { handleRoute } from "./routes/utils";

export class App {
  public app: Koa;
  private router: Router;

  constructor(private model: IModel) {
    // Build HTTP server
    this.app = new Koa();
    this.router = new Router();
    // Setup body parsing
    this.app.use(bodyParser());
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
    const r = this.router;
    const m = this.model;
    const h = handleRoute;

    r.post("/user/create", h(r, m, new CreateUserRoute()));
    r.post("/user/login", h(r, m, new CreateSessionRoute()));
    r.get("/sessions", h(r, m, new GetSessionsRoute()));
  }
}
