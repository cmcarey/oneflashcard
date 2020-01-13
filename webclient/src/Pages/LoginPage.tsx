import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  Body,
  Box,
  BoxBody,
  BoxTitle,
  Form,
  FormButton,
  FormInput,
  PageCenterBox
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
              <Form onSubmit={login}>
                Login with your existing account.
                <FormInput placeholder="Email address" />
                <FormInput placeholder="Password" type="password" />
                <FormButton>Login</FormButton>
              </Form>
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>Register</BoxTitle>
            <BoxBody>
              <Form onSubmit={register}>
                Create a new account.
                <FormInput placeholder="Username" />
                <FormInput placeholder="Email address" />
                <FormInput placeholder="Password" type="password" />
                <FormButton>Register</FormButton>
              </Form>
            </BoxBody>
          </Box>
        </Boxes>
      </Body>
    </PageCenterBox>
  );
};
