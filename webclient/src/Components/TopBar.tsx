import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../Resources/logo.svg";
import { PageCenterBox, ProfileBox, VertBar } from "../ui";

const TopBarStyle = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

export const TopBar = ({ username }: { username?: string }) => (
  <VertBar>
    <PageCenterBox>
      <TopBarStyle>
        <Logo width="225px" height="auto" />
        {username && (
          <ProfileBox>
            <div>{username}</div>
            <div>Logout</div>
          </ProfileBox>
        )}
      </TopBarStyle>
    </PageCenterBox>
  </VertBar>
);
