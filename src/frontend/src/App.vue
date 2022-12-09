<template>
  <div id="app">
    <AppLayout>
      <transition
        name="slide"
        :appear="isAppear"
        enter-active-class="animate__animated animate__slideInDown"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import { setAuth } from "./common/helpers";

export default {
  name: "App",
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
  },
  computed: {
    isAppear() {
      return this.$route.name !== "login";
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
@import "~animate.css/animate.css";
</style>
