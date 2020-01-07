import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import { IModel } from "../db/model";
import { HandledError, RouteHandler } from "./utils";
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

  public async handle(r: Router, m: IModel, c: any, vr: any) {
    const hashedPassword = await bcrypt.hash(vr.password, 10);

    try {
      await m.createUser(vr.email, hashedPassword);
    } catch (e) {
      throw new HandledError("Email address is in use");
    }
  }
}
