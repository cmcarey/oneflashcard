import { action, computed, observable } from "mobx";
import api, { isNever } from "../interface/api";
import { Card, LinkedCard, Tag } from "../interface/model";
import userStore from "./userStore";

class CardStore {
  @observable
  cards: Card[] = [];
  @observable
  tags: Tag[] = [];

  @computed
  get linkedCards(): LinkedCard[] {
    const tagIDs = this.tags.map(tag => tag.tag_id);
    return this.cards.map(card => ({
      cardID: card.card_id,
      title: card.title,
      text: card.text,
      tags: card.tag_ids
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
    if (res.tag === "error") {
      if (res.error === "INVALID_SESSION_KEY") {
        // TODO handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    this.cards = res.payload.cards;
  }

  @action
  async fetchTags() {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.fetchTags(sessionKey);
    if (res.tag === "error") {
      if (res.error === "INVALID_SESSION_KEY") {
        // TODO handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    this.tags = res.payload.tags;
  }

  @action
  async addTag(text: string, color: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.newTag(sessionKey, text, color);
    if (res.tag === "error") {
      if (res.error === "INVALID_SESSION_KEY") {
        // TODO handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    await this.fetchTags();

    return res.payload.tag;
  }

  @action
  async updateTag(tag: Tag) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.updateTag(sessionKey, tag);
    if (res.tag === "error") {
      if (res.error === "BAD_TAGID") {
        // TODO Handle bad tag ID
      } else if (res.error === "INVALID_SESSION_KEY") {
        // TODO Handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    await this.fetchTags();
  }

  @action
  async deleteTag(tagID: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.deleteTag(sessionKey, tagID);
    if (res.tag === "error") {
      if (res.error === "BAD_TAGID") {
        // TODO Handle bad tag ID
      } else if (res.error === "INVALID_SESSION_KEY") {
        // TODO Handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    await this.fetchAll();
  }

  @action
  async addCard(title: string, text: string, tagIDs: string[]) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.newCard(sessionKey, title, text, tagIDs);
    if (res.tag === "error") {
      if (res.error === "BAD_TAGID") {
        // TODO Handle bad tag ID
      } else if (res.error === "INVALID_SESSION_KEY") {
        // TODO Handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    await this.fetchCards();
  }

  @action
  async updateCard(card: Card) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.updateCard(sessionKey, card);
    if (res.tag === "error") {
      if (res.error === "BAD_TAGID") {
        // TODO Handle bad tag ID
      } else if (res.error === "BAD_CARDID") {
        // TODO Handle bad card ID
      } else if (res.error === "INVALID_SESSION_KEY") {
        // TODO Handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    await this.fetchCards();
  }

  @action
  async deleteCard(cardID: string) {
    const sessionKey = userStore.sessionKey;
    if (!sessionKey) return;

    const res = await api.deleteCard(sessionKey, cardID);
    if (res.tag === "error") {
      if (res.error === "BAD_CARDID") {
        // TODO Handle bad card ID
      } else if (res.error === "INVALID_SESSION_KEY") {
        // TODO Handle session exit gracefully
      } else isNever(res.error);
      return;
    }

    await this.fetchCards();
  }
}

export default new CardStore();
