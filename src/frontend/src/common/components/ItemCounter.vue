<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('changeItemsCount', { id: item.id, count: itemCount-1 })"
      :disabled="buttonMinusDisabled"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="itemCount"
    />
    <button
      type="button"
      :class="[
        'counter__button counter__button--plus',
        isCart ? 'counter__button--orange' : ''
      ]"
      @click="$emit('changeItemsCount', { id: item.id, count: itemCount+1 })"
      :disabled="buttonPlusDisabled"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
  import { MAX_COUNT_INGREDIENTS } from '@/common/constants';
  import { mapState } from "vuex";

  export default {
    name: "ItemCounter",
    props: {
      item: {
        type: Object,
        required: true,
      },
      itemCount: {
        type: Number,
        required: true,
      },
      isCart: {
        type: Boolean,
        required: true,
      }
    },
    computed: {
      ...mapState("Builder", {
        pizzaOrder: "pizzaOrder"
      }),
      buttonMinusDisabled() {
        return this.itemCount === 0;
      },
      buttonPlusDisabled() {
        return !this.isCart && this.itemCount >= MAX_COUNT_INGREDIENTS;
      },
    },
  };
</script>
