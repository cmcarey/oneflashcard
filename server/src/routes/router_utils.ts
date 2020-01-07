import Router = require("koa-router");
import Joi from "@hapi/joi";
import { IModel } from "../db/model";

export interface RouteHandler {
  schema: Joi.ObjectSchema;
  handle(r: Router, m: IModel, c: any, vr: Joi.ValidationResult): Promise<void>;
}

export class HandledError extends Error {
  constructor(s: string) {
    super(s);
  }
}

export const handleRoute = (
  r: Router,
  m: IModel,
  handler: RouteHandler
) => async (ctx: any) => {
  const validated = handler.schema.validate(ctx.request.body);

  if (validated.error) {
    ctx.status = 400;
    ctx.body = { error: validated.error.message };
    return;
  }

  try {
    ctx.status = 200;
    const res = await handler.handle(r, m, ctx, validated.value);
    return res;
  } catch (e) {
    if (e instanceof HandledError) {
      ctx.status = 400;
      ctx.body = { error: e.message };
    } else {
      ctx.status = 500;
    }
  }
};
