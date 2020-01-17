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
    if ("error" in cards) return userStore.reset();

    this.cards = cards.value.cards;

    const tags = await api.fetchTags(sessionKey);
    if ("error" in tags) return userStore.reset();

    this.tags = tags.value.tags;
  }

  @action
  async addTag(text: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.newTag(sessionKey, text);
    if ("error" in res) return;

    this.tags.push(res.value.tag);

    return res.value.tag;
  }

  @action
  async newCard(title: string, text: string, tagIDs: string[]) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.newCard(sessionKey, title, text, tagIDs);
    if ("error" in res) return;

    await this.fetchAll();
  }

  @action
  async updateCard(card: Card) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.updateCard(sessionKey, card);
    if ("error" in res) return;

    await this.fetchAll();
  }
}

export default new CardStore();
