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

  public async handle(r: Router, m: IModel, c: any, vr: any) {
    const hashedPassword = await bcrypt.hash(vr.password, 10);

    try {
      await m.createUser(vr.email, hashedPassword);
    } catch (e) {
      throw new HandledError("EMAIL_IN_USE");
    }
  }
}

export class LoginRoute implements RouteHandler {
  public schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    deviceName: Joi.string().required()
  });

  public async handle(r: Router, m: IModel, c: any, vr: any) {
    let userID: string;

    // Attempt login
    try {
      const user = await m.getUser(vr.email);
      userID = user.userID;

      const match = await bcrypt.compare(vr.password, user.hashedPassword);
      if (!match) throw new Error();
    } catch (e) {
      throw new HandledError("BAD_DETAILS");
    }

    // Create session and return session ID
    const sessionID = await m.createSession(userID, vr.deviceName);
    c.body = { sessionID };
  }
}
