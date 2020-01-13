import React from "react";
import { Cards } from "../Components/Cards";
import { useSelector } from "../Store/Store";
import {
  SBody,
  SBodyBar,
  SBodyBarAction,
  SBodyTitle,
  SPageCenter
} from "../ui";

export const ViewCardsPage = () => {
  const cards = useSelector(state => state.appSlice.cards);
  const tags = useSelector(state => state.appSlice.tags);

  return (
    <SBody>
      <SPageCenter>
        <SBodyBar>
          <SBodyTitle>Viewing all cards</SBodyTitle>
          <SBodyBarAction>Add card</SBodyBarAction>
        </SBodyBar>
        <Cards cards={cards} tags={tags} />
      </SPageCenter>
    </SBody>
  );
};
