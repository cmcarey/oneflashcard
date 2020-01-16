<template lang="pug">
div
  section.hero
    .hero-body
      .container
        .columns
          .column.is-three-fifths
            h1.title Flashcards as simple as they get
            h2.subtitle No images, rich formatting, or anything fancy like that.
            p They may be added in the future.
            p For now, simple text is all you get.
          .column
            //- img.demo-image(src="../../../assets/demo.png")
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="sass" scoped>
.better-padding
  padding: 0 1.5rem

.demo-image
  border-radius: 1rem
  box-shadow: 0 1px 2px #bfbfbf
</style>
