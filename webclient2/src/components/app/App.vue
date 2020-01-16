<template lang="pug">
div
  Topbar(:loadingUser="loadingUser" :logout="logout")
  Navbar(:routes="routes")
  router-view
</template>

<script lang="ts">
import Vue from "vue";
import store, { useStore, AppMapper, AppStore } from "../../store";
import Topbar from "./components/Topbar.vue";
import Navbar from "./components/Navbar.vue";

export default Vue.extend({
  components: { Topbar, Navbar },
  mounted() {
    if (!this.loggedIn && !this.loadingUser) this.$router.push("/");
  },

  computed: {
    routes() {
      const currRouteName = this.$route.name;
      const routes = [
        ["/app", "View all cards", "viewcards", "fa-bars"],
        ["/app/learn", "Learn cards", "learncards", "fa-graduation-cap"]
      ];

      return routes.map(route => [...route, route[2] === currRouteName]);
    },
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
