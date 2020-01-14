import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../Resources/logo.svg";
import { SCenter, SVertbar } from "../../SharedStyles";

export const TopBar = ({
  username,
  logout
}: {
  username?: string;
  logout: () => void;
}) => (
  <SVertbar>
    <SCenter>
      <STopbar>
        <Logo width="225px" height={undefined} />
        {username && (
          <SProfileBox>
            <div>{username}</div>
            <SLogoutButton onClick={logout}>Logout</SLogoutButton>
          </SProfileBox>
        )}
      </STopbar>
    </SCenter>
  </SVertbar>
);

const STopbar = styled.div`
  padding: 0.5rem 0;

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
