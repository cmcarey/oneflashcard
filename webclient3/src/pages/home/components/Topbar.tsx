import { observer } from "mobx-react";
import React from "react";
import Topbar from "../../../shared/components/Topbar";

type Props = {
  loggedIn: boolean;
  loading: boolean;
  toggleLogin: () => void;
  logout: () => void;
  goToApp: () => void;
};

export default observer((props: Props) => {
  return (
    <Topbar>
      <div className="buttons has-addons">
        {props.loggedIn ? (
          <>
            <button className="button" onClick={props.goToApp}>
              Go to app
            </button>
            <button className="button" onClick={props.logout}>
              Logout
            </button>
          </>
        ) : !props.loading ? (
          <button className="button" onClick={props.toggleLogin}>
            Login
          </button>
        ) : (
          <button className="button is-loading">Loading</button>
        )}
      </div>
    </Topbar>
  );
});
