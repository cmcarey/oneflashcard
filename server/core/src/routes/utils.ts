import Router = require("koa-router");
import Joi from "@hapi/joi";
import { IModel } from "../db/model";

export interface RouteHandler {
  schema?: Joi.ObjectSchema;
  requireAuth?: boolean;
  handle(
    router: Router,
    model: IModel,
    ctx: any,
    validated: Joi.ValidationResult
  ): Promise<void>;
}

export class HandledError extends Error {
  constructor(errString: string) {
    super(errString);
  }
}

export const handleRoute = (
  router: Router,
  model: IModel,
  handler: RouteHandler
) => async (ctx: any) => {
  // Validate request body
  let validatedValue: any;
  if (handler.schema) {
    // Run Joi validation
    const validated = handler.schema.validate(ctx.request.body);
    // If error return with validation error
    if (validated.error) {
      ctx.status = 400;
      ctx.body = { error: validated.error.message };
      return;
    }
    // Else store validation result
    validatedValue = validated.value;
  }

  // Check authentication
  if (handler.requireAuth) {
    // Get session key from header
    const key = ctx.request.get("Authorization");
    // Get session
    try {
      // Store
      const session = await model.getSession(key);
      if (!session) throw new Error();
      ctx.userID = session.userID;
    } catch (e) {
      // Indicate forced logout
      ctx.status = 400;
      ctx.body = { error: "Invalid session key" };
      return;
    }
  }

  try {
    // Default status 200
    ctx.status = 200;
    ctx.body = "";
    // Perform request
    const res = await handler.handle(router, model, ctx, validatedValue);
    // Return result if any
    return res;
  } catch (e) {
    if (e instanceof HandledError) {
      // If HandledError set status to 400 and indicate error message
      ctx.status = 400;
      ctx.body = { error: e.message };
    } else {
      console.error(e);
      // Else indicate internal error
      ctx.status = 500;
    }
  }
};
