import { observer, useLocalStore } from "mobx-react";
import React from "react";

export default observer(() => {
  const form = useLocalStore(() => ({
    email: "",
    password: ""
  }));

  return (
    <div className="box">
      <form>
        <div className="field">
          <label className="label">Email address</label>
          <div className="control has-icons-left">
            <input
              type="email"
              className="input"
              value={form.email}
              onChange={e => (form.email = e.target.value)}
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
              value={form.password}
              onChange={e => (form.password = e.target.value)}
            />
            <span className="icon is-left">
              <i className="fas fa-key" />
            </span>
          </div>
        </div>
        <button className="button">Login</button>
      </form>
    </div>
  );
});
