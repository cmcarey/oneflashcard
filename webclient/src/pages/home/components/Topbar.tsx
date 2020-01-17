import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
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
      {props.loggedIn ? (
        <div className="buttons has-addons">
          <SButton onClick={props.goToApp}>Go to app</SButton>
          <SButton onClick={props.logout}>Logout</SButton>
        </div>
      ) : !props.loading ? (
        <button className="button" onClick={props.toggleLogin}>
          Login
        </button>
      ) : (
        <button className="button is-loading">Loading</button>
      )}
    </Topbar>
  );
});

const SButton = styled.button.attrs({ className: "button" })`
  flex-grow: 1;
`;
