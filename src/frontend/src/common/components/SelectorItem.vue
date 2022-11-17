<template>
  <span
    :class="fillingIngredientClass"
    class="filling"
  >
    {{ ingredient.name }}
  </span>
</template>

<script>
  export default {
    name: "SelectorItem",
    props: {
      ingredient: {
        type: Object,
        required: true,
      },
    },
    computed: {
      fillingIngredientClass() {
        switch (this.ingredient.name) {
          case 'Грибы':
            return 'filling--mushrooms';
          case 'Чеддер':
            return 'filling--cheddar';
          case 'Салями':
            return 'filling--salami';
          case 'Ветчина':
            return 'filling--ham';
          case 'Ананас':
            return 'filling--ananas';
          case 'Бекон':
            return 'filling--bacon';
          case 'Лук':
            return 'filling--onion';
          case 'Чили':
            return 'filling--chile';
          case 'Халапеньо':
            return 'filling--jalapeno';
          case 'Маслины':
            return 'filling--olives';
          case 'Томаты':
            return 'filling--tomatoes';
          case 'Лосось':
            return 'filling--salmon';
          case 'Моцарелла':
            return 'filling--mozzarella';
          case 'Пармезан':
            return 'filling--parmesan';
          case 'Блю чиз':
            return 'filling--blue_cheese';
          default:
            return '';
        }
      },
    },
  };
</script>
