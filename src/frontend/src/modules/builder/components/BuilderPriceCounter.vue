<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="cookButtonIsDisabled"
      data-test="cook-button"
      @click="savePizzaOrder"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["pizzaPrice"]),
    ...mapState("Builder", [
      "pizzaOrderIngredients",
      "pizzaName"
    ]),
    ...mapState("Cart", ["misc"]),
    cookButtonIsDisabled() {
      return !this.pizzaName.length || !this.pizzaOrderIngredients.length;
    },
  },
  methods: {
    ...mapActions("Cart", [
      "savePizzaOrderCart",
      "changeMiscItemCount"
    ]),

    ...mapActions("Builder", [
      "resetBuilderState",
      "getDough",
      "getSauces",
      "getSizes",
      "getIngredients"
    ]),

    savePizzaOrder() {
      const state = this.$store.state.Builder;
      const pizzaOrder = {
        pizzaName: state.pizzaName,
        dough: state.pizzaOrderDough,
        sauces: state.pizzaOrderSauces,
        sizes: state.pizzaOrderSizes,
        ingredients: state.pizzaOrderIngredients,
        price: this.pizzaPrice,
        count: 1,
        id: state.id,
      };
      this.savePizzaOrderCart(pizzaOrder);

      this.resetBuilderState();
      this.getDough();
      this.getSauces();
      this.getSizes();
      this.getIngredients();

      this.misc.forEach((misc) => {
        this.changeMiscItemCount({ ...misc, count: 0 });
      });

      this.$router.push({ name: 'cart' });
    }
  },
};
</script>
