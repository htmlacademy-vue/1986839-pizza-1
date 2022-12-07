<template>
  <div>
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderPrice }} ₽</span>
      </div>

      <form @submit="deleteOrder(order.id)">
        <div class="order__button">
          <button
            type="submit"
            class="button button--border"
          >
            Удалить
          </button>
        </div>
      </form>

      <div class="order__button">
        <button
          class="button"
          @click="repeatOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in pizzas" :key="pizza.id" class="order__item">
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ itemSize(pizza).name }}, тесто: {{ itemDough(pizza).name }}</li>
              <li>Соус: {{ itemSauce(pizza).name }}</li>
              <li>Начинка: {{ itemIngredientsName(pizza) }}</li>
            </ul>
          </div>
        </div>
        <p class="order__price">{{ pizza.price }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="item in additionals" :key="item.id">
        <img
          :src="item.image"
          :alt="item.name"
          width="20"
          height="30"
        />
        <p>
          <span>{{ item.name }}</span>
          <b>{{ item.count }}х{{ item.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "OrdersItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Cart", ["misc"]),
    ...mapState("Builder", [
      "pizzaDough",
      "pizzaSizes",
      "pizzaSauces",
      "pizzaIngredients"
    ]),

    address() {
      return this.order.orderAddress
        ? this.order.orderAddress.name
        : "Самовывоз";
    },

    pizzas() {
      return this.order.orderPizzas.map((pizza) => {
        return { ...pizza, price: this.getPrice(pizza) };
      });
    },

    additionals() {
      return this.order.orderMisc.map((misc) => {
        return {
          ...this.getItemById(this.misc, misc.miscId),
          count: misc.quantity,
        };
      });
    },

    orderPrice() {
      return this.getOrderPrice(this.pizzas, this.order.orderMisc);
    }
  },
  methods: {
    ...mapActions("Orders", ["deleteOrder"]),

    ...mapActions("Cart", [
      "savePizzaOrderCart",
      "changeMiscItemCount"
    ]),

    getItemById(list, id) {
      return list.find((item) => item.id === +id);
    },

    itemDough(pizza) {
      return this.getItemById(this.pizzaDough, pizza.doughId);
    },

    itemSize(pizza) {
      return this.getItemById(this.pizzaSizes, pizza.sizeId);
    },

    itemSauce(pizza) {
      return this.getItemById(this.pizzaSauces, pizza.sauceId);
    },

    itemIngredientsName(pizza) {
      const ingredientsName = pizza.ingredients.map((el) => {
        return this.getItemById(this.pizzaIngredients, el.ingredientId).name;
      });
      return ingredientsName.join(', ');
    },

    getOrderPrice(pizzas, misc) {
      const pizzaPrices = pizzas.map((pizza) => pizza.price * pizza.quantity);
      const miscPrices = misc.map(
        (misc) => this.getItemById(this.misc, misc.miscId).price * misc.quantity
      );
      const allPrices = [...pizzaPrices, ...miscPrices];
      return allPrices.length ? allPrices.reduce((sum, item) => sum + item, 0) : 0;
    },

    getPrice(pizza) {
      const doughPrice = this.itemDough(pizza).price;
      const saucePrice = this.itemSauce(pizza).price;
      const multiplier = this.itemSize(pizza).multiplier;
      const ingredientsPrice = pizza.ingredients
        .map(
          (ingredient) =>
            this.getItemById(this.pizzaIngredients, ingredient.ingredientId).price *
            ingredient.quantity
        )
        .reduce((sum, item) => sum + item, 0);
      return (doughPrice + saucePrice + ingredientsPrice) * multiplier;
    },

    async repeatOrder() {
      this.pizzas.forEach((pizza) => {
        const pizzaOrderIngredients = pizza.ingredients.map((item) => {
          return {
            ...this.getItemById(this.pizzaIngredients, item.ingredientId),
            count: item.quantity,
          };
        });
        const pizzaOrder = {
          pizzaName: pizza.name,
          dough: this.itemDough(pizza),
          sauces: this.itemSauce(pizza),
          sizes: this.itemSize(pizza),
          ingredients: pizzaOrderIngredients,
          price: this.getPrice(pizza),
          count: 1,
        };
        this.savePizzaOrderCart(pizzaOrder);
      });
      this.additionals.forEach((misc) => {
        this.changeMiscItemCount(misc);
      });
      await this.$router.push({ name: "cart" });
    }
  }
};
</script>
