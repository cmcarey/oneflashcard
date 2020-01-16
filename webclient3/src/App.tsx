import { observer } from "mobx-react";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home/Home";

export default observer(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});
