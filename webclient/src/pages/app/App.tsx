import { observer } from "mobx-react";
import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";
import Topbar from "../../shared/components/Topbar";
import userStore from "../../stores/userStore";
import Viewcards from "../viewcards/Viewcards";
import Navbar from "./components/Navbar";

export default observer(() => {
  const loc = useLocation();

  const routes: { text: string; icon: string; route: string }[] = [
    { text: "View all cards", icon: "fas fa-bars", route: "/app" },
    { text: "Learn cards", icon: "fas fa-chalkboard", route: "/app/learn" }
  ];

  const logout = () => userStore.reset();

  const loadingClass = userStore.fetchingUser ? "is-loading" : "";

  return (
    <div>
      <Topbar>
        <button
          className={`button is-danger is-outlined ${loadingClass}`}
          onClick={logout}
        >
          Logout
        </button>
      </Topbar>

      <Navbar routes={routes} currRoute={loc.pathname} />

      <Switch>
        <Route exact path="/app">
          <Viewcards />
        </Route>

        <Route exact path="/app/learn">
          <div>Learn cards</div>
        </Route>

        <Route path="*">
          <Redirect to="/app" />
        </Route>
      </Switch>
    </div>
  );
});
