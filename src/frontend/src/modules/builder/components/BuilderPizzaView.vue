<template>
  <AppDrop @drop="changeIngredientsCount">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="pizzaName"
          @input="setPizzaName($event.target.value)"
        />
      </label>

      <div class="content__constructor">
        <div class="pizza" :class="doughSauceClass">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in pizzaOrderIngredients"
              :key="ingredient.id"
              :class="[
                {
                  'pizza__filling--mushrooms':   ingredient.name === 'Грибы',
                  'pizza__filling--cheddar':     ingredient.name === 'Чеддер',
                  'pizza__filling--salami':      ingredient.name === 'Салями',
                  'pizza__filling--ham':         ingredient.name === 'Ветчина',
                  'pizza__filling--ananas':      ingredient.name === 'Ананас',
                  'pizza__filling--bacon':       ingredient.name === 'Бекон',
                  'pizza__filling--onion':       ingredient.name === 'Лук',
                  'pizza__filling--chile':       ingredient.name === 'Чили',
                  'pizza__filling--jalapeno':    ingredient.name === 'Халапеньо',
                  'pizza__filling--olives':      ingredient.name === 'Маслины',
                  'pizza__filling--tomatoes':    ingredient.name === 'Томаты',
                  'pizza__filling--salmon':      ingredient.name === 'Лосось',
                  'pizza__filling--mozzarella':  ingredient.name === 'Моцарелла',
                  'pizza__filling--parmesan':    ingredient.name === 'Пармезан',
                  'pizza__filling--blue_cheese': ingredient.name === 'Блю чиз',
                },
                {
                  'pizza__filling--second': ingredient.count === 2 || ingredient.count === 3,
                },
                {
                  'pizza__filling--third': ingredient.count === 3,
                },
              ]"
              class="pizza__filling"
            />
          </div>
        </div>
      </div>

      <BuilderPriceCounter />
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
    BuilderPriceCounter,
  },
  computed: {
    ...mapState("Builder", [
      "pizzaOrderDough",
      "pizzaOrderSauces",
      "pizzaOrderIngredients",
      "pizzaName"
    ]),

    doughClass() {
      return this.pizzaOrderDough.id === 1 ? "small" : "big";
    },

    sauceClass() {
      return this.pizzaOrderSauces.id === 1 ? "tomato" : "creamy";
    },

    doughSauceClass() {
      return `pizza--foundation--${this.doughClass}-${this.sauceClass}`;
    }
  },
  methods: {
    ...mapMutations("Builder", [
      "setPizzaName",
      "setPizzaIngredient"
    ]),

    ingredientCount(id) {
      let count = 1;
      if ( this.pizzaOrderIngredients.find((item) => item.id === id) ) {
        count = this.pizzaOrderIngredients.find((item) => item.id === id).count + 1;
      }
      return count;
    },

    changeIngredientsCount({ id }) {
      this.setPizzaIngredient({
        id,
        count: this.ingredientCount(id),
      });
    }
  },
};
</script>
