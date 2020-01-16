import { observer, useLocalStore } from "mobx-react";
import React from "react";
import Topbar from "../../shared/components/Topbar";
import userStore from "../../stores/userStore";

export default observer(() => {
  const state = useLocalStore(() => ({
    openLogin() {},

    openRegister() {}
  }));

  return (
    <div>
      <Topbar
        loading={userStore.fetchingUser}
        openLogin={state.openLogin}
        openRegister={state.openRegister}
      />
    </div>
  );
});
