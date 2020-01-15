<template lang="pug">
  form.box(@submit.prevent="!attemptingLogin && login()")
    .field
      label.label Email address
      .control.has-icons-left
        input.input(
          v-model="email" 
          type="email"
          placeholder="e.g. chance@carey.sh")

        span.icon.is-small.is-left
          i.fas.fa-envelope

    .field
      label.label Password
      .control.has-icons-left
        input.input(
          v-model="password"
          type="password"
          placeholder="e.g. verysecure")

        span.icon.is-small.is-left
          i.fas.fa-key

    .field
      .control
        button.button.is-primary(
          :class="{'is-loading': attemptingLogin}") Login
      p.help.is-danger(v-if="badDetails") Incorrect login details
</template>

<script lang="ts">
import Vue from "vue";
import { useStore } from "../../../store";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      attemptingLogin: false,
      badDetails: false
    };
  },

  methods: {
    async login() {
      this.badDetails = false;
      this.attemptingLogin = true;

      const store = useStore(this.$store);
      const res = await store.actions.login({
        email: this.email,
        password: this.password
      });

      if (res.error) {
        this.badDetails = true;
      }

      this.attemptingLogin = false;
    }
  }
});
</script>

<style lang="sass" scoped></style>
