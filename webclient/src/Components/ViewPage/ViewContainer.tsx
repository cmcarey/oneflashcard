import React from "react";
import { useHistory } from "react-router";
import { Card } from "../../Model";
import { useSelector } from "../../Store/Store";
import { ViewView } from "./ViewView";

export const ViewContainer = () => {
  const history = useHistory();
  const cards = useSelector(state => state.App.cards);
  const tags = useSelector(state => state.App.tags);

  const editCard = (card: Card) => {
    history.push(`/edit/card/${card.cardID}`);
  };

  const addCard = () => {
    history.push(`/edit/card`);
  };

  return <ViewView {...{ cards, tags, editCard, addCard }} />;
};
