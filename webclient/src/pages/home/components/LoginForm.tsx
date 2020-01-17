import { observer, useLocalStore } from "mobx-react";
import React from "react";
import styled from "styled-components";
import SDropBox from "../../../shared/styles/SDropBox";

type Props = {
  attemptLogin: (
    email: string,
    password: string
  ) => Promise<"INVALID_DETAILS" | undefined>;
};

export default observer((props: Props) => {
  const state = useLocalStore(() => ({
    email: "",
    password: "",
    error: false,
    loading: false
  }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    state.loading = true;
    state.error = false;

    const err = await props.attemptLogin(state.email, state.password);
    if (err) state.error = true;

    state.loading = false;
  };

  return (
    <SWrapper>
      <div className="container">
        <SFloat>
          <SDropBox>
            <form onSubmit={submit}>
              <div className="field">
                <label className="label">Email address</label>
                <div className="control has-icons-left">
                  <input
                    autoFocus={true}
                    type="email"
                    className="input"
                    value={state.email}
                    onChange={e => (state.email = e.target.value)}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input
                    type="password"
                    className="input"
                    value={state.password}
                    onChange={e => (state.password = e.target.value)}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-key" />
                  </span>
                </div>
              </div>
              <button
                className={`button is-link is-outlined ${
                  state.loading ? "is-loading" : ""
                }`}
              >
                Login
              </button>
              {state.error && <p className="help is-danger">Invalid details</p>}
            </form>
          </SDropBox>
        </SFloat>
      </div>
    </SWrapper>
  );
});

const SWrapper = styled.div`
  padding: 0 1rem;
  position: absolute;
  width: 100%;
  z-index: 100;
`;

const SFloat = styled.div`
  max-width: 300px;
  float: right;
`;
