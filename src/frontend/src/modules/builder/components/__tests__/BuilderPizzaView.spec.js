import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setIngredients
} from "@/store/mocks";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("set pizza name input", async () => {
    createComponent({ localVue, store });
    const setPizzaName = jest.spyOn(wrapper.vm, "setPizzaName");
    const pizzaName = wrapper.find('[data-test="pizza-name"]');
    pizzaName.element.value = "testName";
    await pizzaName.trigger("input");
    expect(store.getters["Builder/pizzaName"]).toBe(pizzaName.element.value);
    expect(setPizzaName).toHaveBeenCalled();
  });

  it("renders ingredients if set pizza order ingredients", () => {
    setIngredients(store);
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".pizza__filling");
    expect(ingredient.exists()).toBeTruthy();
  });
});
