"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const config_1 = require("./config");
const db_1 = require("./interface/db");
const card_1 = require("./routes/card");
const tag_1 = require("./routes/tag");
const user_1 = require("./routes/user");
const route_1 = require("./utils/route");
exports.createServer = (db, port) => {
    // Initial setup
    const app = new koa_1.default();
    const router = new koa_router_1.default();
    // Middleware
    app.use(koa_bodyparser_1.default());
    // Construct dependency injector
    const handleRoute = route_1.buildHandler({ db });
    // Add routes
    // User routes
    router.post("/login", handleRoute(user_1.userLoginRoute));
    router.get("/user", handleRoute(user_1.userFetchRoute));
    // Card routes
    router.get("/card", handleRoute(card_1.cardFetchFoute));
    router.post("/card/new", handleRoute(card_1.cardCreateRoute));
    router.post("/card/update", handleRoute(card_1.cardUpdateRoute));
    router.post("/card/delete", handleRoute(card_1.cardDeleteRoute));
    // Tag routes
    router.get("/tag", handleRoute(tag_1.tagFetchRoute));
    router.post("/tag/new", handleRoute(tag_1.tagCreateRoute));
    router.post("/tag/update", handleRoute(tag_1.tagUpdateRoute));
    router.post("/tag/delete", handleRoute(tag_1.tagDeleteRoute));
    // Add route handler
    app.use(router.routes()).use(router.allowedMethods());
    return app.listen(port);
};
if (process.env.NODE_ENV !== "test") {
    const config = config_1.getConfig();
    const port = config.port;
    exports.createServer(new db_1.Db(config), port);
    console.log(`Server running on :${port}`);
}
