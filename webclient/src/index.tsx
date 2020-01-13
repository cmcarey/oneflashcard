import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Api } from "./Interface/Api";
import "./Resources/index.css";
import { store } from "./Store/Store";
import { MockApi } from "./Test/Api";
import { GlobalStyle } from "./ui";

// TODO Determine when testing or not
const testing = true;
export const api = testing ? new MockApi() : new Api();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
