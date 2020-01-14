<template>
  <div>
    <div v-if="authenticated">logged in!</div>
    <div v-if="attemptingLogin">attempting login</div>
    <div v-if="badDetails">bad login details</div>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email address" />
      <input v-model="password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component()
export default class Login extends Vue {
  email = "";
  password = "";
  attemptingLogin = false;
  badDetails = false;

  @Watch("authenticated")
  onAuth() {
    this.$router.go(-1);
  }

  get authenticated() {
    return this.$store.getters.authenticated;
  }

  async submit() {
    if (this.attemptingLogin) return;
    this.attemptingLogin = true;
    const res = await this.$store.dispatch("login", {
      email: this.email,
      password: this.password
    });

    if (res && res.error) {
      this.badDetails = true;
      setTimeout(() => {
        this.badDetails = false;
      }, 2000);
    }

    this.attemptingLogin = false;
  }
}
</script>

<style scoped lang="scss"></style>
