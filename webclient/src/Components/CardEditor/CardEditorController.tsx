import React from "react";
import { useSelector } from "../../Store/Store";
import { CardEditorView } from "./CardEditorView";

export const CardEditorController = () => {
  const card = useSelector(state => state.appSlice.editingCard);

  return <CardEditorView />;
};
