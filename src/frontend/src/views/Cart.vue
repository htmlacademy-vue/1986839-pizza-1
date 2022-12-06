<template>
  <div>
    <form
      class="layout-form"
      @submit.prevent="sendOrder"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div
            class="sheet cart__empty"
            v-if="pizzaOrderCart.length === 0"
          >
            <p>В корзине нет ни одного товара</p>
          </div>

          <ul
            class="cart-list sheet"
            v-if="pizzaOrderCart.length > 0"
          >
            <li
              class="cart-list__item"
              v-for="item in pizzaOrderCart"
              :key="item.id"
            >
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  :alt="item.pizzaName"
                >
                <div class="product__text">
                  <h2>{{ item.pizzaName }}</h2>
                  <ul>
                    <li>{{ item.sizes.name }}, тесто: {{ item.dough.name }}</li>
                    <li>Соус: {{ item.sauces.name }}</li>
                    <li>Начинка: {{ pizzaIngredientsName(item.ingredients) }}</li>
                  </ul>
                </div>
              </div>

              <div class="counter cart-list__counter">
                <ItemCounter
                  :item="item"
                  :item-count="item.count"
                  :is-cart="true"
                  @changeItemsCount="changePizzaCount"
                />
              </div>

              <div class="cart-list__price">
                <b>{{ item.price }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button
                  type="button"
                  class="cart-list__edit"
                  @click="setPizzaToEdit(item)"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="item in misc"
                :key="item.id"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img
                    width="39"
                    height="60"
                    :src="item.image"
                    :alt="item.name"
                  >
                  <span>{{ item.name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <ItemCounter
                      :item="item"
                      :item-count="item.count"
                      :is-cart="true"
                      @changeItemsCount="changeMiscCount"
                    />
                  </div>

                  <div class="additional-list__price">
                    <b>× {{ item.price }} ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <CartOrder
            @setAddress="setAddress"
          ></CartOrder>
        </div>
      </main>

      <section class="footer">
        <div class="footer__more">
          <router-link
            :to="{ name: 'index' }"
            class="button button--border button--arrow"
          >
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
        <div class="footer__price">
          <b>Итого: {{ totalPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button
            type="submit"
            class="button"
          >
            Оформить заказ
          </button>
        </div>
      </section>

      <CartPopup @close="closePopup" v-if="popupOpen" />

    </form>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import CartPopup from "@/views/CartPopup";
import CartOrder from "@/views/CartOrder";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "Cart",
  components: {
    ItemCounter,
    CartPopup,
    CartOrder
  },
  data() {
    return {
      popupOpen: false,
      address: null,
      phone: ""
    };
  },
  computed: {
    ...mapGetters("Cart", [
      "misc",
      "pizzaOrderCart",
      "getPriceMisc"
    ]),
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
    ...mapState("Cart", ["misc"]),

    totalPrice() {
      let pizzaOrderCartPrice = 0;
      for (let i = 0; i < this.pizzaOrderCart.length; i++) {
        pizzaOrderCartPrice = pizzaOrderCartPrice + this.pizzaOrderCart[i].price * this.pizzaOrderCart[i].count;
      }
      return pizzaOrderCartPrice + this.getPriceMisc;
    }
  },
  methods: {
    ...mapMutations("Cart", [
      "setCountPizza",
      "setCountMisc",
      "setTotalPrice"
    ]),
    ...mapActions("Orders", ["createOrder"]),
    ...mapActions("Builder", ["editPizza"]),
    ...mapActions("Cart", [
      "resetCartState",
      "getMisc"
    ]),
    pizzaIngredientsName(ingredients) {
      const ingredientsName = [];
      for (let i = 0; i < ingredients.length; i++) {
        ingredientsName.push(ingredients[i].name);
      }
      return ingredientsName.join(', ');
    },

    changeMiscCount({ id, count }) {
      this.setCountMisc({
        id,
        count,
      });
    },

    changePizzaCount({ id, count }) {
      this.setCountPizza({
        id,
        count,
      });
    },

    closePopup() {
      this.popupOpen = false;
    },

    setAddress({ phone, address }) {
      this.phone = phone;
      this.address = address;
    },

    normalizePizzas() {
      return this.pizzaOrderCart.map((pizzaOrder) => {
        return {
          name: pizzaOrder.pizzaName,
          quantity: pizzaOrder.count,
          doughId: pizzaOrder.dough.id,
          sauceId: pizzaOrder.sauces.id,
          sizeId: pizzaOrder.sizes.id,
          ingredients: pizzaOrder.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.count,
            };
          }),
        };
      });
    },

    normalizeMisc() {
      return this.misc.map((misc) => {
        return {
          miscId: misc.id,
          quantity: misc.count,
        };
      });
    },

    async setPizzaToEdit(pizza) {
      this.editPizza(pizza);
      await this.$router.push({ name: "index" });
    },

    async sendOrder() {
      if (this.pizzaOrderCart.length === 0) {
        return;
      }
      this.setTotalPrice(this.totalPrice);
      this.popupOpen = true;
      const order = {
        userId: this.user ? this.user.id : null,
        phone: this.phone,
        address: this.address,
        pizzas: this.normalizePizzas(),
        misc: this.normalizeMisc(),
      };
      this.resetCartState();
      await this.getMisc();
      await this.createOrder(order);
    }
  },
};
</script>
