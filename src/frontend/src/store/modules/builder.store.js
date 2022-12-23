import {
  SET_ENTITY,
  EDIT_PIZZA,
  RESET_BUILDER_STATE
} from "@/store/mutations-types";

import {
  isEmpty,
} from "@/common/helpers";

const initState = () => ({
  pizzaDough: [],
  pizzaSizes: [],
  pizzaSauces: [],
  pizzaIngredients: [],
  pizzaOrderDough: [],
  pizzaOrderSizes: [],
  pizzaOrderSauces: [],
  pizzaOrderIngredients: [],
  pizzaName: "",
  id: null
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    setPizzaDough(state, dough) {
      state.pizzaOrderDough = {
        ...state.pizzaDough.find((item) => item.id === +dough),
      };
    },
    setPizzaSize(state, size) {
      state.pizzaOrderSizes = {
        ...state.pizzaSizes.find((item) => item.id === +size),
      };
    },
    setPizzaSauce(state, sauce) {
      state.pizzaOrderSauces = {
        ...state.pizzaSauces.find((item) => item.id === +sauce),
      };
    },
    setPizzaIngredient(state, { id, count }) {
      const ingredientIndex = state.pizzaIngredients.findIndex(
        (item) => item.id === id
      );
      state.pizzaIngredients[ingredientIndex].count = count;

      const itemIndex = state.pizzaOrderIngredients.findIndex(
        (item) => item.id === id
      );
      if (~itemIndex) {
        if (count === 0) {
          state.pizzaOrderIngredients.splice(itemIndex, 1);
        } else {
          state.pizzaOrderIngredients[itemIndex].count = count;
        }
      } else {
        state.pizzaOrderIngredients.push({
          ...(state.pizzaIngredients.filter((item) => item.id === id)[0] || []),
          count,
        });
      }
    },
    setPizzaName(state, name) {
      state.pizzaName = name;
    },
    [RESET_BUILDER_STATE](state) {
      Object.assign(state, initState());
    },
    [EDIT_PIZZA](state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    pizzaName: (state) => state.pizzaName,
    pizzaPrice: (state, getters) => {
      return (
        state.pizzaOrderSizes.multiplier *
        (state.pizzaOrderDough.price +
          state.pizzaOrderSauces.price +
          getters.sumIngredients)
      );
    },
    sumIngredients(state) {
      return state.pizzaOrderIngredients.reduce((sum, item) => {
        return sum + (item?.count ?? 1) * item.price;
      }, 0);
    }
  },
  actions: {
    resetBuilderState({ commit }) {
      commit(RESET_BUILDER_STATE);
    },
    async getDough({ state, commit }) {
      const dough = await this.$api.builder.fetchDough();
      commit(
        SET_ENTITY,
        { module: "Builder", entity: "pizzaDough", value: dough },
        { root: true }
      );
      if (isEmpty(state.pizzaOrderDough)) {
        commit(
          SET_ENTITY,
          { module: "Builder", entity: "pizzaOrderDough", value: dough[0] },
          { root: true }
        );
      }
    },
    async getSizes({ state, commit }) {
      const sizes = await this.$api.builder.fetchSizes();
      commit(
        SET_ENTITY,
        { module: "Builder", entity: "pizzaSizes", value: sizes },
        { root: true }
      );
      if (isEmpty(state.pizzaOrderSizes)) {
        commit(
          SET_ENTITY,
          { module: "Builder", entity: "pizzaOrderSizes", value: sizes[0] },
          { root: true }
        );
      }
    },
    async getSauces({ state, commit }) {
      const sauces = await this.$api.builder.fetchSauces();
      commit(
        SET_ENTITY,
        { module: "Builder",  entity: "pizzaSauces",  value: sauces },
        { root: true }
      );
      if (isEmpty(state.pizzaOrderSauces)) {
        commit(
          SET_ENTITY,
          { module: "Builder", entity: "pizzaOrderSauces", value: sauces[0] },
          { root: true }
        );
      }
    },
    async getIngredients({ commit }) {
      const ingredients = await this.$api.builder.fetchIngredients();
      const ingredientsMap = ingredients.map(
        (ingredient) => ({ ...ingredient, count: 0 })
      );
      commit(
        SET_ENTITY,
        { module: "Builder", entity: "pizzaIngredients", value: ingredientsMap },
        { root: true }
      );
    },
    editPizza({ commit }, pizza) {
      const newState = {
        pizzaOrderDough: pizza.dough,
        pizzaOrderSizes: pizza.sizes,
        pizzaOrderSauces: pizza.sauces,
        pizzaOrderIngredients: pizza.ingredients,
        pizzaName: pizza.pizzaName,
        id: pizza.id
      };
      commit(EDIT_PIZZA, newState);
    },
  }
};
