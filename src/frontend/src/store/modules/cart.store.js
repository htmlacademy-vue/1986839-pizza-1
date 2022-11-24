import misc from "@/static/misc.json";
import builder from "@/store/modules/builder.store";

export default {
  namespaced: true,
  state: {
    misc: misc,
    pizzaOrderCart: builder.state.pizzaOrderCart,
    totalPrice: 0,
  },
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
    },
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
  },
  actions: {},
};
