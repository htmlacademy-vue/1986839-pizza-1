<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('changeIngredientsCount', { id: ingredient.id, count: itemCounterInputValue-1 })"
      :disabled="buttonMinusDisabled"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="itemCounterInputValue"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('changeIngredientsCount', { id: ingredient.id, count: itemCounterInputValue+1 })"
      :disabled="buttonPlusDisabled"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
  import { MAX_COUNT_INGREDIENTS } from '@/common/constants';

  export default {
    name: "ItemCounter",
    props: {
      ingredient: {
        type: Object,
        required: true,
      },
      pizzaOrder: {
        type: Object,
        required: true,
      },
    },
    computed: {
      buttonMinusDisabled() {
        return this.itemCounterInputValue === 0;
      },
      buttonPlusDisabled() {
        return this.itemCounterInputValue === MAX_COUNT_INGREDIENTS;
      },
      itemCounterInputValue() {
        return (
          this.pizzaOrder.ingredients.filter(
            (item) => item.id === this.ingredient.id
          )[0]?.count ?? 0
        );
      },
    },
  };
</script>
