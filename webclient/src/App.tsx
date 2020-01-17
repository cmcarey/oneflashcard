import { observer } from "mobx-react";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import App from "./pages/app/App";
import HomePage from "./pages/home/Home";
import userStore from "./stores/userStore";

export default observer(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/app">
          {!userStore.fetchingUser && !userStore.loggedIn ? (
            <Redirect to="/" />
          ) : (
            <App />
          )}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});
