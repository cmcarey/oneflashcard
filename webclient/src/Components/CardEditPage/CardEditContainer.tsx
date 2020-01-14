import React from "react";
import { useParams } from "react-router";
import { useSelector } from "../../Store/Store";
import { CardEditorView } from "./CardEditorView";

export const CardEditorContainer = () => {
  const cards = useSelector(state => state.App.cards);
  const apiCallsInProgress = useSelector(state => state.App.apiCallsInProgress);
  const cardIDs = cards.map(card => card.cardID);

  const { cardID } = useParams();
  const isEditing = cardID !== undefined;

  const initialValues: { title: string; text: string; tagIDs: string[] } = {
    title: "",
    text: "",
    tagIDs: []
  };

  if (cardID) {
    const card = cards[cardIDs.indexOf(cardID)];
    if (!card && apiCallsInProgress > 0) return <div>Loading</div>;
    initialValues.title = card.title;
    initialValues.text = card.text;
    initialValues.tagIDs = card.tagIDs;
  }

  const onSubmit = (values: {
    title: string;
    text: string;
    tagIDs: string[];
  }) => {
    // TODO implement
  };

  return <CardEditorView {...{ isEditing, onSubmit, initialValues }} />;
};
