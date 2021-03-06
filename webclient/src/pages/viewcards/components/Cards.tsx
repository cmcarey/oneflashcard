import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { Card as TCard, LinkedCard, Tag } from "../../../interface/model";
import Card from "./Card";
import Editor from "./Editor";

type Props = {
  cards: LinkedCard[];
  allTags: Tag[];
  addTag: (text: string) => Promise<Tag | undefined>;
  updateCard: (card: TCard) => Promise<void>;
  addingCard: boolean;
  closeAddCardBox: () => void;
  addCard: (title: string, text: string, tagIDs: string[]) => void;
  deleteCard: (cardID: string) => void;
};

export default observer((props: Props) => (
  <SCardsContainer>
    {props.addingCard && (
      <Editor
        allTags={props.allTags}
        addTag={props.addTag}
        closeEditor={props.closeAddCardBox}
        submitCard={props.addCard}
      />
    )}
    {props.cards.map(card => (
      <Card
        key={card.cardID}
        card={card}
        allTags={props.allTags}
        addTag={props.addTag}
        updateCard={props.updateCard}
        deleteCard={() => props.deleteCard(card.cardID)}
      />
    ))}
  </SCardsContainer>
));

const SCardsContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
`;
