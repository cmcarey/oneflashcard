import bcrypt from "bcryptjs";
import Joi from "joi";
import uuidv4 from "uuid/v4";
import { RouteError, RouteHandler } from "../utils/route";

export const userLoginRoute: RouteHandler = {
  requireAuth: false,
  validation: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }),

  handle: async (ctx, koaCtx) => {
    // Fetch user given email
    const user = await ctx.db.getUserByEmail(koaCtx.request.body.email);
    if (!user) {
      // User does not exist
      throw new RouteError("BAD_EMAIL");
    }

    // Verify password matches
    const passMatch = bcrypt.compareSync(
      koaCtx.request.body.password,
      user.password
    );
    if (!passMatch) {
      // Password does not match
      throw new RouteError("BAD_PASSWORD");
    }

    // Generate session
    const session = await ctx.db.createSession(user.user_id, uuidv4());
    koaCtx.body = {
      user: { userID: user.user_id, email: user.email },
      sessionKey: session.key
    };
  }
};

export const userFetchRoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async (ctx, koaCtx) => {
    // Get user from userID
    const user = await ctx.db.getUserByUserID(koaCtx.userID);
    if (!user)
      throw new Error(`Unable to locate user with ID ${koaCtx.userID}`);

    // Return user
    koaCtx.body = { user: { userID: user.user_id, email: user.email } };
  }
};
