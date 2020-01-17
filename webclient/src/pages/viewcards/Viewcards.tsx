import { observer, useLocalStore } from "mobx-react";
import React from "react";
import { Card } from "../../interface/model";
import Body from "../../shared/components/Body";
import cardStore from "../../stores/cardStore";
import Cards from "./components/Cards";
import FilterOptions from "./components/FilterOptions";

export default observer(() => {
  const state = useLocalStore(() => ({
    filterTagIDs: [] as string[]
  }));

  const allCards = cardStore.linkedCards;
  const filteredCards =
    state.filterTagIDs.length > 0
      ? allCards.filter(card => {
          // Check that has a tagID for every filterTagID
          const cardTagIDs = card.tags.map(tag => tag.tagID);
          const matchingTags = state.filterTagIDs.filter(
            id => cardTagIDs.indexOf(id) !== -1
          );
          return state.filterTagIDs.length === matchingTags.length;
        })
      : allCards;

  const setFilteredTagIDs = (ids: string[]) => (state.filterTagIDs = ids);

  const addTag = (v: string) => cardStore.addTag(v);
  const updateCard = (card: Card) => cardStore.updateCard(card);

  return (
    <Body>
      <FilterOptions
        allTags={cardStore.tags}
        filteredTagIDs={state.filterTagIDs}
        setFilteredTagIDs={setFilteredTagIDs}
      />
      <Cards
        cards={filteredCards}
        allTags={cardStore.tags}
        addTag={addTag}
        updateCard={updateCard}
      />
    </Body>
  );
});
