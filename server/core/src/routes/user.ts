import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import { HandledError, RouteHandler } from "./utils";
import Router = require("koa-router");

export class CreateUserRoute extends RouteHandler {
  public async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(8)
          .required()
      })
    );

    // Check if user already registered
    const user = await this.model.getUser(this.body.email);
    if (user) throw new HandledError("Email address is in use");
    // Hash password
    const hashedPassword = await bcrypt.hash(this.body.password, 10);
    // Create user
    await this.model.createUser(this.body.email, hashedPassword);
  }
}
