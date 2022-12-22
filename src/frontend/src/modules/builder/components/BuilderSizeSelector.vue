<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzaSizes"
          :key="size.id"
          :class="{
            'diameter__input--small': size.multiplier === 1,
            'diameter__input--normal': size.multiplier === 2,
            'diameter__input--big': size.multiplier === 3,
          }"
          class="diameter__input"
        >
          <RadioButton
            name="diameter"
            class="visually-hidden"
            :value="size.id"
            :checked="pizzaOrderSizes.id === size.id"
            data-test="size-selector"
            @click="setPizzaSize($event.target.value)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  computed: {
    ...mapState("Builder", [
      "pizzaSizes",
      "pizzaOrderSizes"
    ]),
  },
  methods: {
    ...mapMutations("Builder", ["setPizzaSize"]),
  },
};
</script>
