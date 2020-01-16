<template lang="pug">
.bar
  .container
    .inner
      img.logo(src="../../../assets/logo.svg")
      button.button.is-outlined.is-danger(
        @click="logout" :class=`{"is-loading": loadingUser}`) Logout
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
  props: { loadingUser: Boolean, logout: Function }
});

// export default Vue.extend({
//   props: {
//     loadingUser: Boolean,
//     logout: Function as PropValidator<() => void>
//   }
// });
</script>

<style lang="sass" scoped>
.bar
  background: white
  border-bottom: 1px solid #d0e0ff

.inner
  padding: 1rem
  display: flex
  justify-content: space-between
  flex-wrap: wrap

.logo
  height: 40px
</style>
