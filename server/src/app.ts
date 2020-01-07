import Joi from "@hapi/joi";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { EmailInUseError, IModel } from "./db/model";

export class App {
  private app: Koa;
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
    this.router.post("/user/create", async ctx => {
      const schema = Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(8)
          .required()
      });

      const vd = schema.validate(ctx.request.body);
      if (vd.error) {
        ctx.status = 400;
        ctx.body = { error: vd.error.message };
        return;
      }

      try {
        this.model.createUser(vd.value.email, vd.value.password);
        ctx.status = 200;
      } catch (e) {
        if (e instanceof EmailInUseError) {
          ctx.status = 400;
          ctx.body = { error: e.message };
        } else {
          ctx.status = 500;
        }
      }
    });
  }
}
