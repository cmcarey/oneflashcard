import { Formik } from "formik";
import React from "react";
import { SForm, SFormButton, SFormInput } from "../../../SharedStyles";

export const LoginForm = ({
  login
}: {
  login: (email: string, password: string) => void;
}) => {
  const initialValues = { email: "", password: "" };
  const submit = (values: typeof initialValues) => {
    login(values.email, values.password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      {props => (
        <SForm onSubmit={props.handleSubmit}>
          Login with your existing account.
          <SFormInput
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            placeholder="Email address"
            type="email"
          />
          <SFormInput
            name="password"
            value={props.values.password}
            onChange={props.handleChange}
            placeholder="Password"
            type="password"
          />
          <SFormButton type="submit">Login</SFormButton>
        </SForm>
      )}
    </Formik>
  );
};
