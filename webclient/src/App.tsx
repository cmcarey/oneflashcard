import React from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";
import { NavBar } from "./Components/NavBar";
import { TopBar } from "./Components/TopBar";
import { LearnPage } from "./Pages/LearnPage";
import { LoginPage } from "./Pages/LoginPage";
import { ViewCardsPage } from "./Pages/ViewCardsPage";
import { useSelector } from "./Store/Store";

export const App = () => {
  const loc = useLocation();
  const history = useHistory();

  const username = useSelector(state => state.appSlice.user?.username);

  // If not logged in, redirect to login page
  if (!username && loc.pathname !== "/login") history.push("/login");

  return (
    <div>
      <TopBar username={username} />
      {username && <NavBar />}

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

      {/* <Body>
        <Centered>
          <BodyBar>
            <BodyTitle>Viewing all cards</BodyTitle>
            <BodyBarAction>Add card</BodyBarAction>
          </BodyBar>
          <Cards cards={new Server().getCards()}/>
        </Centered>
      </Body> */}
    </div>
  );
};
