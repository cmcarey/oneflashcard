import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { Card as TCard, LinkedCard, Tag } from "../../../interface/model";
import Card from "./Card";

type Props = {
  cards: LinkedCard[];
  allTags: Tag[];
  addTag: (text: string) => Promise<Tag | undefined>;
  updateCard: (card: TCard) => Promise<void>;
};

export default observer((props: Props) => (
  <SCardsContainer>
    {props.cards.map(card => (
      <Card
        key={card.cardID}
        card={card}
        allTags={props.allTags}
        addTag={props.addTag}
        updateCard={props.updateCard}
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
