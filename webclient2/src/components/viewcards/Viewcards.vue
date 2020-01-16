<template lang="pug">
Body
  Header
  Cards(:cards="mappedCards")
</template>

<script lang="ts">
import Vue from "vue";
import { AppMapper } from "../../store";
import Cards from "./components/Cards.vue";
import Header from "./components/Header.vue";
import Body from "../shared/Body.vue";

export default Vue.extend({
  components: { Cards, Header, Body },

  computed: {
    ...AppMapper.mapGetters(["mappedCards"])
  }
});
</script>

<style lang="sass" scoped></style>
