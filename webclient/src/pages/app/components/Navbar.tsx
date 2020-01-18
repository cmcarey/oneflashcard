import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  routes: { text: string; icon: string; route: string }[];
  currRoute: string;
};

export default observer((props: Props) => {
  return (
    <SBar>
      <div className="container">
        {props.routes.map(route => (
          <SLink
            key={route.route}
            className={route.route === props.currRoute ? "selected" : ""}
            to={route.route}
          >
            <span className="icon">
              <i className={route.icon} />
            </span>
            <span className="text">{route.text}</span>
          </SLink>
        ))}
      </div>
    </SBar>
  );
});

const SBar = styled.div`
  background: white;
  padding: 0rem 1rem;
  border-bottom: 1px solid #e1e1e1;

  @media only screen and (max-width: 400px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    border-bottom: none;
    border-top: 1px solid #e1e1e1;
  }
`;

const SLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1rem;
  color: #919191;
  border-bottom: 1px solid transparent;
  transition: 0.1s color, 0.1s border-color;

  @media only screen and (max-width: 400px) {
    border-bottom: none;
    border-top: 1px solid transparent;
  }

  .icon {
    margin-right: 0.5rem;
  }

  &.selected {
    color: black;
    border-color: black;
  }

  :not(.selected):hover {
    color: #3769ff;
    border-color: #3769ff;
  }

  :focus {
    outline: none;
  }

  @media only screen and (max-width: 500px) {
    .text {
      display: none;
    }

    .icon {
      margin-right: 0;
    }
  }
`;
