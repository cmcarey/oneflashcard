import React from "react";
import {
  SBody,
  SBodyAction,
  SBodyHeader,
  SBodyTitle,
  SCenter
} from "../../SharedStyles";
import { useSelector } from "../../Store/Store";
import { Cards } from "./Components/Cards";

export const ViewCardsPage = () => {
  const cards = useSelector(state => state.appSlice.cards);
  const tags = useSelector(state => state.appSlice.tags);

  return (
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
};
