import pizza from "@/static/pizza.json";

export default {
  namespaced: true,
  state: {
    pizza,
    pizzaOrder: {
      dough: { ...pizza.dough[0] },
      sizes: { ...pizza.sizes[0] },
      sauces: { ...pizza.sauces[0] },
      ingredients: []
    },
    pizzaName: "",
    pizzaOrderCart: []
  },
  actions: {},
  mutations: {
    setPizzaDough(state, dough) {
      state.pizzaOrder['dough'] = {
        ...state.pizza['dough'].find((item) => item.id === +dough),
      };
    },
    setPizzaSize(state, size) {
      state.pizzaOrder['sizes'] = {
        ...state.pizza['sizes'].find((item) => item.id === +size),
      };
    },
    setPizzaSauce(state, sauce) {
      state.pizzaOrder['sauces'] = {
        ...state.pizza['sauces'].find((item) => item.id === +sauce),
      };
    },
    setPizzaIngredient(state, { id, count }) {
      const itemIndex = state.pizzaOrder['ingredients'].findIndex(
        (item) => item.id === id
      );
      if (~itemIndex) {
        if (count === 0) {
          state.pizzaOrder['ingredients'].splice(itemIndex, 1);
        } else {
          state.pizzaOrder['ingredients'][itemIndex].count = count;
        }
      } else {
        state.pizzaOrder['ingredients'].push({
          ...(state.pizza['ingredients'].filter((item) => item.id === id)[0] || []),
          count,
        });
      }
    },
    setPizzaName(state, name) {
      state.pizzaName = name;
    },
    savePizzaOrderCart(state, pizzaOrder) {
      state.pizzaOrderCart.push(pizzaOrder);
    }
  },
  getters: {
    pizzaName: (state) => state.pizzaName,
    pizzaPrice: (state, getters) => {
      return (
        state.pizzaOrder.sizes.multiplier *
        (state.pizzaOrder.dough.price +
          state.pizzaOrder.sauces.price +
          getters.sumIngredients)
      );
    },
    sumIngredients(state) {
      return state.pizzaOrder.ingredients.reduce((sum, item) => {
        return sum + (item?.count ?? 1) * item.price;
      }, 0);
    }
  },
};
