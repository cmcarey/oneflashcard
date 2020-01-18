import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";

type Props = { children: JSX.Element };

export default observer((props: Props) => {
  return (
    <SBar>
      <div className="container">
        <SContainer>
          <Logo height="40px" width={undefined} />
          <div>{props.children}</div>
        </SContainer>
      </div>
    </SBar>
  );
});

const SBar = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e1e1e1;
`;

const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
