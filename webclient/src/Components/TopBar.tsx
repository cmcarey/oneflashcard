import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ReactComponent as Logo } from "../Resources/logo.svg";
import { resetState } from "../Store/Store";
import { PageCenterBox, ProfileBox, VertBar } from "../ui";

const TopBarStyle = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

const LogoutButton = styled.div`
  cursor: pointer;
`;

export const TopBar = ({ username }: { username?: string }) => {
  const dispatch = useDispatch();

  const logout = () => dispatch(resetState());

  return (
    <VertBar>
      <PageCenterBox>
        <TopBarStyle>
          <Logo width="225px" height="auto" />
          {username && (
            <ProfileBox>
              <div>{username}</div>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </ProfileBox>
          )}
        </TopBarStyle>
      </PageCenterBox>
    </VertBar>
  );
};
