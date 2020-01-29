import Joi from "joi";
import { RouteHandler } from "../utils/route";

export const userLoginRoute: RouteHandler = {
  requireAuth: false,
  validation: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }),

  handle: async ctx => {
    ctx.body = "login";
  }
};

export const userFetchRoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async ctx => {
    ctx.body = "user";
  }
};
