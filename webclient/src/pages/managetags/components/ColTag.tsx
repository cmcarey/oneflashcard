import { observer, useLocalStore } from "mobx-react";
import React, { useRef } from "react";
import { TwitterPicker } from "react-color";
import styled from "styled-components";
import { Tag } from "../../../interface/model";
import useOutsideClick from "../../../shared/useOutsideClick";

type Props = { tag: Tag };

export default observer((props: Props) => {
  const ref = useRef(null);

  const state = useLocalStore(() => ({ colorPickerOpen: false }));

  const toggleColorPicker = () =>
    (state.colorPickerOpen = !state.colorPickerOpen);

  useOutsideClick(ref, () => (state.colorPickerOpen = false));

  return (
    <STag key={props.tag.tagID} tagCol={props.tag.color} ref={ref}>
      <STagText onClick={toggleColorPicker}>{props.tag.text}</STagText>
      <SDelButton>X</SDelButton>
      {state.colorPickerOpen && (
        <SPickerContainer>
          <TwitterPicker />
        </SPickerContainer>
      )}
    </STag>
  );
});

const STag = styled.div<{ tagCol: string }>`
  background: ${p => p.tagCol};
  border-radius: 0.5rem;
  margin: 0.5rem 0.5rem 0 0;

  box-shadow: 0 0.5em 1em -0.125em rgba(98, 98, 98, 0.1),
    0 0px 0 1px rgba(189, 189, 189, 0.02);
  display: flex;
  flex-direction: row;
  cursor: pointer;
  position: relative;
`;

const STagText = styled.div`
  word-wrap: anywhere;
  padding: 0.5rem;

  background: inherit;
  transition: 0.1s filter;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  &:hover {
    filter: brightness(1.1);
  }
`;

const SDelButton = styled.div`
  font-weight: bold;
  padding: 0.5rem;
  color: #8a8a8a;

  background: inherit;
  transition: 0.1s filter;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:hover {
    filter: brightness(0.9);
  }
`;

const SPickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  z-index: 100;
`;
