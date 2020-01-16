<template lang="pug">
.page-header
  .page-title Viewing all cards
  button.button.is-outlined.is-link
    span.icon
      i.far.fa-plus-square

    span Add card
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="sass" scoped>
.page-header
  display: grid
  grid-template-columns: 1fr auto
  align-items: center

.page-title
  font-size: 1.5rem
  color: #7b7b7b
</style>
