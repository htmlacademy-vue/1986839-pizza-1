<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button type="button" class="button" :disabled="cookButtonIsDisabled" @click="setPrice()">Готовьте!</button>
  </div>
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
      pizzaName: {
        type: String,
        required: true,
      },
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
      cookButtonIsDisabled() {
        return !this.pizzaName.length || !this.pizzaOrder.ingredients.length;
      },
    },
    methods: {
      sumIngredients(arr) {
        return arr.reduce((sum, item) => {
          return sum + (item?.count ?? 1) * item.price;
        }, 0);
      },
      setPrice() {
        this.$emit("setOrderPrice", this.totalPrice);
      },
    },
  };
</script>
