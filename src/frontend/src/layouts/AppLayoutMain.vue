<template>
  <div>
    <AppLayoutHeader
      :pizzaOrder="pizzaOrder"
      :pizzaName="pizzaName"
      :price="price"
    />
    <slot />
  </div>
</template>

<script>
  import AppLayoutHeader from "@/layouts/AppLayoutHeader";
  export default {
    name: "AppLayoutMain",
    components: {
      AppLayoutHeader,
    },
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
  };
</script>
