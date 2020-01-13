import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { loginOp, registerOp } from "../Store/Operations";
import { useSelector } from "../Store/Store";
import {
  SBody,
  SBox,
  SBoxBody,
  SBoxTitle,
  SForm,
  SFormButton,
  SFormInput,
  SPageCenter
} from "../ui";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const loggedIn =
    useSelector(state => state.appSlice.user?.name) !== undefined;

  const loginInitial = { email: "", password: "" };
  const login = (values: typeof loginInitial) => {
    dispatch(loginOp(values.email, values.password));
  };

  const registerInitial = { name: "", email: "", password: "" };
  const register = (values: typeof registerInitial) => {
    dispatch(registerOp(values.name, values.email, values.password));
  };

  return (
    <SPageCenter>
      {loggedIn && <Redirect to="/" />}
      <SBody>
        <SBoxes>
          <SBox>
            <SBoxTitle>Login</SBoxTitle>
            <SBoxBody>
              <Formik initialValues={loginInitial} onSubmit={login}>
                {props => (
                  <SForm onSubmit={props.handleSubmit}>
                    Login with your existing account.
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
                    <SFormButton type="submit">Login</SFormButton>
                  </SForm>
                )}
              </Formik>
            </SBoxBody>
          </SBox>

          <SBox>
            <SBoxTitle>Register</SBoxTitle>
            <SBoxBody>
              <Formik initialValues={registerInitial} onSubmit={register}>
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
            </SBoxBody>
          </SBox>
        </SBoxes>
      </SBody>
    </SPageCenter>
  );
};

const SBoxes = styled.div`
  max-width: calc(600px + 2rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  grid-gap: 2rem;
`;
