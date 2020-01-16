<template lang="pug">
.box
  .tag-opt(
    v-for="tag in tags" 
    :class=`{selected: filtered.includes(tag.tagID)}` @click="filter(tag.tagID)") {{tag.text}}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: { tags: Array, filtered: Array, filter: Function }
});
</script>

<style lang="sass" scoped>
.box
  position: absolute
  top: 100%
  z-index: 100
  padding: 0
  min-width: 200px
  overflow: hidden
  border-top-left-radius: 0
  border-top-right-radius: 0

.tag-opt
  padding: .5rem 1rem
  cursor: pointer
  transition: .1s background, .1s color
  border-bottom: 1px solid #eee

  &:hover
    background: #f6f6ff

  &.selected
    background: #869cc6
    color: white
</style>
