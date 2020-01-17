import Fuse from "fuse.js";
import { observer, useLocalStore } from "mobx-react";
import React from "react";
import { Card } from "../../interface/model";
import Body from "../../shared/components/Body";
import cardStore from "../../stores/cardStore";
import Cards from "./components/Cards";
import Optionbar from "./components/Optionbar";

export default observer(() => {
  const state = useLocalStore(() => ({
    filterTagIDs: [] as string[],
    filterString: "",
    addingCard: false
  }));

  const setFilteredTagIDs = (ids: string[]) => (state.filterTagIDs = ids);
  const setFilterString = (s: string) => (state.filterString = s);
  const addTag = (v: string) => cardStore.addTag(v);
  const updateCard = (card: Card) => cardStore.updateCard(card);
  const openAddCardBox = () => (state.addingCard = true);
  const closeAddCardBox = () => (state.addingCard = false);

  const addCard = async (title: string, text: string, tagIDs: string[]) => {
    const t = await cardStore.newCard(title, text, tagIDs);
    state.addingCard = false;
    return t;
  };

  let cards = cardStore.linkedCards;

  if (state.filterTagIDs.length > 0)
    cards = cards.filter(card => {
      // Check that has a tagID for every filterTagID
      const cardTagIDs = card.tags.map(tag => tag.tagID);
      const matchingTags = state.filterTagIDs.filter(
        id => cardTagIDs.indexOf(id) !== -1
      );
      return state.filterTagIDs.length === matchingTags.length;
    });

  if (state.filterString.length > 0)
    cards = new Fuse(cards, {
      shouldSort: true,
      keys: ["title", "text"]
    }).search(state.filterString);

  return (
    <Body>
      <Optionbar
        allTags={cardStore.tags}
        filteredTagIDs={state.filterTagIDs}
        setFilteredTagIDs={setFilteredTagIDs}
        filterString={state.filterString}
        setFilterString={setFilterString}
        addCard={openAddCardBox}
      />
      <Cards
        cards={cards}
        allTags={cardStore.tags}
        addTag={addTag}
        updateCard={updateCard}
        addingCard={state.addingCard}
        closeAddCardBox={closeAddCardBox}
        addCard={addCard}
      />
    </Body>
  );
});
