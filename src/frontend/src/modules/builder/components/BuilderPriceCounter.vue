<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button type="button" class="button" :disabled="cookButtonIsDisabled" @click="savePizzaOrder()">Готовьте!</button>
  </div>
</template>

<script>
  import { uniqueId } from 'lodash';
  import { mapState, mapGetters, mapMutations } from "vuex";

  export default {
    name: "BuilderPriceCounter",
    computed: {
      ...mapState("Builder", {
        pizzaOrder: "pizzaOrder",
        pizzaName: "pizzaName"
      }),
      ...mapGetters("Builder", ["pizzaPrice"]),
      cookButtonIsDisabled() {
        return !this.pizzaName.length || !this.pizzaOrder.ingredients.length;
      },
    },
    methods: {
      ...mapMutations("Builder", ["savePizzaOrderCart"]),
      savePizzaOrder() {
        let state = this.$store.state.Builder;
        let pizzaOrderIngredients = [];
        for (let i = 0; i < state.pizzaOrder.ingredients.length; i++) {
          pizzaOrderIngredients.push(state.pizzaOrder.ingredients[i].name);
        }
        let pizzaOrder = {
          id: uniqueId(),
          pizzaName: state.pizzaName,
          dough: state.pizzaOrder.dough,
          sauces: state.pizzaOrder.sauces,
          sizes: state.pizzaOrder.sizes,
          ingredients: pizzaOrderIngredients,
          price: this.pizzaPrice,
          count: 1,
        };
        this.savePizzaOrderCart(pizzaOrder);
        this.$router.push("/cart");
      },
    },
  };
</script>
