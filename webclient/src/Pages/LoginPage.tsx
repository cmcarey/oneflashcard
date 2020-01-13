import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
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

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO Login
  };

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO Register
  };

  return (
    <PageCenterBox>
      <Body>
        <Boxes>
          <Box>
            <BoxTitle>Login</BoxTitle>
            <BoxBody>
              <Form
                onSubmit={login}
                render={({ handleSubmit }) => (
                  <StyledForm onSubmit={handleSubmit}>
                    Login with your existing account.
                    <Field name="email" component="input" />
                    <StyledFormInput placeholder="Email address" />
                    <StyledFormInput placeholder="Password" type="password" />
                    <StyledFormButton>Login</StyledFormButton>
                  </StyledForm>
                )}
              />
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>Register</BoxTitle>
            <BoxBody>
              <StyledForm onSubmit={register}>
                Create a new account.
                <StyledFormInput placeholder="Username" />
                <StyledFormInput placeholder="Email address" />
                <StyledFormInput placeholder="Password" type="password" />
                <StyledFormButton>Register</StyledFormButton>
              </StyledForm>
            </BoxBody>
          </Box>
        </Boxes>
      </Body>
    </PageCenterBox>
  );
};
