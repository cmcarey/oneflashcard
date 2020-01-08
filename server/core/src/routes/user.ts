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
    // Check if user already registered
    const user = await m.getUser(vr.email);
    if (user) throw new HandledError("Email address is in use");
    // Hash password
    const hashedPassword = await bcrypt.hash(vr.password, 10);
    // Create user
    await m.createUser(vr.email, hashedPassword);
  }
}
