<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
  export default {
    name: "BuilderPriceCounter",
    props: {
      pizza: {
        type: Object,
        required: true,
      },
      pizzaOrder: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {
      totalPrice() {
        return (
          this.pizzaOrder.sizes.multiplier *
          (
            this.pizzaOrder.dough.price +
            this.pizzaOrder.sauces.price +
            this.sumIngredients(this.pizzaOrder.ingredients)
          )
        );
      },
    },
    methods: {
      sumIngredients(arr) {
        return arr.reduce((sum, item) => {
          return sum + (item?.count ?? 1) * item.price;
        }, 0);
      },
    },
  };
</script>
