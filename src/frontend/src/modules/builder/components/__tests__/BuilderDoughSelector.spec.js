import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setDough
} from "@/store/mocks";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setDough(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("dough selector has dough input light and large class", () => {
    createComponent({ localVue, store });
    const doughSelector = wrapper.find(".sheet__content");
    expect(doughSelector.html()).toContain("dough__input--light");
    expect(doughSelector.html()).toContain("dough__input--large");
  });

  it("set pizza dough click", async () => {
    createComponent({ localVue, store });
    const setPizzaDough = jest.spyOn(wrapper.vm, "setPizzaDough");
    const doughSelector = wrapper.find('[data-test="dough-selector"]');
    await doughSelector.trigger("click");
    expect(setPizzaDough).toHaveBeenCalledWith("1");
  });
});
