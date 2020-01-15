<template lang="pug">
  div
    .topbar
      img.logo(src="../../assets/logo.svg")
      button.button.is-outlined.is-danger(@click="logout") logout
    .optbar
      a.selected
        span.icon
          i.fas.fa-bars
        | View all cards
      a 
        span.icon
          i.fas.fa-graduation-cap
        | Learn cards
    div(v-if="loadingUser") loading
    div(v-else-if="!loggedIn") not logged in
    router-view(v-else)
</template>

<script lang="ts">
import Vue from "vue";
import store, { useStore, AppMapper, AppStore } from "../../store";

export default Vue.extend({
  mounted() {
    if (!this.loggedIn && !this.loadingUser) this.$router.push("/");
  },
  computed: {
    ...AppMapper.mapGetters(["loggedIn", "loadingUser"])
  },
  methods: {
    logout() {
      AppStore.context(this.$store).mutations.logout();
      this.$router.push("/");
    }
  }
});
</script>

<style lang="sass" scoped>
.topbar
  display: grid
  grid-template-columns: 1fr auto
  background: white
  padding: 1rem
  border-bottom: 1px solid #d0e0ff

  .logo
    height: 40px

.optbar
  background: white
  border-bottom: 1px solid #d0e0ff
  padding: 0 1rem

  a
    display: inline-block
    padding: 1rem
    color: #a8a8a8
    border-bottom: 1px solid transparent
    transition: .1s border-bottom-color, .1s color

    span
      margin-right: .3rem

    &.selected
      color: black
      border-bottom-color: black

    &:hover
      color: blue
      border-bottom-color: blue
</style>
