import { observer } from "mobx-react";
import React from "react";
import { Card } from "../../interface/model";
import Body from "../../shared/components/Body";
import cardStore from "../../stores/cardStore";
import Cards from "./components/Cards";

export default observer(() => {
  const addTag = (v: string) => cardStore.addTag(v);

  const updateCard = (card: Card) => cardStore.updateCard(card);

  return (
    <Body>
      <Cards
        cards={cardStore.linkedCards}
        allTags={cardStore.tags}
        addTag={addTag}
        updateCard={updateCard}
      />
    </Body>
  );
});
