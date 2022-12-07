import {
  ADD_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
  RESET_CART_STATE
} from "@/store/mutations-types";

import { uniqueId } from "lodash";

const initState = () => ({
  misc: [],
  pizzaOrderCart: [],
  totalPrice: 0,
});

export default {
  namespaced: true,
  state: initState(),
  getters: {
    misc(state) {
      state.misc = state.misc.map((el) => ({ ...el, count: 0 }));
      return state.misc;
    },

    pizzaOrderCart(state) {
      return state.pizzaOrderCart;
    },

    getPriceMisc(state) {
      let sumPriceMisc = 0;
      for (let i = 0; i < state.misc.length; i++) {
        sumPriceMisc = sumPriceMisc + state.misc[i].count * state.misc[i].price;
      }
      return sumPriceMisc;
    },

    totalPrice(state) {
      return state.totalPrice;
    }
  },
  mutations: {
    setCountPizza(state, item) {
      state.pizzaOrderCart.forEach((el) => {
        if (item.id === el.id) {
          el.count = item.count;
        }
      });
    },

    setCountMisc(state, item) {
      state.misc.forEach((el) => {
        if (item.id === el.id) {
          el.count = item.count;
        }
      });
    },

    setTotalPrice(state, value) {
      state.totalPrice = value;
    },

    [RESET_CART_STATE](state) {
      Object.assign(state, initState());
    }
  },
  actions: {
    savePizzaOrderCart({ commit }, pizzaOrder) {
      commit(
        pizzaOrder.id ? UPDATE_ENTITY : ADD_ENTITY,
        {
          module: "Cart",
          entity: "pizzaOrderCart",
          value: pizzaOrder.id ? pizzaOrder : { ...pizzaOrder, id: uniqueId() }
        },
        { root: true }
      );
    },

    async getMisc({ commit }) {
      const data = await this.$api.misc.query();
      const items = data.map((item) => ({ ...item, count: 0 }));
      commit(
        SET_ENTITY,
        { module: "Cart", entity: "misc", value: items },
        { root: true }
      );
    },

    changeMiscItemCount({ commit }, misc) {
      commit(
        UPDATE_ENTITY,
        { module: "Cart", entity: "misc", value: misc },
        { root: true }
      );
    },

    resetCartState({ commit }) {
      commit(RESET_CART_STATE);
    }
  },
};
