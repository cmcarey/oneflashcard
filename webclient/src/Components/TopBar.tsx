import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../Resources/logo.svg";
import { SPageCenter, SVertBar } from "../ui";

export const TopBar = ({
  username,
  logout
}: {
  username?: string;
  logout: () => void;
}) => (
  <SVertBar>
    <SPageCenter>
      <STopBar>
        <Logo width="225px" height="auto" />
        {username && (
          <SProfileBox>
            <div>{username}</div>
            <SLogoutButton onClick={logout}>Logout</SLogoutButton>
          </SProfileBox>
        )}
      </STopBar>
    </SPageCenter>
  </SVertBar>
);

const STopBar = styled.div`
  padding: 0.5rem;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

const SLogoutButton = styled.div`
  cursor: pointer;
`;

const SProfileBox = styled.div`
  > *:first-child {
    color: black;
  }

  text-align: right;
`;
