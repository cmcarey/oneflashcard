"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = () => {
    // PORT env var
    const portStr = process.env.PORT;
    if (!portStr)
        throw new Error("Missing env var PORT");
    const port = Number.parseInt(portStr);
    if (!port)
        throw new Error(`Env var PORT must be a number, received "${portStr}"`);
    // DB_HOST env var
    const db_host = process.env.DB_HOST;
    if (!db_host)
        throw new Error("Missing env var DB_HOST");
    // DB_USER env var
    const db_user = process.env.DB_USER;
    if (!db_user)
        throw new Error("Missing env var DB_USER");
    // DB_PASS env var
    const db_pass = process.env.DB_PASS;
    if (!db_pass)
        throw new Error("Missing env var DB_PASS");
    // DB_DATABASE env var
    const db_database = process.env.DB_DATABASE;
    if (!db_database)
        throw new Error("Missing env var DB_DATABASE");
    return {
        port,
        db_host,
        db_user,
        db_pass,
        db_database
    };
};
