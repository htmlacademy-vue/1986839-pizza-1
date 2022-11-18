<template>
  <div id="app">
    <AppLayout
      :pizzaOrder="pizzaOrder"
      :pizzaName="pizzaName"
      :price="price"
    >
      <router-view/>
    </AppLayout>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    // temporary solution for props that we will get from vuex later
    return {
      pizzaOrder: {},
      pizzaName: "",
      price: 0,
    };
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
