import { observer } from "mobx-react";
import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";
import Topbar from "../../shared/components/Topbar";
import userStore from "../../stores/userStore";
import Managetags from "../managetags/Managetags";
import Viewcards from "../viewcards/Viewcards";
import LogoutButton from "./components/LogoutButton";
import Navbar from "./components/Navbar";
import SPageGrid from "./components/SPageGrid";

export default observer(() => {
  const loc = useLocation();

  const routes: { text: string; icon: string; route: string }[] = [
    { text: "View all cards", icon: "fas fa-bars", route: "/app" },
    { text: "Learn cards", icon: "fas fa-chalkboard", route: "/app/learn" },
    { text: "Manage tags", icon: "fas fa-tags", route: "/app/tags" }
  ];

  const logout = () => userStore.reset();

  return (
    <div>
      <Topbar>
        <LogoutButton isLoading={userStore.fetchingUser} logout={logout} />
      </Topbar>

      <SPageGrid>
        <Navbar routes={routes} currRoute={loc.pathname} />

        <Switch>
          <Route exact path="/app">
            <Viewcards />
          </Route>

          <Route exact path="/app/learn">
            <div>Learn cards</div>
          </Route>

          <Route exact path="/app/tags">
            <Managetags />
          </Route>

          <Route path="*">
            <Redirect to="/app" />
          </Route>
        </Switch>
      </SPageGrid>
    </div>
  );
});
