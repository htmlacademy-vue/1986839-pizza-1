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
              @click="setPizzaSauce($event.target.value)"
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
                />
              </AppDrag>

              <ItemCounter
                :item="ingredient"
                :item-count="itemCount(ingredient)"
                :is-cart="false"
                @changeItemsCount="changeIngredientsCount"
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
  import { MAX_COUNT_INGREDIENTS } from '@/common/constants';
  import { mapState, mapMutations } from "vuex";

  export default {
    name: "BuilderIngredientsSelector",
    components: {
      RadioButton,
      SelectorItem,
      AppDrag,
      ItemCounter,
    },
    computed: {
      ...mapState("Builder", [
        "pizza",
        "pizzaOrder"
      ]),
    },
    methods: {
      ...mapMutations("Builder", ["setPizzaSauce", "setPizzaIngredient"]),
      isDraggable({ id }) {
        const isInPizzaOrder = this.pizzaOrder.ingredients.some((item) => item.id === id);
        const isMaxCountIngredients =
          this.pizzaOrder.ingredients.find((item) => item.id === id)?.count >= MAX_COUNT_INGREDIENTS;

        return !(isInPizzaOrder && isMaxCountIngredients);
      },
      changeIngredientsCount({ id, count }) {
        this.setPizzaIngredient({
          id,
          count,
        });
      },
      itemCount(ingredient) {
        return (
          this.pizzaOrder.ingredients.filter(
            (item) => item.id === ingredient.id
          )[0]?.count ?? 0
        );
      },
    },
  };
</script>
