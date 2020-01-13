import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Api } from "./Interface/Api";
import "./Resources/index.css";
import { fetchUserOp } from "./Store/Operations";
import { store } from "./Store/Store";
import { MockApi } from "./Test/Api";
import { GlobalStyle } from "./ui";

// TODO Determine when testing or not
const testing = true;
export const api = testing ? new MockApi() : new Api();

// Check if session key is already set - if it is, initiate user fetch
const sessionKey = localStorage.getItem("sessionKey");
if (sessionKey) store.dispatch(fetchUserOp(sessionKey));

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
