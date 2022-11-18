<template>
  <component
    :is="layout"
    :pizzaOrder="pizzaOrder"
    :pizzaName="pizzaName"
    :price="price"
  >
    <slot />
  </component>
</template>

<script>
  const defaultLayout = 'AppLayoutDefault';

  export default {
    name: "AppLayout",
    props: {
      pizzaOrder: {
        type: Object,
        required: true,
      },
      pizzaName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    computed: {
      layout() {
        const layout = this.$route.meta.layout || defaultLayout;
        return () => import(`@/layouts/${layout}.vue`);
      }
    }
  };
</script>
