import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { propMatches } from "../db/utils";
import { HandledError, RouteHandler } from "./utils";

export class CreateSessionRoute extends RouteHandler {
  protected async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(8)
          .required(),
        deviceName: Joi.string().required()
      })
    );

    // Attempt login
    const user = await this.model.getUser(this.body.email);
    if (!user) throw new HandledError("Bad login details");
    const userID = user.userID;

    // Validate password matches
    const match = await bcrypt.compare(this.body.password, user.hashedPassword);
    if (!match) throw new HandledError("Bad login details");

    // Create session and return session key
    const sessionKey = crypto.randomBytes(40).toString("hex");
    await this.model.createSession(userID, sessionKey, this.body.deviceName);
    this.ctx.body = { sessionKey };
  }
}

export class GetSessionsRoute extends RouteHandler {
  protected async handle() {
    // Require auth
    await this.requireAuth();

    // Get and return all user sessions
    const sessions = (
      await this.model.getSessionsByUserID(this.ctx.userID)
    ).map(session => ({
      deviceName: session.deviceName,
      sessionID: session.sessionID
    }));
    this.ctx.body = { sessions };
  }
}

export class DeleteSessionsRoute extends RouteHandler {
  protected async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        sessionID: Joi.string().required()
      })
    );
    // Require auth
    await this.requireAuth();

    // Get user sessions
    const sessions = await this.model.getSessionsByUserID(this.ctx.userID);
    // Check session ID belongs to this user
    if (!propMatches(sessions, "sessionID", this.body.sessionID))
      throw new HandledError("Invalid sessionID");
    // Delete session
    await this.model.deleteSession(this.body.sessionID);
  }
}
