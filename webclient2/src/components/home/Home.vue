<template lang="pug">
  div
    .container.padded
      .level
        .level-left
          .level-item
            img(width="250px" src="../../assets/logo.svg")

        .level-right
          .level-item
            .buttons(v-if="$store.state.loadingUser")
              button.button.is-loading.is-outlined loading

            .buttons(v-else-if="!$store.getters.authenticated")
              button.button(
                :class="{'is-link': displayLoginForm}"
                @click="displayLoginForm = !displayLoginForm") Login

            .buttons.has-addons(v-else)
              button.button.is-outlined.is-link(@click="goToApp") Go to app
              button.button.is-outlined.is-danger(
                @click="$store.commit('logout')") Logout

    .container.level.form-area(v-if="displayLoginForm")
      .level-left
      .level-right
        .level-item
          LoginForm

    Landing
</template>

<script lang="ts">
import Vue from "vue";
import { AppStore, useStore } from "../../store";
import LoginForm from "./components/LoginForm.vue";
import Landing from "./components/Landing.vue";

export default Vue.extend({
  components: { LoginForm, Landing },

  data() {
    return {
      displayLoginForm: false
    };
  },

  watch: {
    "$store.getters.authenticated"(val) {
      if (val) this.displayLoginForm = false;
    }
  },

  methods: {
    goToApp() {
      this.$router.push("/app");
    }
  }
});
</script>

<style lang="sass" scoped>
.padded
  padding: 1rem

.form-area
  padding: 0 1rem
  position: absolute
  z-index: 100
  left: 0
  right: 0
</style>
