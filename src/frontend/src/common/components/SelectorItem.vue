<template>
  <span
    :class="{
        'filling--mushrooms':   ingredient.name === 'Грибы',
        'filling--cheddar':     ingredient.name === 'Чеддер',
        'filling--salami':      ingredient.name === 'Салями',
        'filling--ham':         ingredient.name === 'Ветчина',
        'filling--ananas':      ingredient.name === 'Ананас',
        'filling--bacon':       ingredient.name === 'Бекон',
        'filling--onion':       ingredient.name === 'Лук',
        'filling--chile':       ingredient.name === 'Чили',
        'filling--jalapeno':    ingredient.name === 'Халапеньо',
        'filling--olives':      ingredient.name === 'Маслины',
        'filling--tomatoes':    ingredient.name === 'Томаты',
        'filling--salmon':      ingredient.name === 'Лосось',
        'filling--mozzarella':  ingredient.name === 'Моцарелла',
        'filling--parmesan':    ingredient.name === 'Пармезан',
        'filling--blue_cheese': ingredient.name === 'Блю чиз',
      }"
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
  };
</script>
