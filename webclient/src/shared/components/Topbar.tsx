import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";

type Props = { children: JSX.Element };

export default observer((props: Props) => {
  return (
    <SBar>
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <Logo height="40px" width={undefined} />
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">{props.children}</div>
          </div>
        </div>
      </div>
    </SBar>
  );
});

const SBar = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e1e1e1;
`;
