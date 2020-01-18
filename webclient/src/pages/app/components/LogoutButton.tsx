import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

type Props = { isLoading: boolean; logout: () => void };

export default observer((props: Props) => {
  const loadingClass = props.isLoading ? "is-loading" : "";

  return (
    <SButton
      className={`button is-danger is-outlined ${loadingClass}`}
      onClick={props.logout}
    >
      <span className="icon is-left">
        <i className="fas fa-sign-out-alt" />
      </span>
      <span className="text">Logout</span>
    </SButton>
  );
});

const SButton = styled.button`
  @media only screen and (max-width: 500px) {
    .text {
      display: none;
    }
    .icon {
      margin: 0 !important;
    }
  }
`;
