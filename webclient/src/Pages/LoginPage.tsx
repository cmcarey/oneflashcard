import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";
import styled from "styled-components";
import { loginOp, registerOp } from "../Store/Operations";
import { useSelector } from "../Store/Store";
import {
  Body,
  Box,
  BoxBody,
  BoxTitle,
  PageCenterBox,
  StyledForm,
  StyledFormButton,
  StyledFormInput
} from "../ui";

const Boxes = styled.div`
  max-width: calc(600px + 2rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  grid-gap: 2rem;
`;

export const LoginPage = () => {
  const history = useHistory();
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
    <PageCenterBox>
      {loggedIn && <Redirect to="/" />}
      <Body>
        <Boxes>
          <Box>
            <BoxTitle>Login</BoxTitle>
            <BoxBody>
              <Formik initialValues={loginInitial} onSubmit={login}>
                {props => (
                  <StyledForm onSubmit={props.handleSubmit}>
                    Login with your existing account.
                    <StyledFormInput
                      name="email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      placeholder="Email address"
                    />
                    <StyledFormInput
                      name="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      placeholder="Password"
                      type="password"
                    />
                    <StyledFormButton type="submit">Login</StyledFormButton>
                  </StyledForm>
                )}
              </Formik>
            </BoxBody>
          </Box>

          <Box>
            <BoxTitle>Register</BoxTitle>
            <BoxBody>
              <Formik initialValues={registerInitial} onSubmit={register}>
                {props => (
                  <StyledForm onSubmit={props.handleSubmit}>
                    Create a new account.
                    <StyledFormInput
                      name="name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      placeholder="Name"
                    />
                    <StyledFormInput
                      name="email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      placeholder="Email address"
                    />
                    <StyledFormInput
                      name="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      placeholder="Password"
                      type="password"
                    />
                    <StyledFormButton type="submit">Register</StyledFormButton>
                  </StyledForm>
                )}
              </Formik>
            </BoxBody>
          </Box>
        </Boxes>
      </Body>
    </PageCenterBox>
  );
};
