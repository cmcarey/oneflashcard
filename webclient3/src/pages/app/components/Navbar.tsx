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
            {route.text}
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
`;

const SLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1rem;
  color: #919191;
  border-bottom: 1px solid transparent;
  transition: 0.1s color, 0.1s border-bottom-color;

  span {
    margin-right: 0.5rem;
  }

  &.selected {
    color: black;
    border-bottom-color: black;
  }

  :not(.selected):hover {
    color: #3769ff;
    border-bottom-color: #3769ff;
  }

  :focus {
    outline: none;
  }
`;
