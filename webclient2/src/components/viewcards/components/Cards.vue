<template lang="pug">
.cards
  .box(v-for="card in cards")
    b {{card.title}}
    p {{card.text}}
    .cardTags(v-if="card.tags.length > 0")
      .cardTag(
        v-for="tag in card.tags"
        v-if="tag"
        :style=`{background: tag.color}`) {{tag.text}}
</template>

<script lang="ts">
import Vue from "vue";
import { PropValidator } from "vue/types/options";

export default Vue.extend({
  props: {
    cards: Array as PropValidator<
      {
        cardID: string;
        title: string;
        text: string;
        tags: { tagID: string; text: string; color: string }[];
      }[]
    >
  }
});
</script>

<style lang="sass" scoped>
.cards
  margin-top: 1rem
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  grid-gap: 1rem

.box
  margin-bottom: 0

.cardTags
  display: grid
  grid-auto-flow: column
  grid-gap: .3rem
  justify-content: start
  margin-top: .5rem

  .cardTag
    font-size: .7rem
    padding: 0 .3rem
    border-radius: .3rem
    color: black
</style>
