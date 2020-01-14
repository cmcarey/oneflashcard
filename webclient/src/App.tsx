import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { CardEditorContainer } from "./Components/CardEditPage/CardEditContainer";
import { LearnPage } from "./Components/LearnPage/LearnPage";
import { LoginContainer } from "./Components/LoginPage/LoginContainer";
import { TopBar } from "./Components/Shared/Header";
import { NavBar } from "./Components/Shared/Navbar";
import { Notification } from "./Components/Shared/Notification";
import { ViewContainer } from "./Components/ViewPage/ViewContainer";
import { operations } from "./Store/Operations";
import { AppActions, useSelector } from "./Store/Store";

export const App = () => {
  const loc = useLocation();
  const dispatch = useDispatch();

  const sessionKey = useSelector(state => state.App.sessionKey);
  const username = useSelector(state => state.App.user?.name);
  const errorMessage = useSelector(state => state.App.errorMessage);
  const apiCallsInProgress = useSelector(state => state.App.apiCallsInProgress);

  // Current path, used for indicating which navbar item to show as selected
  const path = loc.pathname.split("/")[1];
  // Action to logout user and reset application state
  const logoutAction = () => dispatch(AppActions.resetState());

  // Indicate whether we should redirect to the login page
  const redirectToLogin =
    apiCallsInProgress === 0 && !username && loc.pathname !== "/login";

  // Every time location updates, fetch all cards and tags
  useEffect(() => {
    if (!sessionKey) return;
    dispatch(operations.fetchCardsAndTags(sessionKey));
  }, [loc.pathname, dispatch, sessionKey]);

  if (redirectToLogin) return <Redirect to="/login" />;

  return (
    <div>
      {errorMessage && <Notification message={errorMessage} color="#ff6161" />}

      <TopBar username={username} logout={logoutAction} />
      {username && <NavBar path={path} />}

      <Switch>
        <Route exact path="/">
          <ViewContainer />
        </Route>
        <Route exact path="/learn">
          <LearnPage />
        </Route>
        <Route exact path="/login">
          <LoginContainer />
        </Route>
        <Route exact path={["/edit/card/:cardID", "/edit/card"]}>
          <CardEditorContainer />
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};
