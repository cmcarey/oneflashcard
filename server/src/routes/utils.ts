import Router = require("koa-router");
import Joi from "@hapi/joi";
import { IModel } from "../db/model";

export interface RouteHandler {
  schema?: Joi.ObjectSchema;
  requireAuth?: boolean;
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
      ctx.userID = (await m.getSession(key)).userID;
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
    // Perform request
    const res = await handler.handle(r, m, ctx, validatedValue);
    // Return result if any
    return res;
  } catch (e) {
    if (e instanceof HandledError) {
      // If HandledError set status to 400 and indicate error message
      ctx.status = 400;
      ctx.body = { error: e.message };
    } else {
      // Else indicate internal error
      ctx.status = 500;
    }
  }
};
