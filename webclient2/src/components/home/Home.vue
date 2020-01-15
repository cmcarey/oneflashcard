<template lang="pug">
  div
    .container.padded
      .level
        .level-left
          .level-item
            img(width="250px" src="../../assets/logo.svg")

        .level-right
          .level-item
            .buttons
              button.button(
                :class="{'is-link': displayLoginForm}"
                @click="displayLoginForm = !displayLoginForm") Login

      .level.form-area
        .level-left
        .level-right
          .level-item
            LoginForm(v-if="displayLoginForm")

      p other stuff
</template>

<script lang="ts">
import Vue from "vue";
import { AppStore, useStore } from "../../store";
import LoginForm from "./components/LoginForm.vue";

export default Vue.extend({
  components: { LoginForm },

  data() {
    return {
      displayLoginForm: false
    };
  },

  methods: {}
});
</script>

<style lang="sass" scoped>
.padded
  padding: 1rem

.form-area
  padding: 0 1rem
  margin-top: -1rem
  position: absolute
  left: 0
  right: 0
</style>
