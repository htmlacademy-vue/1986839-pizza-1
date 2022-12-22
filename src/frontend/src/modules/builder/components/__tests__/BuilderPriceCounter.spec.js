import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setPizzaName,
  setIngredients,
  setDough,
  setSauces,
  setSizes,
  setMisc
} from "@/store/mocks";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        savePizzaOrderCart: jest.fn(),
        changeMiscItemCount: jest.fn(),
      }
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("cook button is disabled when not pizza name or not pizza order ingredients", () => {
    createComponent({ localVue, store });
    const cookButton = wrapper.find('[data-test="cook-button"]');
    expect(cookButton.attributes("disabled")).toBe("disabled");
  });

  it("cook button is disabled when set pizza name and not pizza order ingredients", () => {
    setPizzaName(store);
    createComponent({ localVue, store });
    const cookButton = wrapper.find('[data-test="cook-button"]');
    expect(cookButton.attributes("disabled")).toBe("disabled");
  });

  it("cook button is disabled when not pizza name and set pizza order ingredients", () => {
    setIngredients(store);
    createComponent({ localVue, store });
    const cookButton = wrapper.find('[data-test="cook-button"]');
    expect(cookButton.attributes("disabled")).toBe("disabled");
  });

  it("cook button is enabled when set pizza name and set pizza order ingredients", () => {
    setPizzaName(store);
    setIngredients(store);
    createComponent({ localVue, store });
    const cookButton = wrapper.find('[data-test="cook-button"]');
    expect(cookButton.attributes("disabled")).toBeUndefined();
  });

  it("pizza price not to be nan", async () => {
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    createComponent({ localVue, store });
    expect(store.getters["Builder/pizzaPrice"]).not.toBeNaN();
  });

  it("save pizza order", async () => {
    setPizzaName(store);
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    setMisc(store);
    createComponent({ localVue, store, mocks });
    const cookButton = wrapper.find('[data-test="cook-button"]');
    await cookButton.trigger("click");
    expect(actions.Cart.savePizzaOrderCart).toHaveBeenCalled();
    expect(actions.Cart.changeMiscItemCount).toHaveBeenCalled();
  });
});
