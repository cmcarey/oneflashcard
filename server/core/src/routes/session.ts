import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Router from "koa-router";
import { IModel } from "../db/model";
import { HandledError, RouteHandler } from "./utils";

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

  public async handle(router: Router, model: IModel, ctx: any, validated: any) {
    // Attempt login
    const user = await model.getUser(validated.email);
    if (!user) throw new HandledError("Bad login details");
    const userID = user.userID;

    // Validate password matches
    const match = await bcrypt.compare(validated.password, user.hashedPassword);
    if (!match) throw new HandledError("Bad login details");

    // Create session and return session key
    const sessionKey = crypto.randomBytes(40).toString("hex");
    await model.createSession(userID, sessionKey, validated.deviceName);
    ctx.body = { sessionKey };
  }
}

export class GetSessionsRoute implements RouteHandler {
  public requireAuth = true;

  public async handle(router: Router, model: IModel, ctx: any, validated: any) {
    // Get and return all user sessions
    const sessions = await model.getSessions(ctx.userID);
    ctx.body = { sessions };
  }
}

export class DeleteSessionsRoute implements RouteHandler {
  public requireAuth = true;

  public schema = Joi.object({
    sessionID: Joi.number().required()
  });

  public async handle(router: Router, model: IModel, ctx: any, validated: any) {
    // Get user sessions
    const sessions = await model.getSessions(ctx.userID);
    // Check session ID belongs to this user
    let belongs = false;

    for (const session of sessions) {
      if (session.sessionID === validated.sessionID) {
        belongs = true;
        break;
      }
    }

    if (!belongs) throw new HandledError("Unable to delete session");
    // Delete session
    await model.deleteSession(validated.sessionID);
  }
}
