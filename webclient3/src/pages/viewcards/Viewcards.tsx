import { observer } from "mobx-react";
import React from "react";
import Body from "../../shared/components/Body";
import cardStore from "../../stores/cardStore";
import Cards from "./components/Cards";

export default observer(() => {
  const cards = cardStore.linkedCards;

  return (
    <Body>
      <Cards cards={cards} />
    </Body>
  );
});
