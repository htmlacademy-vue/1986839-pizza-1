<template>
  <div class="popup">
    <button
      class="close"
      data-test="close-button"
      @click="closePopup"
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
        @click="closePopup"
      >
        Отлично, я жду!
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartPopup",
  computed: {
    ...mapState("Auth", ["user"]),
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    }
  }
};
</script>
