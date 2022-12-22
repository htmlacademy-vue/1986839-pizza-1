import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setSizes
} from "@/store/mocks";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setSizes(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("size selector has diameter input small, normal and big class", () => {
    createComponent({ localVue, store });
    const sizeSelector = wrapper.find(".sheet__content");
    expect(sizeSelector.html()).toContain("diameter__input--small");
    expect(sizeSelector.html()).toContain("diameter__input--normal");
    expect(sizeSelector.html()).toContain("diameter__input--big");
  });

  it("set pizza size click", async () => {
    createComponent({ localVue, store });
    const setPizzaSize = jest.spyOn(wrapper.vm, "setPizzaSize");
    const sizeSelector = wrapper.find('[data-test="size-selector"]');
    await sizeSelector.trigger("click");
    expect(setPizzaSize).toHaveBeenCalledWith("1");
  });
});
