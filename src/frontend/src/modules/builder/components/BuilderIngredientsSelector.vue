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
            v-for="sauce in pizzaSauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              class="visually-hidden"
              :value="sauce.id"
              :checked="pizzaOrderSauces.id === sauce.id"
              data-test="sauce-selector"
              @click="setPizzaSauce($event.target.value)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizzaIngredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <app-drag
                :transfer-data="ingredient"
                :draggable="isDraggable(ingredient)"
              >
                <SelectorItem
                  :ingredient="ingredient"
                />
              </app-drag>

              <ItemCounter
                :item="ingredient"
                :item-count="ingredient.count"
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
      "pizzaSauces",
      "pizzaIngredients",
      "pizzaOrderSauces",
      "pizzaOrderIngredients"
    ]),
  },
  methods: {
    ...mapMutations("Builder", [
      "setPizzaSauce",
      "setPizzaIngredient"
    ]),

    isDraggable(ingredient) {
      return ingredient.count < MAX_COUNT_INGREDIENTS;
    },

    changeIngredientsCount({ id, count }) {
      this.setPizzaIngredient({
        id,
        count,
      });
    }
  },
};
</script>
