<template lang="pug">
Body
  Header(:tags="tags" :filtered="filteredTagIDs" :filter="toggleFilterTag")
  Cards(:cards="mappedCards" :filteredTags="filteredTagIDs")
</template>

<script lang="ts">
import Vue from "vue";
import { AppMapper } from "../../store";
import Cards from "./components/Cards.vue";
import Header from "./components/Header.vue";
import Body from "../shared/Body.vue";

export default Vue.extend({
  components: { Cards, Header, Body },

  data() {
    const d: { filteredTagIDs: string[] } = { filteredTagIDs: [] };
    return d;
  },

  methods: {
    toggleFilterTag(id: string) {
      const index = this.filteredTagIDs.indexOf(id);
      if (index === -1) this.filteredTagIDs.push(id);
      else this.filteredTagIDs.splice(index, 1);
    }
  },

  computed: {
    ...AppMapper.mapGetters(["mappedCards"]),
    ...AppMapper.mapState(["tags"])
  }
});
</script>

<style lang="sass" scoped></style>
