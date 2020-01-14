import React from "react";
import { useSelector } from "../../Store/Store";
import { ViewView } from "./ViewView";

export const ViewController = () => {
  const cards = useSelector(state => state.appSlice.cards);
  const tags = useSelector(state => state.appSlice.tags);

  return <ViewView {...{ cards, tags }} />;
};
