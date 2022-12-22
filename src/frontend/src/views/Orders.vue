<template>
  <div>
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link
          :to="{ name: 'index' }"
          class="logo layout__logo"
        >
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          >
        </router-link>

        <router-link
          :to="{ name: 'orders' }"
          class="layout__link layout__link--active"
        >
          История заказов
        </router-link>
        <router-link
          :to="{ name: 'profile' }"
          class="layout__link"
        >
          Мои данные
        </router-link>
      </div>

      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">История заказов</h1>
        </div>

        <section
          v-for="order in orders"
          :key="order.id"
          class="sheet order"
        >
          <OrdersItem :order="order" />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrdersItem from "@/views/OrdersItem";

export default {
  name: "Orders",
  components: {
    OrdersItem,
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  async created() {
    await this.getDough();
    await this.getSauces();
    await this.getSizes();
    await this.getIngredients();
    await this.getMisc();
    await this.fetchOrders();
  },
  methods: {
    ...mapActions("Builder", [
      "getDough",
      "getSauces",
      "getSizes",
      "getIngredients"
    ]),
    ...mapActions("Cart", ["getMisc"]),
    ...mapActions("Orders", ["fetchOrders"]),
  },
};
</script>
