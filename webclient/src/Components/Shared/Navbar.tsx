import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SCenter, SVertbar } from "../../SharedStyles";

export const NavBar = ({ path }: { path: string }) => (
  <SVertbar>
    <SCenter>
      <SBar>
        <SBarButton to="/" selected={path === ""}>
          View cards
        </SBarButton>
        <SBarButton to="/learn" selected={path === "learn"}>
          Learn
        </SBarButton>
      </SBar>
    </SCenter>
  </SVertbar>
);

const SBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const SBarButton = styled(Link)<{ selected?: boolean }>`
  :not(:first-child) {
    margin-left: 2rem;
  }

  :hover {
    color: #444;
    border-bottom-color: #444;
  }

  :focus {
    outline: none;
  }

  padding: 0.7rem 0;

  border-bottom: 1px solid transparent;
  transition: 0.2s border-bottom-color;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  ${p =>
    p.selected &&
    `
    &, :hover {
      color: #5050ff;
      border-bottom-color: #5050ff;
    }
  `}
`;
