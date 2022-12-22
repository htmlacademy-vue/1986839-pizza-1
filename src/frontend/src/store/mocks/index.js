import {cloneDeep} from "lodash";

import { mutations } from "@/store/index";
import { SET_ENTITY } from "@/store/mutations-types";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import user from "@/static/user";
import pizzaData from "@/static/pizza";
import miscData from "@/static/misc";

const initState = () => ({
  notifications: [],
});

export const generateMockStore = actions => {
  const modulesCopy = cloneDeep(modules);

  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: initState(),
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};

export const authenticateUser = store => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user
  }, { root: true });
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true
  }, { root: true });
};

export const setDough = store => {
  const dough = pizzaData.dough;

  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaDough", value: dough },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaOrderDough", value: dough[0] },
    { root: true }
  );
};

export const setSizes = store => {
  const sizes = pizzaData.sizes;

  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaSizes", value: sizes },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaOrderSizes", value: sizes[0] },
    { root: true }
  );
};

export const setSauces = store => {
  const sauces = pizzaData.sauces;

  store.commit(
    SET_ENTITY,
    { module: "Builder",  entity: "pizzaSauces",  value: sauces },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaOrderSauces", value: sauces[0] },
    { root: true }
  );
};

export const setIngredients = store => {
  const ingredients = pizzaData.ingredients;
  const pizzaOrderIngredients = pizzaData.ingredients.map(
    (ingredient) => ({ ...ingredient, count: 1 })
  );

  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaIngredients", value: ingredients },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaOrderIngredients", value: pizzaOrderIngredients },
    { root: true }
  );
};

export const setPizzaName = store => {
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizzaName", value: "testName" },
    { root: true }
  );
};

export const setMisc = store => {
  const data = miscData;
  const items = data.map((item) => ({ ...item, count: 0 }));

  store.commit(
    SET_ENTITY,
    { module: "Cart", entity: "misc", value: items },
    { root: true }
  );
};

export const setPizzaOrderCart = store => {
  const pizzaOrder = [
    {
      "pizzaName": "Новая",
      "dough": {
        "id": 1,
        "name": "Тонкое",
        "image": "/public/img/dough-light.svg",
        "description": "Из твердых сортов пшеницы",
        "price": 300
      },
      "sauces": {
        "id": 2,
        "name": "Сливочный",
        "price": 50
      },
      "sizes": {
        "id": 1,
        "name": "23 см",
        "image": "/public/img/diameter.svg",
        "multiplier": 1
      },
      "ingredients": [
        {
          "id": 3,
          "name": "Томаты",
          "image": "/public/img/filling/tomatoes.svg",
          "price": 35,
          "count": 1
        },
        {
          "id": 2,
          "name": "Чеддер",
          "image": "/public/img/filling/cheddar.svg",
          "price": 42,
          "count": 1
        }
      ],
      "price": 427,
      "count": 1,
      "id": 1
    }
  ];

  store.commit(
    SET_ENTITY,
    {
      module: "Cart", entity: "pizzaOrderCart", value: pizzaOrder
    },
    { root: true }
  );
};

export const setAddresses = store => {
  const addresses = [
    {
      "id": 1,
      "name": "Тестовый",
      "street": "Тестовая",
      "building": "1",
      "flat": "1",
      "comment": "Тест",
      "userId": "ce4ac95b-69a1-4934-a7d4-8461cfbcf052"
    }
  ];

  store.commit(
    SET_ENTITY,
    { module: "Addresses", entity: "addresses", value: addresses },
    { root: true }
  );
};
