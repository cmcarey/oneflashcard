<template lang="pug">
div
  .container.padded
    .level
      .level-left
        .level-item
          img(width="250px" src="../../assets/logo.svg")

      .level-right
        .level-item
          button.button.is-loading(v-if="loadingUser") loading
          Login(v-else-if="!loggedIn")
          .buttons.has-addons(v-else)
            button.button.is-outlined.is-link(@click="goToApp") Go to app
            button.button.is-outlined.is-danger(@click="logout") Logout

  Landing
</template>

<script lang="ts">
import Vue from "vue";
import Login from "./components/Login.vue";
import Landing from "./components/Landing.vue";
import { AppMapper } from "../../store";

export default Vue.extend({
  components: { Login, Landing },

  computed: {
    ...AppMapper.mapGetters(["loggedIn", "loadingUser"])
  },

  methods: {
    goToApp() {
      this.$router.push("/app");
    },
    ...AppMapper.mapMutations(["logout"])
  }
});
</script>

<style lang="sass" scoped>
.padded
  padding: 1rem
</style>
