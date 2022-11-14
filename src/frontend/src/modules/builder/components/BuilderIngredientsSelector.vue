<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите ингредиенты
      </h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce in pizza.sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              class="visually-hidden"
              :value="sauce.id"
              :checked="pizzaOrder.sauces.id === sauce.id"
              @click="
                $emit('changePizzaOrder', {
                  pizzaOrderParam: 'sauces',
                  id: $event.target.value,
                })
            "
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizza.ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :draggable="isDraggable(ingredient)"
              >
                <SelectorItem
                  :ingredient="ingredient"
                  :pizzaOrder="pizzaOrder"
                />
              </AppDrag>

              <ItemCounter
                :ingredientId="ingredient.id"
                :pizzaOrder="pizzaOrder"
                @changeIngredientsCount="changeIngredientsCount"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RadioButton from "@/common/components/RadioButton";
  import SelectorItem from "@/common/components/SelectorItem";
  import AppDrag from "@/common/components/AppDrag";
  import ItemCounter from "@/common/components/ItemCounter";

  export default {
    name: "BuilderIngredientsSelector",
    components: {
      RadioButton,
      SelectorItem,
      AppDrag,
      ItemCounter,
    },
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
    methods: {
      isDraggable({ id }) {
        const isInPizzaOrder = this.pizzaOrder.ingredients.some((item) => item.id === id);
        const isMaxCountIngredients = this.pizzaOrder.ingredients.find((item) => item.id === id)?.count === 3;
        return !(isInPizzaOrder && isMaxCountIngredients);
      },
      changeIngredientsCount({ id, count }) {
        this.$emit("changePizzaOrder", {
          pizzaOrderParam: "ingredients",
          id,
          count,
        });
      },
    },
  };
</script>
