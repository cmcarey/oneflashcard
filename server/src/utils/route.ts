import Joi from "joi";
import Koa from "koa";
import { IDb } from "../interface/IDb";

type Context = Koa.Context & { db: IDb };

export type RouteHandler = {
  requireAuth: boolean;
  validation: Joi.Schema | void;
  handle: (ctx: Context) => Promise<void>;
};

export class RouteError extends Error {
  constructor(s: string) {
    super(s);
  }
}

export const buildHandler = (db: IDb) => (route: RouteHandler) => async (
  ctx: Koa.Context
) => {
  if (route.requireAuth) {
    // TODO Perform authentication
    // On succcess, set ctx.userID
    // On fail, return 400 BAD_SESSION_KEY
  }

  if (route.validation) {
    // Perform validation
    const res = route.validation.validate(ctx.request.body);

    if (!res.error) {
      // On success, override ctx.request.body to validation
      //  result (in case of conversions)
      ctx.request.body = res.value;
    } else {
      // On fail, return 400 BAD_REQUEST_BODY
      ctx.status = 400;
      ctx.body = "BAD_REQUEST_BODY";
      return;
    }
  }

  // By default response type is 200
  ctx.status = 200;
  try {
    await route.handle({ ...ctx, db });
  } catch (e) {
    if (e instanceof RouteError) {
      // Handled error; display message
      ctx.status = 400;
      ctx.body = e.message;
    } else {
      // Unhandled internal error
      ctx.status = 500;
      console.error(e);
    }
  }
};
