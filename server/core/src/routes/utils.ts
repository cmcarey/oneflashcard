import Router = require("koa-router");
import { IModel } from "../db/model";

export class HandledError extends Error {
  constructor(errString: string) {
    super(errString);
  }
}

export abstract class RouteHandler {
  protected ctx: any;
  protected body: any;
  constructor(protected router: Router, protected model: IModel) {}

  protected async requireAuth() {
    // Get session key from header
    const key = this.ctx.request.get("Authorization");
    // Get session
    const session = await this.model.getSessionByKey(key);
    if (!session) throw new HandledError("Invalid session key");
    // Set userID in context
    this.ctx.userID = session.userID;
  }

  protected validate(schema: any) {
    // Run Joi validation
    const validated = schema.validate(this.ctx.request.body);
    // If error return with validation error
    if (validated.error) throw new HandledError(validated.error.message);
    this.body = validated.value;
  }

  async run(ctx: any) {
    this.ctx = ctx;
    this.body = this.ctx.request.body;
    ctx.status = 200;
    ctx.body = "";

    try {
      await this.handle();
    } catch (e) {
      if (e instanceof HandledError) {
        // Handled error
        ctx.status = 400;
        ctx.body = { error: e.message };
      } else {
        // Internal error
        console.error(e);
        ctx.status = 500;
      }
    }
  }

  protected abstract async handle(): Promise<void>;
}
