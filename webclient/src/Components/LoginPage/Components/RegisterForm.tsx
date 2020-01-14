import { Formik } from "formik";
import React from "react";
import { SForm, SFormButton, SFormInput } from "../../../SharedStyles";

export const RegisterForm = ({
  register
}: {
  register: (name: string, email: string, password: string) => void;
}) => {
  const initialValues = { name: "", email: "", password: "" };
  const submit = (values: typeof initialValues) => {
    register(values.name, values.email, values.password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      {props => (
        <SForm onSubmit={props.handleSubmit}>
          Create a new account.
          <SFormInput
            name="name"
            value={props.values.name}
            onChange={props.handleChange}
            placeholder="Name"
          />
          <SFormInput
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            placeholder="Email address"
          />
          <SFormInput
            name="password"
            value={props.values.password}
            onChange={props.handleChange}
            placeholder="Password"
            type="password"
          />
          <SFormButton type="submit">Register</SFormButton>
        </SForm>
      )}
    </Formik>
  );
};
