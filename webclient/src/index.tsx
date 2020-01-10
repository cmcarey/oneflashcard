import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import { GlobalStyle } from "./ui";

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
