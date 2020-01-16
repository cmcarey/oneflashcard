import { action, computed, observable } from "mobx";
import api from "../interface/api";
import { Card, LinkedCard, Tag } from "../interface/model";
import userStore from "./userStore";

class CardStore {
  @observable
  cards: Card[] = [];
  @observable
  tags: Tag[] = [];

  @computed
  get linkedCards(): LinkedCard[] {
    const tagIDs = this.tags.map(tag => tag.tagID);
    return this.cards.map(card => ({
      cardID: card.cardID,
      title: card.title,
      text: card.text,
      tags: card.tagIDs
        .map(tagID => this.tags[tagIDs.indexOf(tagID)])
        .filter(tag => tag)
    }));
  }

  @action
  async fetchAll() {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const cards = await api.fetchCards(sessionKey);
    if ("error" in cards) return userStore.logout();

    this.cards = cards.value.cards;

    const tags = await api.fetchTags(sessionKey);
    if ("error" in tags) return userStore.logout();

    this.tags = tags.value.tags;
  }
}

export default new CardStore();
