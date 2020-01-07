import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import { IModel } from "../db/model";
import { HandledError, RouteHandler } from "./router_utils";
import Router = require("koa-router");

export class CreateUserRoute implements RouteHandler {
  public schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  public async handle(r: Router, m: IModel, c: any, vr: Joi.ValidationResult) {
    const hashedPassword = await bcrypt.hash(vr.value.password, 10);

    try {
      m.createUser(vr.value.email, hashedPassword);
    } catch (e) {
      throw new HandledError("EMAIL_IN_USE");
    }
  }
}
