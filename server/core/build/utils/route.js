"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteError extends Error {
    constructor(s) {
        super(s);
    }
}
exports.RouteError = RouteError;
exports.buildHandler = (ctx) => (route) => async (koaCtx) => {
    if (route.requireAuth) {
        // Perform authentication check
        // On succcess, set koaCTX.user_id
        // On fail, return 400 BAD_SESSION_KEY
        const authErr = () => {
            koaCtx.status = 400;
            koaCtx.body = "BAD_SESSION_KEY";
        };
        const authHeader = koaCtx.get("Authorization");
        const [left, right] = authHeader.split(" ");
        if (left !== "Bearer") {
            // Malformed header
            authErr();
            return;
        }
        const session = await ctx.db.getSessionByKey(right);
        if (!session) {
            // Unable to locate session
            authErr();
            return;
        }
        // Located, set userID
        koaCtx.user_id = session.user_id;
    }
    if (route.validation) {
        // Perform validation
        const res = route.validation.validate(koaCtx.request.body);
        if (!res.error) {
            // On success, override ctx.request.body to validation
            //  result (in case of conversions)
            koaCtx.request.body = res.value;
        }
        else {
            // On fail, return 400 BAD_REQUEST_BODY
            koaCtx.status = 400;
            koaCtx.body = "BAD_REQUEST_BODY";
            return;
        }
    }
    // By default response type is 200
    koaCtx.status = 200;
    koaCtx.body = "";
    try {
        await route.handle(ctx, koaCtx);
    }
    catch (e) {
        if (e instanceof RouteError) {
            // Handled error; display message
            koaCtx.status = 400;
            koaCtx.body = e.message;
        }
        else {
            // Unhandled internal error
            koaCtx.status = 500;
            // TODO Do something with this error (sentry?)
            console.error(e);
        }
    }
};
