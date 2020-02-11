"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const v4_1 = __importDefault(require("uuid/v4"));
const route_1 = require("../utils/route");
exports.userLoginRoute = {
    requireAuth: false,
    validation: joi_1.default.object({
        email: joi_1.default.string()
            .email()
            .required(),
        password: joi_1.default.string().required()
    }),
    handle: async (ctx, koaCtx) => {
        // Fetch user given email
        const user = await ctx.db.getUserByEmail(koaCtx.request.body.email);
        if (!user) {
            // User does not exist
            throw new route_1.RouteError("BAD_EMAIL");
        }
        // Verify password matches
        const passMatch = bcryptjs_1.default.compareSync(koaCtx.request.body.password, user.password);
        if (!passMatch) {
            // Password does not match
            throw new route_1.RouteError("BAD_PASSWORD");
        }
        // Generate session
        const session = await ctx.db.createSession(user.user_id, v4_1.default());
        koaCtx.body = {
            user: { user_id: user.user_id, email: user.email },
            sessionKey: session.key
        };
    }
};
exports.userFetchRoute = {
    requireAuth: true,
    validation: undefined,
    handle: async (ctx, koaCtx) => {
        // Get user from user_id
        const user = await ctx.db.getUserByUserID(koaCtx.user_id);
        if (!user)
            throw new Error(`Unable to locate user with ID ${koaCtx.user_id}`);
        // Return user
        koaCtx.body = { user: { user_id: user.user_id, email: user.email } };
    }
};
