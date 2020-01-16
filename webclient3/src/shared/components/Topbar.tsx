import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export default observer(
  (props: {
    loading: boolean;
    openLogin: () => void;
    openRegister: () => void;
  }) => {
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
                  {!props.loading ? (
                    <>
                      <button className="button" onClick={props.openLogin}>
                        Login
                      </button>
                      <button className="button" onClick={props.openRegister}>
                        Register
                      </button>
                    </>
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
  }
);

const SBar = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e1e1e1;
`;
