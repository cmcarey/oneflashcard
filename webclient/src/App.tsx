import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { CardEditorController } from "./Components/CardEditor/CardEditorController";
import { LearnPage } from "./Components/LearnPage/LearnPage";
import { LoginController } from "./Components/LoginPage/LoginController";
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
  const editingCard =
    useSelector(state => state.appSlice.editingCard) !== undefined;

  // Current path, used for indicating which navbar item to show as selected
  const path = loc.pathname.split("/")[1];
  // Action to logout user and reset application state
  const logoutAction = () => dispatch(actions.resetState());
  // Indicate whether we should redirect to the login page
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

      {editingCard && <CardEditorController />}

      <Switch>
        <Route exact path="/">
          <ViewController />
        </Route>

        <Route exact path="/learn">
          <LearnPage />
        </Route>

        <Route exact path="/login">
          <LoginController />
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};
