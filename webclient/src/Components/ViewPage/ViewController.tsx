import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../Store/Model";
import { actions, useSelector } from "../../Store/Store";
import { ViewView } from "./ViewView";

export const ViewController = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.appSlice.cards);
  const tags = useSelector(state => state.appSlice.tags);

  const editCard = (card: Card) => {
    dispatch(actions.setEditingCard(card));
  };

  return <ViewView {...{ cards, tags, editCard }} />;
};
