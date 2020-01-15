<template lang="pug">
  div
    p heh
    button(@click="$store.commit('logout')") logout
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="sass" scoped></style>
