<template>
  <AppDrop @drop="changeIngredientsCount">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          :value="pizzaName"
          @input="$emit('setName', $event.target.value)"
          placeholder="Введите название пиццы"
        />
      </label>

      <div class="content__constructor">
        <div class="pizza" :class="doughSauceClass">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in pizzaOrder.ingredients"
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
                  'pizza__filling--second': ingredient.count === 2,
                  'pizza__filling--third': ingredient.count === 3,
                },
              ]"
              class="pizza__filling"
            />
          </div>
        </div>
      </div>

      <div class="content__result">
        <BuilderPriceCounter :pizza="pizza" :pizzaOrder="pizzaOrder" />
        <button type="button" class="button" :disabled="cookButtonIsDisabled">Готовьте!</button>
      </div>
    </div>
  </AppDrop>
</template>

<script>
  import AppDrop from "@/common/components/AppDrop";
  import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

  export default {
    name: "BuilderPizzaView",
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
    components: {
      AppDrop,
      BuilderPriceCounter,
    },
    computed: {
      doughClass() {
        return this.pizzaOrder.dough.id === 1 ? "small" : "big";
      },
      sauceClass() {
        return this.pizzaOrder.sauces.id === 1 ? "tomato" : "creamy";
      },
      doughSauceClass() {
        return `pizza--foundation--${this.doughClass}-${this.sauceClass}`;
      },
      cookButtonIsDisabled() {
        return !this.pizzaName.length || !this.pizzaOrder.ingredients.length;
      },
    },
    methods: {
      changeIngredientsCount({ id }) {
        this.$emit("changePizzaOrder", {
          pizzaOrderParam: "ingredients",
          id,
          count: 1,
        });
      },
    },
  };
</script>
