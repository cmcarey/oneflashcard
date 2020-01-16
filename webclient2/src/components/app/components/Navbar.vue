<template lang="pug">
.bar
  .container
    .inner
      router-link(
        v-for="route in routes"
        :key="route[0]"
        :class=`{"selected": route[4]}`
        :to="route[0]")
        span.icon
          i.fas(:class="route[3]")
        | {{route[1]}}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    routes: Array
  }
});
</script>

<style lang="sass" scoped>
.bar
  background: white
  border-bottom: 1px solid #d0e0ff

.inner
  padding: 0 1rem

a
  display: inline-block
  padding: 1rem
  color: #a8a8a8
  border-bottom: 1px solid transparent
  transition: .1s border-bottom-color, .1s color

  span
    margin-right: .3rem

  &:focus
    outline: none

  &:hover
    color: blue
    border-bottom-color: blue

  &.selected, &.selected:hover
    color: black
    border-bottom-color: black
</style>
