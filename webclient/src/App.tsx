import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { NavBar } from "./Components/NavBar";
import { Notification } from "./Components/Notification";
import { TopBar } from "./Components/TopBar";
import { LearnPage } from "./Pages/LearnPage";
import { LoginPage } from "./Pages/LoginPage";
import { ViewCardsPage } from "./Pages/ViewCardsPage";
import { fetchCardsAndTags } from "./Store/Operations";
import { resetState, useSelector } from "./Store/Store";

export const App = () => {
  const loc = useLocation();
  const dispatch = useDispatch();

  const sessionKey = useSelector(state => state.appSlice.sessionKey);
  const username = useSelector(state => state.appSlice.user?.name);
  const errorMessage = useSelector(state => state.appSlice.errorMessage);
  const loading = useSelector(state => state.appSlice.apiLoading);

  const path = loc.pathname.split("/")[1];

  const logoutAction = () => dispatch(resetState());

  // If not logged in, redirect to login page
  const redirectToLogin = !username && loc.pathname !== "/login";

  // Every time location updates, fetch all cards and tags
  useEffect(() => {
    if (!sessionKey) return;
    dispatch(fetchCardsAndTags(sessionKey));
  }, [loc.pathname, dispatch, sessionKey]);

  return (
    <div>
      {redirectToLogin && <Redirect to="/login" />}
      {errorMessage && <Notification message={errorMessage} color="#ff6161" />}
      {loading && <Notification message="Loading" color="#9191ff" />}

      <TopBar username={username} logout={logoutAction} />
      {username && <NavBar path={path} />}

      <Switch>
        <Route exact path="/learn">
          <LearnPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/">
          <ViewCardsPage />
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};
