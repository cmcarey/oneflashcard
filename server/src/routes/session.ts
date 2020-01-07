import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import { IModel } from "../db/model";
import { HandledError, RouteHandler } from "./utils";
import Router = require("koa-router");

export class CreateSessionRoute implements RouteHandler {
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

      // Validate password matches
      const match = await bcrypt.compare(vr.password, user.hashedPassword);
      if (!match) throw new Error();
    } catch (e) {
      throw new HandledError("Bad login details");
    }

    // Create session and return session ID
    const sessionKey = await m.createSession(userID, vr.deviceName);
    c.body = { sessionKey };
  }
}

export class GetSessionsRoute implements RouteHandler {
  public requireAuth = true;

  public async handle(r: Router, m: IModel, c: any, vr: any) {
    // Get and return all user sessions
    const sessions = m.getSessions(c.userID);
    c.body = { sessions };
  }
}
