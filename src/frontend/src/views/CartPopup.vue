<template>
  <div class="popup">
    <button
      class="close"
      @click.prevent="$emit('close')"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </button>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <button
        class="button"
        @click.prevent="$emit('close')"
      >
        Отлично, я жду!
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartPopup",
  };
</script>
