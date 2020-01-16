<template lang="pug">
.page-header
  .page-title Viewing all cards
  .buttons
    button.button
      span.icon
        i.fas.fa-filter

      span Filter cards
      
    button.button
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
  display: flex
  justify-content: space-between
  flex-wrap: wrap

.page-title
  font-size: 1.5rem
  color: #7b7b7b

.buttons
</style>
