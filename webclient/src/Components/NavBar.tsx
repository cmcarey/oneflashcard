import React from "react";
import { useLocation } from "react-router";
import { BarButton, BarButtons, Centered, VertBar } from "../ui";

export const NavBar = () => {
  const path = useLocation().pathname.split("/")[1];
  return (
    <VertBar>
      <Centered>
        <BarButtons>
          <BarButton to="/" selected={path === ""}>
            View cards
          </BarButton>
          <BarButton to="/learn" selected={path === "learn"}>
            Learn
          </BarButton>
        </BarButtons>
      </Centered>
    </VertBar>
  );
};
