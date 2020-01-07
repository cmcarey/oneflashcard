import { App } from "./app";
import { PGModel } from "./db/model";
import { createPGConnection } from "./db/pg";

// Build model
const model = new PGModel(createPGConnection());
// Create app
const app = new App(model);
// Start app
app.start(3000);
