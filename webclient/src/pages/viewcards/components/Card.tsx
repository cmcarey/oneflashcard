import { observer, useLocalStore } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { Card, LinkedCard, Tag } from "../../../interface/model";
import SCardBox from "../styles/SCardBox";
import Editor from "./Editor";

type Props = {
  card: LinkedCard;
  allTags: Tag[];
  addTag: (text: string) => Promise<Tag | undefined>;
  updateCard: (card: Card) => Promise<void>;
  deleteCard: () => void;
};

export default observer((props: Props) => {
  const state = useLocalStore(() => ({ editing: false }));

  const submitCard = async (title: string, text: string, tagIDs: string[]) => {
    await props.updateCard({ cardID: props.card.cardID, title, text, tagIDs });
    console.log(tagIDs);
    state.editing = false;
  };

  if (state.editing)
    return (
      <Editor
        card={props.card}
        allTags={props.allTags}
        addTag={props.addTag}
        closeEditor={() => (state.editing = false)}
        submitCard={submitCard}
        deleteCard={props.deleteCard}
      />
    );

  return (
    <SBox onClick={() => (state.editing = true)}>
      <b>{props.card.title}</b>
      <SCardText>{props.card.text}</SCardText>
      {props.card.tags.length > 0 && (
        <SCardTags>
          {props.card.tags.map(tag => (
            <SCardTag key={tag.tagID} color={tag.color}>
              {tag.text}
            </SCardTag>
          ))}
        </SCardTags>
      )}
    </SBox>
  );
});

const SBox = styled(SCardBox)`
  cursor: pointer;
  transition: 0.2s background;
  display: grid;
  align-content: start;
  grid-template-rows: auto 1fr auto;

  :hover {
    background: #faf6ff;
  }
`;

const SCardText = styled.p`
  white-space: pre-line;
`;

const SCardTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SCardTag = styled.div<{ color: string }>`
  margin: 0.3rem 0.3rem 0 0;
  font-size: 0.7rem;
  padding: 0 0.3rem;
  border-radius: 0.3rem;
  color: black;
  background: ${p => p.color};
`;
