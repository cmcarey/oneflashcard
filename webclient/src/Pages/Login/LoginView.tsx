import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { SBody, SBox, SBoxBody, SBoxTitle, SCenter } from "../../SharedStyles";
import { LoginForm } from "./Components/LoginForm";
import { RegisterForm } from "./Components/RegisterForm";

export const LoginView = ({
  loggedIn,
  login,
  register
}: {
  loggedIn: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
}) => (
  <SCenter>
    {loggedIn && <Redirect to="/" />}
    <SBody>
      <SBoxes>
        <SBoxAligned>
          <SBoxTitle>Login</SBoxTitle>
          <SBoxBody>
            <LoginForm login={login} />
          </SBoxBody>
        </SBoxAligned>

        <SBoxAligned>
          <SBoxTitle>Register</SBoxTitle>
          <SBoxBody>
            <RegisterForm register={register} />
          </SBoxBody>
        </SBoxAligned>
      </SBoxes>
    </SBody>
  </SCenter>
);

const SBoxes = styled.div`
  margin: 0 auto;
  max-width: calc(600px + 2rem);

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  grid-gap: 2rem;
`;

const SBoxAligned = styled(SBox)`
  align-self: start;
`;
