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

export const ViewView = ({ cards, tags }: { cards: Card[]; tags: Tag[] }) => (
  <SBody>
    <SCenter>
      <SBodyHeader>
        <SBodyTitle>Viewing all cards</SBodyTitle>
        <SBodyAction>Add card</SBodyAction>
      </SBodyHeader>
      <Cards cards={cards} tags={tags} />
    </SCenter>
  </SBody>
);
