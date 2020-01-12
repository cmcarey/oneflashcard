import React from "react";
import { useLocation } from "react-router";
import { BarButton, BarButtons, PageCenterBox, VertBar } from "../ui";

export const NavBar = () => {
  const path = useLocation().pathname.split("/")[1];
  return (
    <VertBar>
      <PageCenterBox>
        <BarButtons>
          <BarButton to="/" selected={path === ""}>
            View cards
          </BarButton>
          <BarButton to="/learn" selected={path === "learn"}>
            Learn
          </BarButton>
        </BarButtons>
      </PageCenterBox>
    </VertBar>
  );
};
