<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('changeIngredientsCount', { id: ingredientId, count: -1 })"
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
      @click="$emit('changeIngredientsCount', { id: ingredientId, count: 1 })"
      :disabled="buttonPlusDisabled"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: "ItemCounter",
    props: {
      ingredientId: {
        type: Number,
        required: true,
      },
      pizzaOrder: {
        type: Object,
        required: true,
      },
    },
    computed: {
      buttonMinusDisabled() {
        return !this.pizzaOrder.ingredients.find(
          (item) => item.id === this.ingredientId
        );
      },
      buttonPlusDisabled() {
        return (
          this.pizzaOrder.ingredients.filter(
            (item) => item.id === this.ingredientId
          )[0]?.count === 3
        );
      },
      itemCounterInputValue() {
        return (
          this.pizzaOrder.ingredients.filter(
            (item) => item.id === this.ingredientId
          )[0]?.count ?? 0
        );
      },
    },
  };
</script>
