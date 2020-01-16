<template lang="pug">
.page-header
  .page-title Viewing all cards
  .optBox
    div
      .buttons
        button.button(@click="toggleFilter" :class=`{"is-link": filtering}`)
          span.icon
            i.fas.fa-filter

          span Filter cards

        button.button
          span.icon
            i.far.fa-plus-square

          span Add card

    FilterOptions(
      v-if="state.showFilterOptions"
      :tags="tags"
      :filtered="filtered"
      :filter="filter")
</template>

<script lang="ts">
import Vue from "vue";
import FilterOptions from "./FilterOptions.vue";
import { createComponent, reactive, computed } from "@vue/composition-api";

export default createComponent({
  components: { FilterOptions },
  props: { tags: Array, filtered: Array, filter: Function },

  setup(props: { tags: any; filtered: any; filter: any }) {
    const state = reactive({
      showFilterOptions: false
    });

    const filtering = computed(() => props.filtered.length > 0);

    const toggleFilter = () =>
      (state.showFilterOptions = !state.showFilterOptions);

    return { state, filtering, toggleFilter };
  }
});
</script>

<style lang="sass" scoped>
.page-header
  display: flex
  justify-content: space-between
  flex-wrap: wrap

.page-title
  font-size: 1.5rem
  color: #7b7b7b

.optBox
  position: relative
</style>
