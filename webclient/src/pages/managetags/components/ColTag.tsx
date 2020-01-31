import { observer, useLocalStore } from "mobx-react";
import React, { useRef } from "react";
import { ColorResult, TwitterPicker } from "react-color";
import styled from "styled-components";
import { Tag } from "../../../interface/model";
import { allTagColors } from "../../../shared/colors";
import useOutsideClick from "../../../shared/useOutsideClick";

type Props = {
  tag: Tag;
  updateTag: (tag: Tag) => void;
  deleteTag: (tagID: string) => void;
};

export default observer((props: Props) => {
  const ref = useRef(null);

  const state = useLocalStore(() => ({ colorPickerOpen: false }));

  const toggleColorPicker = () =>
    (state.colorPickerOpen = !state.colorPickerOpen);

  useOutsideClick(ref, () => (state.colorPickerOpen = false));

  const updateCol = (col: ColorResult) =>
    props.updateTag({ ...props.tag, color: col.hex });

  const deleteTag = () => props.deleteTag(props.tag.tag_id);

  return (
    <STag key={props.tag.tag_id} ref={ref}>
      <STopRow tagCol={props.tag.color}>
        <STagText onClick={toggleColorPicker}>{props.tag.text}</STagText>
        <SDelButton onClick={deleteTag}>
          <i className="fas fa-minus-circle" />
        </SDelButton>
      </STopRow>
      {state.colorPickerOpen && (
        <SPickerContainer>
          <TwitterPicker onChangeComplete={updateCol} colors={allTagColors} />
        </SPickerContainer>
      )}
    </STag>
  );
});

const STag = styled.div`
  margin: 0.5rem 0.5rem 0 0;
`;

const STopRow = styled.div<{ tagCol: string }>`
  background: ${p => p.tagCol};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: columns;
  justify-content: space-between;
  cursor: pointer;

  box-shadow: 0 0.5em 1em -0.125em rgba(98, 98, 98, 0.1),
    0 0px 0 1px rgba(189, 189, 189, 0.02);
`;

const STagText = styled.div`
  word-wrap: anywhere;
  padding: 0.5rem;

  background: inherit;
  transition: 0.1s filter;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  flex-grow: 1;

  &:hover {
    filter: brightness(1.1);
  }
`;

const SDelButton = styled.div`
  padding: 0.5rem;
  color: white;

  background: inherit;
  transition: 0.1s filter;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:hover {
    filter: brightness(0.9);
  }
`;

const SPickerContainer = styled.div``;
