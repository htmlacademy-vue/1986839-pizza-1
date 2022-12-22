import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setSauces,
  setIngredients
} from "@/store/mocks";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import ItemCounter from "@/common/components/ItemCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setSauces(store);
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("set pizza sauce click", async () => {
    createComponent({ localVue, store });
    const setPizzaSauce = jest.spyOn(wrapper.vm, "setPizzaSauce");
    const sauceSelector = wrapper.find('[data-test="sauce-selector"]');
    await sauceSelector.trigger("click");
    expect(setPizzaSauce).toHaveBeenCalledWith("1");
  });

  it("change ingredients count click", async () => {
    createComponent({ localVue, store });
    const setPizzaIngredient = jest.spyOn(wrapper.vm, "setPizzaIngredient");
    const itemCounter = wrapper.findComponent(ItemCounter);
    const inputValue = parseInt(itemCounter.find("input").element.value);
    const props = { id: 1, count: inputValue + 1 };
    await itemCounter.vm.$emit("changeItemsCount", props);
    expect(setPizzaIngredient).toHaveBeenCalledWith(props);
  });
});
