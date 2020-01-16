import { observer, useLocalStore } from "mobx-react";
import React from "react";
import userStore from "../../stores/userStore";
import LoginForm from "./components/LoginForm";
import Topbar from "./components/Topbar";

export default observer(() => {
  const state = useLocalStore(() => ({
    loginFormOpen: false
  }));

  const toggleLogin = () => (state.loginFormOpen = !state.loginFormOpen);

  const attemptLogin = async (email: string, password: string) => {
    const err = await userStore.login(email, password);
    if (err) return err;
    state.loginFormOpen = false;
  };

  return (
    <div>
      <Topbar
        loggedIn={userStore.loggedIn}
        loading={userStore.fetchingUser}
        toggleLogin={toggleLogin}
        logout={() => userStore.logout()}
      />

      {state.loginFormOpen && <LoginForm attemptLogin={attemptLogin} />}

      <div>Home content</div>
    </div>
  );
});
