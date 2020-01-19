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
    await Promise.all([this.fetchCards(), this.fetchTags()]);
  }

  @action
  async fetchCards() {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.fetchCards(sessionKey);
    if ("error" in res) return userStore.reset();
    this.cards = res.value.cards;
  }

  @action
  async fetchTags() {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.fetchTags(sessionKey);
    if ("error" in res) return userStore.reset();
    this.tags = res.value.tags;
  }

  @action
  async addTag(text: string, color: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.newTag(sessionKey, text, color);
    if ("error" in res) return;

    await this.fetchTags();

    return res.value.tag;
  }

  @action
  async updateTag(tag: Tag) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.updateTag(sessionKey, tag);
    if ("error" in res) return;

    await this.fetchTags();
  }

  @action
  async deleteTag(tagID: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.deleteTag(sessionKey, tagID);
    if ("error" in res) return;

    await this.fetchAll();
  }

  @action
  async addCard(title: string, text: string, tagIDs: string[]) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.newCard(sessionKey, title, text, tagIDs);
    if ("error" in res) return;

    await this.fetchCards();
  }

  @action
  async updateCard(card: Card) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.updateCard(sessionKey, card);
    if ("error" in res) return;

    await this.fetchCards();
  }

  @action
  async deleteCard(cardID: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.deleteCard(sessionKey, cardID);
    if ("error" in res) return;

    await this.fetchCards();
  }
}

export default new CardStore();
