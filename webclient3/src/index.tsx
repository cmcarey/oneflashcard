import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import userStore from "./stores/userStore";

// Restore session
const key = localStorage.getItem("sessionKey");
if (key) userStore.restore(key);

ReactDOM.render(<App />, document.getElementById("root"));
