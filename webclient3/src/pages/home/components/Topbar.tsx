import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../assets/logo.svg";

type Props = {
  loggedIn: boolean;
  loading: boolean;
  toggleLogin: () => void;
  logout: () => void;
};

export default observer((props: Props) => {
  return (
    <SBar>
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <Logo height="50px" width={undefined} />
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <div className="buttons has-addons">
                {props.loggedIn ? (
                  <>
                    <button className="button">Go to app</button>
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
            </div>
          </div>
        </div>
      </div>
    </SBar>
  );
});

const SBar = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e1e1e1;
`;
