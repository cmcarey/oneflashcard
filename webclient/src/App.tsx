import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { LearnPage } from "./Components/LearnPage/LearnPage";
import { LoginPage } from "./Components/LoginPage/LoginController";
import { TopBar } from "./Components/Shared/Header";
import { NavBar } from "./Components/Shared/Navbar";
import { Notification } from "./Components/Shared/Notification";
import { ViewController } from "./Components/ViewPage/ViewController";
import { operations } from "./Store/Operations";
import { actions, useSelector } from "./Store/Store";

export const App = () => {
  const loc = useLocation();
  const dispatch = useDispatch();

  const sessionKey = useSelector(state => state.appSlice.sessionKey);
  const username = useSelector(state => state.appSlice.user?.name);
  const errorMessage = useSelector(state => state.appSlice.errorMessage);
  const loading = useSelector(state => state.appSlice.apiLoading);

  const path = loc.pathname.split("/")[1];

  const logoutAction = () => dispatch(actions.resetState());

  // If not logged in, redirect to login page
  const redirectToLogin = !username && loc.pathname !== "/login";

  // Every time location updates, fetch all cards and tags
  useEffect(() => {
    if (!sessionKey) return;
    dispatch(operations.fetchCardsAndTags(sessionKey));
  }, [loc.pathname, dispatch, sessionKey]);

  return (
    <div>
      {redirectToLogin && <Redirect to="/login" />}
      {errorMessage && <Notification message={errorMessage} color="#ff6161" />}
      {loading && <Notification message="Loading" color="#9191ff" />}

      <TopBar username={username} logout={logoutAction} />
      {username && <NavBar path={path} />}

      <Switch>
        <Route exact path="/">
          <ViewController />
        </Route>

        <Route exact path="/learn">
          <LearnPage />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};
