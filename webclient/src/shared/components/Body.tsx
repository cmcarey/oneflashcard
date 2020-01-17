import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

type Props = { children: JSX.Element | JSX.Element[] };

export default observer((props: Props) => {
  return (
    <SPadded>
      <div className="container">{props.children}</div>
    </SPadded>
  );
});

const SPadded = styled.div`
  padding: 1rem;
`;
