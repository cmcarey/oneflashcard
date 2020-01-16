<template lang="pug">
div
  Topbar(:loadingUser="loadingUser" :logout="logout")
  Navbar(:routes="routes")
  router-view
</template>

<script lang="ts">
import store, { useStore, AppMapper, AppStore } from "../../store";
import Topbar from "./components/Topbar.vue";
import Navbar from "./components/Navbar.vue";
import { createComponent, onMounted, computed } from "@vue/composition-api";
import { createMapper } from "vuex-smart-module";

const allRoutes = [
  ["/app", "View all cards", "viewcards", "fa-bars"],
  ["/app/learn", "Learn cards", "learncards", "fa-graduation-cap"]
];

export default createComponent({
  components: { Topbar, Navbar },

  setup(_, context) {
    const store = AppStore.context(context.root.$store);

    const routes = computed(() => {
      const currRouteName = context.root.$route.name;
      return allRoutes.map(route => [...route, route[2] === currRouteName]);
    });

    const { loggedIn, loadingUser } = AppStore.mapGetters([
      "loggedIn",
      "loadingUser"
    ]);

    const logout = () => {
      useStore(context.root.$store).mutations.logout();
      context.root.$router.push("/");
    };

    onMounted(() => {
      if (!store.getters.loggedIn && !store.getters.loadingUser)
        context.root.$router.push("/");
    });

    return { routes, loadingUser, logout };
  }
});

// export default Vue.extend({
//   components: { Topbar, Navbar },
//   mounted() {
//     if (!this.loggedIn && !this.loadingUser) this.$router.push("/");
//   },

//   computed: {
//     routes() {
//       const currRouteName = this.$route.name;
//       const routes = [
//         ["/app", "View all cards", "viewcards", "fa-bars"],
//         ["/app/learn", "Learn cards", "learncards", "fa-graduation-cap"]
//       ];

//       return routes.map(route => [...route, route[2] === currRouteName]);
//     },
//     ...AppMapper.mapGetters(["loggedIn", "loadingUser"])
//   },

//   methods: {
//     logout() {
//       AppStore.context(this.$store).mutations.logout();
//       this.$router.push("/");
//     }
//   }
// });
</script>
