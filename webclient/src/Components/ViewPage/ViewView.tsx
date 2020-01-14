import React from "react";
import {
  SBody,
  SBodyAction,
  SBodyHeader,
  SBodyTitle,
  SCenter
} from "../../SharedStyles";
import { Card, Tag } from "../../Store/Model";
import { Cards } from "./Components/Cards";

export const ViewView = ({
  cards,
  tags,
  editCard
}: {
  cards: Card[];
  tags: Tag[];
  editCard: (card: Card) => void;
}) => (
  <SBody>
    <SCenter>
      <SBodyHeader>
        <SBodyTitle>Viewing all cards</SBodyTitle>
        <SBodyAction>Add card</SBodyAction>
      </SBodyHeader>
      <Cards {...{ cards, tags, editCard }} />
    </SCenter>
  </SBody>
);
