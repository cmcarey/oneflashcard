<template lang="pug">
div
  button.button(@click="toggleForm") Login
  .floating
    .level
      .level-left
      .level-right
        .level-item
          .box(v-if="showForm")
            form(@submit.prevent="login")
              .field
                label.label Email
                .control.has-icons-left
                  input.input(
                    ref="email"
                    v-model="email"
                    placeholder="Email address"
                    type="email")
                  span.icon.is-small.is-left
                    i.fas.fa-envelope

              .field
                label.label Password
                .control.has-icons-left
                  input.input(
                    v-model="password"
                    placeholder="Password"
                    type="password")
                  span.icon.is-small.is-left
                    i.fas.fa-key

              button.button.is-primary(
                :class="{'is-loading': loggingIn}") Login
              p.help.is-danger(v-if="badDetails") Invalid details
</template>

<script lang="ts">
import Vue from "vue";
import store, { useStore } from "../../../store";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      showForm: false,
      loggingIn: false,
      badDetails: false
    };
  },

  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (this.showForm)
        this.$nextTick(() => (this.$refs.email as any).focus());
    },

    async login() {
      this.badDetails = false;
      this.loggingIn = true;

      const loginAction = await useStore(store).actions.login({
        email: this.email,
        password: this.password
      });

      if ("error" in loginAction) this.badDetails = true;

      this.loggingIn = false;
    }
  }
});
</script>

<style lang="sass" scoped>
.floating
  position: absolute
  z-index: 100
  left: 0
  right: 0
  margin: 1rem
</style>
