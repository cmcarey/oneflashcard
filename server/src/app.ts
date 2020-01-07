import Koa from "koa";
import Router from "koa-router";
import { IModel } from "./db/model";

export class App {
  private app: Koa;
  private router: Router;

  constructor(private model: IModel) {
    // Build HTTP server
    this.app = new Koa();
    this.router = new Router();

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
    this.router.get("/", ctx => {
      ctx.body = "hey";
      this.model.createUser("chance@carey.sh", "somepass");
    });
  }
}
