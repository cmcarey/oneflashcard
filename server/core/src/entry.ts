import { App } from "./app";
import { createPGConnection, PGModel } from "./db/pg";

// Build model
const model = new PGModel(createPGConnection());
// Create app
const app = new App(model);
// Start app
app.start(3000);
// Indicate
console.log(":: SERVER STARTED");
