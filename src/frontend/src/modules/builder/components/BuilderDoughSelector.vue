<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in pizza.dough"
          :key="dough.id"
          :class="
            dough.name === 'Тонкое'
              ? 'dough__input--light'
              : 'dough__input--large'
          "
          class="dough__input"
        >
          <RadioButton
            name="dought"
            class="visually-hidden"
            :value="dough.id"
            :checked="pizzaOrder.dough.id === dough.id"
            @click="
              $emit('changePizzaOrder', {
                pizzaOrderParam: 'dough',
                id: $event.target.value,
              })
            "
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import RadioButton from "@/common/components/RadioButton";

  export default {
    name: "BuilderDoughSelector",
    components: {
      RadioButton,
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
  };
</script>
