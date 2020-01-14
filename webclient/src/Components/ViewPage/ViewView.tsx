import React from "react";
import { Card, Tag } from "../../Model";
import {
  SBody,
  SBodyAction,
  SBodyHeader,
  SBodyTitle,
  SCenter
} from "../../SharedStyles";
import { Cards } from "./Components/Cards";

export const ViewView = ({
  cards,
  tags,
  editCard,
  addCard
}: {
  cards: Card[];
  tags: Tag[];
  editCard: (card: Card) => void;
  addCard: () => void;
}) => (
  <SBody>
    <SCenter>
      <SBodyHeader>
        <SBodyTitle>Viewing all cards</SBodyTitle>
        <SBodyAction onClick={addCard}>Add card</SBodyAction>
      </SBodyHeader>
      <Cards {...{ cards, tags, editCard }} />
    </SCenter>
  </SBody>
);
