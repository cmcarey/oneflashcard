import { observer, useLocalStore } from "mobx-react";
import React from "react";
import { useHistory } from "react-router";
import userStore from "../../stores/userStore";
import Landing from "./components/Landing";
import LoginForm from "./components/LoginForm";
import Topbar from "./components/Topbar";

export default observer(() => {
  const history = useHistory();

  const state = useLocalStore(() => ({
    loginFormOpen: false
  }));

  const toggleLogin = () => (state.loginFormOpen = !state.loginFormOpen);

  const attemptLogin = async (email: string, password: string) => {
    const err = await userStore.login(email, password);
    if (err) return "INVALID_DETAILS";
    state.loginFormOpen = false;
  };

  const goToApp = () => history.push("/app");

  return (
    <div>
      <Topbar
        loggedIn={userStore.loggedIn}
        loading={userStore.fetchingUser}
        toggleLogin={toggleLogin}
        logout={() => userStore.reset()}
        goToApp={goToApp}
      />

      {state.loginFormOpen && <LoginForm attemptLogin={attemptLogin} />}

      <Landing />
    </div>
  );
});
