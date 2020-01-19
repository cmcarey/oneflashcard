import { observer } from "mobx-react";
import React from "react";
import Body from "../../shared/components/Body";
import cardStore from "../../stores/cardStore";
import Tagtable from "./components/Tagtable";

export default observer(() => {
  const tags = cardStore.tags;

  return (
    <Body>
      <Tagtable tags={tags} />
    </Body>
  );
});
